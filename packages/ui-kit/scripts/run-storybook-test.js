#!/usr/bin/env node
/* eslint-disable no-console, no-undef */

import { spawn, exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Script automatically detects the port Storybook is running on

/**
 * Start Storybook and detect the port it's running on
 */
async function startStorybook() {
    console.log('Starting Storybook...');

    // Start Storybook with --ci flag
    const storybookProcess = spawn('storybook', ['dev', '--ci'], {
        shell: true,
        stdio: ['pipe', 'pipe', 'pipe']
    });

    let port = null;

    // Set up timeout for port detection
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Timeout waiting for Storybook to start'));
        }, 60000); // 60 second timeout
    });

    // Create a promise that resolves when we detect the port
    const portDetectionPromise = new Promise((resolve) => {
        storybookProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(`Storybook: ${output}`);

            // Look for the port in the output
            const portMatch = output.match(/Local:\s*http:\/\/localhost:(\d+)/);
            if (portMatch && portMatch[1]) {
                port = parseInt(portMatch[1], 10);
                console.log(`Detected Storybook running on port: ${port}`);
                resolve(port);
            }
        });

        storybookProcess.stderr.on('data', (data) => {
            console.error(`Storybook stderr: ${data}`);
        });
    });

    // Wait for port detection or timeout
    try {
        port = await Promise.race([portDetectionPromise, timeoutPromise]);
    } catch (error) {
        console.error('Error detecting Storybook port:', error);
        process.exit(1);
    }

    return { storybookProcess, port };
}

/**
 * Run the test-storybook command with the detected port
 */
async function runTests(port) {
    console.log(`Waiting for Storybook to be fully ready on port ${port}...`);

    try {
        // Wait for Storybook server to be ready
        await execAsync(`wait-on tcp:${port} -t 60000`);
        console.log('Storybook is ready. Running accessibility tests...');

        // Run the tests against the detected port
        const testProcess = spawn('test-storybook', [`--url=http://localhost:${port}`], {
            shell: true,
            stdio: 'inherit'
        });

        return new Promise((resolve, reject) => {
            testProcess.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error(`test-storybook exited with code ${code}`));
                } else {
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error('Error running tests:', error);
        throw error;
    }
}

/**
 * Main function to orchestrate the process
 */
async function main() {
    let storybookProcess = null;

    try {
        // Start Storybook and detect port
        const storybook = await startStorybook();
        storybookProcess = storybook.storybookProcess;

        // Run tests against the detected port
        await runTests(storybook.port);

        console.log('All tests completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error in test process:', error);
        process.exit(1);
    } finally {
        // Ensure Storybook is terminated
        if (storybookProcess) {
            storybookProcess.kill();
        }
    }
}

// Run the main function
main(); 