#!/usr/bin/env node

/**
 * Ralph Wiggum Stop Hook
 *
 * This hook intercepts Claude's exit attempts to create the Ralph loop.
 * It checks if a completion promise has been output and either:
 * - Allows exit if complete
 * - Blocks exit and re-prompts if not complete
 *
 * Works with Claude Code v1.0.20+ security restrictions.
 */

const fs = require('fs');
const path = require('path');

const STATE_FILE = path.join(process.cwd(), '.claude', 'ralph-state.json');

function readState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    }
  } catch (e) {
    // State file doesn't exist or is invalid
  }
  return null;
}

function writeState(state) {
  const dir = path.dirname(STATE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function deleteState() {
  if (fs.existsSync(STATE_FILE)) {
    fs.unlinkSync(STATE_FILE);
  }
}

function main() {
  // Read hook input from stdin
  let input = '';
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    input += chunk;
  });

  process.stdin.on('end', () => {
    try {
      const hookInput = JSON.parse(input);
      const transcript = hookInput.transcript || '';

      const state = readState();

      // No active loop - allow exit
      if (!state || !state.active) {
        console.log(JSON.stringify({ decision: 'allow' }));
        return;
      }

      const completionPromise = state.completionPromise || 'TASK_COMPLETE';
      const maxIterations = state.maxIterations || 30;
      const currentIteration = state.currentIteration || 1;

      // Check for completion promise in transcript
      const completionPattern = new RegExp(`<promise>${completionPromise}</promise>`, 'i');
      const isComplete = completionPattern.test(transcript);

      // Check if max iterations reached
      const maxReached = currentIteration >= maxIterations;

      if (isComplete) {
        // Task complete - clean up and allow exit
        deleteState();
        console.log(JSON.stringify({
          decision: 'allow',
          reason: `Completion promise "${completionPromise}" detected. Loop finished.`
        }));
        return;
      }

      if (maxReached) {
        // Max iterations reached - clean up and allow exit
        deleteState();
        console.log(JSON.stringify({
          decision: 'allow',
          reason: `Max iterations (${maxIterations}) reached. Loop stopped.`
        }));
        return;
      }

      // Not complete - block exit and continue loop
      state.currentIteration = currentIteration + 1;
      state.history = state.history || [];
      state.history.push({
        iteration: currentIteration,
        timestamp: new Date().toISOString()
      });
      writeState(state);

      console.log(JSON.stringify({
        decision: 'block',
        reason: `Ralph loop iteration ${currentIteration}/${maxIterations}. Continue working on: ${state.prompt}\n\nRemember to output <promise>${completionPromise}</promise> when all tasks are complete.`
      }));

    } catch (e) {
      // On error, allow exit
      console.log(JSON.stringify({
        decision: 'allow',
        reason: `Hook error: ${e.message}`
      }));
    }
  });
}

main();
