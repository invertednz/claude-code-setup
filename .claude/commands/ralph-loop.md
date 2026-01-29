# Ralph Loop - Full Autonomous Workflow

**Runs from spec**: Reads `docs/specs/prd.json` and completes ALL stories autonomously.

Autonomous development loop: implement → test → security → docs → PR → merge for each task.

## Prerequisite

Run `/create-spec` first to create the specification with user stories.

## Arguments

- `--max-iterations N`: Safety limit (default: 30)
- `--completion-promise TEXT`: Completion signal (default: "TASK_COMPLETE")

## Pre-computed Context

```bash
git branch --show-current
cat docs/specs/prd.json 2>/dev/null || echo "No prd.json - run /create-spec first"
cat docs/INDEX.md 2>/dev/null | head -30 || echo "No docs - will create"
cat .claude/ralph-state.json 2>/dev/null || echo "No active loop"
cat package.json 2>/dev/null | grep -A 15 '"scripts"' || echo "No package.json"
```

## Spec Requirement

This command reads from `docs/specs/prd.json`:
```json
{
  "name": "Feature Name",
  "stories": [
    {
      "id": "US-1",
      "title": "Story title",
      "acceptance_criteria": ["..."],
      "priority": 1,
      "passes": false
    }
  ]
}
```

If no prd.json exists, prompt user to run `/create-spec` first.

## Instructions

### Initialization

Create `.claude/ralph-state.json`:
```json
{
  "active": true,
  "prompt": "{task}",
  "maxIterations": 30,
  "currentIteration": 1,
  "completionPromise": "TASK_COMPLETE",
  "startedAt": "{timestamp}",
  "completedTasks": [],
  "history": []
}
```

Initialize docs if `docs/INDEX.md` doesn't exist.

---

## Main Loop (Per Task)

For each task/story, execute the COMPLETE workflow:

### Phase 1: SETUP

```bash
git checkout main
git pull origin main
git checkout -b feature/{task-id}
```

### Phase 2: IMPLEMENT

1. Read task from prd.json or parse prompt
2. Implement the feature/fix
3. Create tests:
   - Unit tests (`*.test.ts`)
   - Integration tests (`tests/integration/`)
   - E2E tests with Playwright (`tests/e2e/`)

### Phase 3: VERIFY (Automatic)

```bash
npm run lint
npm run typecheck || npx tsc --noEmit
npm test
npm run test:e2e || npx playwright test
npm run build
```

Fix failures, repeat until all pass.

### Phase 4: SECURITY (Automatic)

Scan for:
- Secrets/credentials
- Injection vulnerabilities
- `npm audit`

Fix issues before proceeding.

### Phase 5: DOCUMENTATION (Automatic)

#### Update INDEX.md
```markdown
| `{file}` | {purpose} | `{exports}` |
```

#### Update AGENTS.md
Add patterns/gotchas discovered.

#### Append to progress.txt
```markdown
---
## {YYYY-MM-DD} - {Task}
### Completed
- {What was built}
### Files
- `{path}`: {description}
### Learnings
- {Insights}
---
```

#### Update USAGE.md (if user-facing)

#### Update prd.json (if using stories)
```json
{ "id": "{task-id}", "passes": true }
```

### Phase 6: COMMIT & PR (Automatic)

```bash
git add src/ tests/ docs/

git commit -m "feat({task}): {description}

- {Changes}
- Tests: added
- Docs: updated

Co-Authored-By: Claude <noreply@anthropic.com>"

git push -u origin HEAD

gh pr create --title "feat({task}): {description}" --body "## Summary
{description}

## Testing
- [x] Unit tests
- [x] Integration tests
- [x] E2E tests
- [x] All passing

## Security
- [x] Scan passed

## Documentation
- [x] Updated"
```

### Phase 7: MERGE (Automatic)

```bash
gh pr merge --squash --delete-branch
git checkout main
git pull
```

### Phase 8: UPDATE STATE

```json
{
  "currentIteration": N+1,
  "completedTasks": [..., "{task}"],
  "history": [..., {"task": "{task}", "pr": "{url}", "timestamp": "..."}]
}
```

---

## Loop Control

After each task:

1. **Check completion**:
   - All stories in prd.json have `passes: true`? → Complete
   - Max iterations reached? → Stop
   - More tasks? → Continue to next

2. **If complete**:
   - Delete `.claude/ralph-state.json`
   - Output: `<promise>TASK_COMPLETE</promise>`
   - Report summary

3. **If more tasks**:
   - Increment iteration
   - Return to Phase 1

### Error Recovery

If stuck (3+ attempts on same task):
1. Log to progress.txt
2. Mark as blocked
3. Move to next task
4. Report blocked tasks at end

---

## Completion Report

When all tasks done:

```
<promise>TASK_COMPLETE</promise>

## Summary
- Iterations: {N}
- Tasks completed: {list}
- PRs merged: {count}

## Documentation Updated
- INDEX.md: {N} files added
- AGENTS.md: {N} patterns
- progress.txt: {N} entries
- USAGE.md: {N} features

## Blocked (if any)
- {task}: {reason}
```

---

## What This Handles Automatically

For EACH task:
- ✅ Branch creation
- ✅ Implementation
- ✅ Testing (unit, integration, Playwright e2e)
- ✅ Security scanning
- ✅ Documentation updates
- ✅ Commit & PR
- ✅ Merge to main
- ✅ Loop to next task

Runs autonomously until complete or max iterations.

## Usage

```bash
# With prd.json
/ralph-loop "Complete all stories" --max-iterations 50

# Ad-hoc task
/ralph-loop "Build todo API with CRUD and tests" --max-iterations 30

# Stop loop
/cancel-ralph
```
