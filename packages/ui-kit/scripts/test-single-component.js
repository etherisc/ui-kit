#!/usr/bin/env node
/* eslint-disable no-undef */

import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import { createServer } from 'net';
import { setTimeout as sleep } from 'timers/promises';

const execAsync = promisify(exec);

// Get the story pattern from command line arguments
const storyPattern = process.argv[2];
if (!storyPattern) {
    console.error('Please provide a story pattern to test!');
    console.error('Usage: node test-single-component.js "Components/Form/Checkbox*"');
    process.exit(1);
}

// Configuration 
const STORYBOOK_TIMEOUT_MS = 60000;  // 1 minute to start Storybook
const TEST_TIMEOUT_MS = 30000;       // 30 seconds for tests
const READY_WAIT_MS = 5000;          // Additional wait after port detection

/**
 * Find an available port
 */
async function findAvailablePort(startPort = 60000, endPort = 65000) {
    let port = Math.floor(Math.random() * (endPort - startPort)) + startPort;

    return new Promise((resolve) => {
        const server = createServer();

        server.once('error', () => {
            // Port is in use, try another one
            resolve(findAvailablePort(startPort, endPort));
        });

        server.once('listening', () => {
            // Found an available port
            const foundPort = server.address().port;
            server.close(() => {
                resolve(foundPort);
            });
        });

        server.listen(port);
    });
}

/**
 * Start Storybook and detect the port it's running on
 */
async function startStorybook() {
    console.log('Starting Storybook...');

    // Find an available port
    const availablePort = await findAvailablePort();
    console.log(`Using available port: ${availablePort}`);

    // Start Storybook with --ci flag and specify port
    const storybookProcess = spawn('storybook', ['dev', '--ci', '--port', availablePort.toString()], {
        shell: true,
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, FORCE_COLOR: 'true' }
    });

    let port = null;
    let portDetected = false;

    // Set up timeout for port detection
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Timeout waiting for Storybook to start (${STORYBOOK_TIMEOUT_MS / 1000} seconds)`));
        }, STORYBOOK_TIMEOUT_MS);
    });

    // Create a promise that resolves when we detect the port
    const portDetectionPromise = new Promise((resolve) => {
        // Function to check output against all known Storybook port patterns
        const checkForPort = (output) => {
            // Various patterns Storybook might use to report its port
            const patterns = [
                // Normal patterns
                /Local:\s*http:\/\/localhost:(\d+)/,
                /http:\/\/127\.0\.0\.1:(\d+)/,
                /http:\/\/0\.0\.0\.0:(\d+)/,
                // CLI output format
                /╭.*╮.*Local:\s*http:\/\/localhost:(\d+)/s,
                /╭.*╮.*On your network:\s*http:\/\/[^:]+:(\d+)/s,
                // Alternative pattern seen in some CI environments
                /Storybook.*started.*localhost:(\d+)/i,
                // Direct port mentions
                /port\s+(\d+)/i,
                /PORT=(\d+)/i
            ];

            for (const pattern of patterns) {
                const match = output.match(pattern);
                if (match && match[1]) {
                    const detectedPort = parseInt(match[1], 10);
                    if (detectedPort > 0) {
                        console.log(`Detected Storybook running on port: ${detectedPort} (matched pattern: ${pattern})`);
                        port = detectedPort;
                        portDetected = true;
                        resolve(port);
                        return true;
                    }
                }
            }

            // If the requested port is available and no port detection yet
            if (output.includes(`${availablePort}`) && !portDetected) {
                console.log(`Detected Storybook likely running on requested port: ${availablePort}`);
                port = availablePort;
                portDetected = true;
                resolve(port);
                return true;
            }

            return false;
        };

        storybookProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(`Storybook: ${output}`);

            if (!portDetected) {
                checkForPort(output);
            }
        });

        storybookProcess.stderr.on('data', (data) => {
            const output = data.toString();
            console.error(`Storybook stderr: ${output}`);

            // Also check stderr for port information
            if (!portDetected) {
                checkForPort(output);
            }
        });

        storybookProcess.on('error', (error) => {
            console.error(`Storybook process error: ${error.message}`);
        });

        storybookProcess.on('exit', (code) => {
            if (code !== null && code !== 0) {
                console.error(`Storybook process exited with code ${code}`);
            }
        });

        // As a fallback, assume the port we provided worked if Storybook doesn't exit
        setTimeout(() => {
            if (!portDetected) {
                console.log(`No port detected after 30s. Assuming port ${availablePort} is being used...`);
                port = availablePort;
                portDetected = true;
                resolve(port);
            }
        }, 30000);
    });

    // Wait for port detection or timeout
    try {
        port = await Promise.race([portDetectionPromise, timeoutPromise]);
    } catch (error) {
        console.error('Error detecting Storybook port:', error);
        process.exit(1);
    }

    // Give extra time for Storybook to fully initialize
    console.log(`Waiting additional ${READY_WAIT_MS / 1000} seconds for Storybook to fully initialize...`);
    await sleep(READY_WAIT_MS);

    return { storybookProcess, port };
}

/**
 * Run the test-storybook command with the detected port
 */
async function runTests(port, storyPattern) {
    console.log(`Running tests on Storybook at port ${port} for stories matching: ${storyPattern}...`);

    try {
        // Wait for Storybook server to be ready
        await execAsync(`wait-on http://localhost:${port} -t ${TEST_TIMEOUT_MS}`);
        console.log('Storybook is ready. Running accessibility tests...');

        // Run the tests for the specific story pattern
        const testCommand = `test-storybook --url=http://localhost:${port} --stories="${storyPattern}" --maxWorkers=1 --ci`;
        console.log(`Running command: ${testCommand}`);

        const testProcess = spawn(testCommand, [], {
            shell: true,
            stdio: 'inherit'
        });

        return new Promise((resolve, reject) => {
            testProcess.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Accessibility tests failed with exit code ${code}`));
                }
            });
        });
    } catch (error) {
        console.error('Error running tests:', error.message);
        throw error;
    }
}

async function main() {
    let storybookProcess = null;

    try {
        // Start Storybook
        const result = await startStorybook();
        storybookProcess = result.storybookProcess;

        // Run the tests
        await runTests(result.port, storyPattern);

        console.log('\n✅ Accessibility tests completed successfully');
    } catch (error) {
        console.error(`\n❌ Error: ${error.message}`);
        process.exitCode = 1;
    } finally {
        // Clean up
        if (storybookProcess) {
            console.log('Stopping Storybook...');
            // On Unix-like systems, use SIGTERM for clean shutdown
            storybookProcess.kill('SIGTERM');

            // Give it a moment to shut down gracefully
            await sleep(1000);

            // If still running, force kill
            try {
                process.kill(storybookProcess.pid, 0); // Check if process is still alive
                console.log('Storybook still running, force killing...');
                storybookProcess.kill('SIGKILL');
            } catch {
                // Process already dead, good!
                // No need to use a parameter here
            }
        }

        console.log('Done!');
        process.exit(process.exitCode);
    }
}

main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
}); 