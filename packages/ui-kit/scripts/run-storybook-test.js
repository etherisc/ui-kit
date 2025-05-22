#!/usr/bin/env node
/* eslint-disable no-undef */

import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import { createServer } from 'net';

const execAsync = promisify(exec);

// Script automatically detects the port Storybook is running on

// Configuration 
const STORYBOOK_TIMEOUT_MS = 180000; // 3 minutes
const TEST_TIMEOUT_MS = 120000; // 2 minutes
const READY_WAIT_MS = 15000; // Additional wait time after port detection

// Find an available port
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

    // Start Storybook with --ci flag and specify port range
    const storybookProcess = spawn('storybook', ['dev', '--ci', '--port', availablePort.toString()], {
        shell: true,
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, FORCE_COLOR: 'true' }
    });

    let port = null;
    let portDetected = false;
    let logBuffer = '';

    // Set up timeout for port detection
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            // Before failing, try to detect the port from lsof
            tryDetectPortFromLsof(reject);
        }, STORYBOOK_TIMEOUT_MS);
    });

    // Try to detect the port from lsof as a fallback
    async function tryDetectPortFromLsof(rejectFn) {
        try {
            console.log('Attempting to detect Storybook port from system...');
            // Check for listening Node.js processes
            const { stdout } = await execAsync('lsof -i -P -n | grep LISTEN | grep node');
            console.log('Found Node.js listening ports:');
            console.log(stdout);

            // Log the whole buffer for debugging
            console.log('---- Storybook Output Log ----');
            console.log(logBuffer);
            console.log('---- End Storybook Output Log ----');

            rejectFn(new Error(`Timeout waiting for Storybook to start (${STORYBOOK_TIMEOUT_MS / 1000} seconds)`));
        } catch (err) {
            rejectFn(new Error(`Timeout waiting for Storybook to start. Failed to detect from lsof: ${err.message}`));
        }
    }

    // Create a promise that resolves when we detect the port
    const portDetectionPromise = new Promise((resolve) => {
        // Function to check output against all known Storybook port patterns
        const checkForPort = (output) => {
            // Add to cumulative log buffer for debugging if detection fails
            logBuffer += output;

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
        await execAsync(`wait-on http://localhost:${port} -t ${TEST_TIMEOUT_MS}`);
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