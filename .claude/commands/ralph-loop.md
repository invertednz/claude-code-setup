# Ralph Loop - Autonomous Development

Start an autonomous development loop that iterates until all tasks are complete.

Based on Ralph Wiggum methodology: persistent iteration until success.

## Arguments

- `prompt` (required): The task description
- `--max-iterations N`: Safety limit (default: 30)
- `--completion-promise TEXT`: Signal for completion (default: "TASK_COMPLETE")

## Pre-computed Context

```bash
git branch --show-current
cat docs/specs/prd.json 2>/dev/null | head -30 || echo "No prd.json"
cat .claude/ralph-state.json 2>/dev/null || echo "No active loop"
```

## Instructions

### Step 1: Initialize Loop State

Create `.claude/ralph-state.json` to track the loop:

```json
{
  "active": true,
  "prompt": "{the task prompt}",
  "maxIterations": 30,
  "currentIteration": 1,
  "completionPromise": "TASK_COMPLETE",
  "startedAt": "{ISO timestamp}",
  "history": []
}
```

### Step 2: Parse the Task

If a prd.json exists, work through stories in priority order.
Otherwise, break down the prompt into subtasks.

### Step 3: Main Loop Behavior

For each iteration:

1. **Check state** - Read `.claude/ralph-state.json`
2. **Find next task** - Select highest priority incomplete item
3. **Create branch** - `git checkout -b feature/{task-id}` if not on feature branch
4. **Implement** - Write code to complete the task
5. **Test** - Run tests: `npm test`
6. **Verify** - Run full verification: lint, typecheck, build
7. **Fix issues** - If tests fail, debug and fix
8. **Update state** - Mark task complete if all tests pass
9. **Commit & PR** - If task complete, commit and create PR
10. **Merge** - Merge PR and return to main
11. **Repeat** - Continue to next task

### Step 4: Completion Check

After each iteration, check:

- Are all stories in prd.json `passes: true`?
- Has max iterations been reached?
- Is there a blocker that can't be resolved?

If complete, output:

```
<promise>TASK_COMPLETE</promise>
```

And clean up:
- Delete `.claude/ralph-state.json`
- Report summary of completed work

### Step 5: Iteration Tracking

Update `.claude/ralph-state.json` after each iteration:

```json
{
  "currentIteration": 2,
  "history": [
    {
      "iteration": 1,
      "task": "US-1",
      "status": "completed",
      "duration": "5m",
      "pr": "https://github.com/..."
    }
  ]
}
```

### Step 6: Error Recovery

If stuck on a task:

1. Log the issue to `progress.txt`
2. Increment retry counter
3. After 3 retries on same task:
   - Mark as blocked
   - Move to next task
   - Report blocked task at end

### Example Usage

```bash
# Basic usage
/ralph-loop "Build a todo API with CRUD operations"

# With options
/ralph-loop "Implement user authentication" --max-iterations 50 --completion-promise "AUTH_COMPLETE"

# With existing spec
/ralph-loop "Complete all stories in prd.json" --max-iterations 100
```

### TDD Integration

The loop follows TDD principles:

1. **Spec First** - Read requirements from prd.json
2. **Tests First** - Ensure tests exist (run `/create-spec-tests` if not)
3. **Red** - Verify tests fail
4. **Green** - Implement until tests pass
5. **Refactor** - Clean up code
6. **PR** - Commit and create PR
7. **Next** - Move to next story

### Important Notes

- Each task runs on its own feature branch
- PRs are created and merged for each completed task
- State persists in `.claude/ralph-state.json`
- Use `/cancel-ralph` to stop the loop
- Progress is logged to `progress.txt`
