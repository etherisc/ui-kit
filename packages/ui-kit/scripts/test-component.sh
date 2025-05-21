#!/bin/bash
# A simple script to test a single component using Storybook and test-runner

# Display usage if no pattern is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <story-pattern>"
  echo "Example: $0 \"Components/Form/Checkbox\""
  exit 1
fi

STORY_PATTERN="$1"
PORT=6006

# Check if Storybook is already running
if ! nc -z localhost $PORT >/dev/null 2>&1; then
  echo "Starting Storybook on port $PORT..."
  # Start Storybook in the background
  pnpm storybook --port $PORT &
  STORYBOOK_PID=$!
  
  # Wait for Storybook to start
  echo "Waiting for Storybook to start up..."
  pnpm exec wait-on http://localhost:$PORT -t 60000
  
  # Give it a little more time to fully initialize
  sleep 3
  
  echo "Storybook is ready!"
  KILL_STORYBOOK=true
else
  echo "Storybook is already running on port $PORT"
  KILL_STORYBOOK=false
fi

# We'll use grep to filter the stories since test-storybook doesn't support a --stories flag
echo "Running accessibility tests for stories matching: $STORY_PATTERN"
pnpm exec test-storybook --url=http://localhost:$PORT --ci --verbose 2>&1 | grep -A 30 -B 10 "$STORY_PATTERN"
TEST_RESULT=${PIPESTATUS[0]}

# Clean up if we started Storybook
if [ "$KILL_STORYBOOK" = true ]; then
  echo "Shutting down Storybook..."
  kill $STORYBOOK_PID
fi

echo "Test completed with exit code: $TEST_RESULT"
# Return the test result
exit $TEST_RESULT 