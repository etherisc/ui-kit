#!/usr/bin/env node
/* eslint-disable no-console, no-undef */

import { spawn, exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Script automatically detects the port Storybook is running on

// Configuration 
const STORYBOOK_TIMEOUT_MS = 120000; // 2 minutes
const TEST_TIMEOUT_MS = 120000; // 2 minutes
const READY_WAIT_MS = 10000; // Additional wait time after port detection

/**
 * Start Storybook and detect the port it's running on
 */
async function startStorybook() {
    console.log('Starting Storybook...');

    // Start Storybook with --ci flag and specify port range
    // Using a random port in the 60000-65000 range to avoid conflicts
    const randomPort = Math.floor(Math.random() * 5000) + 60000;

    const storybookProcess = spawn('storybook', ['dev', '--ci', '--port', randomPort.toString()], {
        shell: true,
        stdio: ['pipe', 'pipe', 'pipe']
    });

    let port = null;

    // Set up timeout for port detection
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Timeout waiting for Storybook to start (${STORYBOOK_TIMEOUT_MS / 1000} seconds)`));
        }, STORYBOOK_TIMEOUT_MS);
    });

    // Create a promise that resolves when we detect the port
    const portDetectionPromise = new Promise((resolve) => {
        storybookProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(`Storybook: ${output}`);

            // Look for the port in the output - try both patterns that Storybook might use
            const portMatch = output.match(/Local:\s*http:\/\/localhost:(\d+)/);
            const altPortMatch = output.match(/http:\/\/127.0.0.1:(\d+)/);

            if (portMatch && portMatch[1]) {
                port = parseInt(portMatch[1], 10);
                console.log(`Detected Storybook running on port: ${port}`);
                resolve(port);
            } else if (altPortMatch && altPortMatch[1]) {
                port = parseInt(altPortMatch[1], 10);
                console.log(`Detected Storybook running on port: ${port}`);
                resolve(port);
            }
        });

        storybookProcess.stderr.on('data', (data) => {
            console.error(`Storybook stderr: ${data}`);
        });

        storybookProcess.on('error', (error) => {
            console.error(`Storybook process error: ${error.message}`);
        });

        storybookProcess.on('exit', (code) => {
            if (code !== null && code !== 0) {
                console.error(`Storybook process exited with code ${code}`);
            }
        });
    });

    // Wait for port detection or timeout
    try {
        port = await Promise.race([portDetectionPromise, timeoutPromise]);
    } catch (error) {
        console.error('Error detecting Storybook port:', error);

        // Log the current system state
        console.log('Checking system state...');
        try {
            const { stdout: psOutput } = await execAsync('ps aux | grep storybook');
            console.log('Running storybook processes:');
            console.log(psOutput);

            const { stdout: netstatOutput } = await execAsync('netstat -tulpn 2>/dev/null | grep node');
            console.log('Node ports in use:');
            console.log(netstatOutput);
        } catch {
            console.error('Failed to check system state');
        }

        // Kill any orphaned storybook processes
        try {
            await execAsync('pkill -f "storybook dev"');
        } catch {
            // Ignore errors if no processes found
        }

        process.exit(1);
    }

    // Give extra time for Storybook to fully initialize
    console.log(`Waiting additional ${READY_WAIT_MS / 1000} seconds for Storybook to fully initialize...`);
    await new Promise(resolve => setTimeout(resolve, READY_WAIT_MS));

    return { storybookProcess, port };
}

/**
 * Run the test-storybook command with the detected port
 */
async function runTests(port) {
    console.log(`Running tests on Storybook at port ${port}...`);

    try {
        // Wait for Storybook server to be ready
        await execAsync(`wait-on tcp:${port} -t ${TEST_TIMEOUT_MS}`);
        console.log('Storybook is ready. Running accessibility tests...');

        // List available story IDs for debugging
        try {
            console.log('Fetching available stories...');
            const { stdout } = await execAsync(`curl -s http://localhost:${port}/index.json`);
            const storyData = JSON.parse(stdout);
            console.log(`Found ${Object.keys(storyData.entries).length} stories`);
            Object.keys(storyData.entries).slice(0, 10).forEach(id => {
                console.log(`- Story ID: ${id}`);
            });
        } catch (err) {
            console.warn('Failed to fetch story list:', err.message);
        }

        // Run the tests against the detected port with additional flags
        const testProcess = spawn('test-storybook', [
            `--url=http://localhost:${port}`,
            '--maxWorkers=2',
            '--watchAll=false',
            '--ci'
        ], {
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
            console.log('Terminating Storybook process...');
            storybookProcess.kill('SIGTERM');

            // Force kill if needed
            setTimeout(() => {
                try {
                    storybookProcess.kill('SIGKILL');
                } catch {
                    // Ignore errors if process already gone
                }
            }, 5000);
        }
    }
}

// Run the main function
main(); 