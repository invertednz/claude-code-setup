# Cancel Ralph Loop

Stop the active Ralph autonomous development loop.

## Pre-computed Context

```bash
cat .claude/ralph-state.json 2>/dev/null || echo "No active loop"
```

## Instructions

### Step 1: Check for Active Loop

Read `.claude/ralph-state.json` to check if a loop is active.

If no active loop:
- Report "No active Ralph loop to cancel"
- Exit

### Step 2: Save Progress

Before canceling:

1. Log current state to `progress.txt`:
   ```
   ## Ralph Loop Canceled - {timestamp}
   - Iterations completed: {N}
   - Tasks completed: {list}
   - Current task: {task}
   - Reason: User requested cancellation
   ```

2. Commit any uncommitted work if on feature branch

### Step 3: Clean Up

1. Delete `.claude/ralph-state.json`
2. Report:
   - Number of iterations completed
   - Tasks finished
   - Current state of work
   - Any uncommitted changes

### Step 4: Return to Main

If on a feature branch with uncommitted changes:
- Ask user: "You have uncommitted changes on branch {name}. Should I commit them, stash them, or discard them?"
- Handle accordingly

Then return to main:
```bash
git checkout main
```

### Output

```
Ralph loop canceled.

Summary:
- Iterations: {N} of {max}
- Completed: {list of completed tasks}
- In Progress: {current task}
- Branch: {returned to main / stayed on feature}

Progress saved to progress.txt.
```
