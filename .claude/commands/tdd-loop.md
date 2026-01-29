# TDD Loop - Full Development Cycle

Execute the complete TDD development cycle: Red → Green → Refactor → Verify → PR.

Each task runs on a new branch and merges to main when complete.

## Pre-computed Context

```bash
git branch --show-current
git status --short
cat docs/specs/prd.json 2>/dev/null | head -50 || echo "No prd.json"
```

## Instructions

Follow this complete TDD workflow for each user story:

### Phase 0: Setup Branch

Before starting any work:

1. Ensure working directory is clean
2. Checkout main and pull latest: `git checkout main && git pull`
3. Create feature branch: `git checkout -b feature/{story-id}-{short-description}`

### Phase 1: RED - Failing Tests

1. **Read the spec** from `docs/specs/prd.json`
2. **Select highest priority story** where `passes: false`
3. **Verify tests exist** (from `/create-spec-tests`)
4. **Run tests** to confirm they fail:
   ```bash
   npm test -- --testPathPattern="{story-id}"
   ```
5. If tests pass unexpectedly, investigate - something is wrong

### Phase 2: GREEN - Make Tests Pass

1. **Implement the minimum code** to pass each test
2. **Run tests after each change**:
   ```bash
   npm test -- --testPathPattern="{story-id}"
   ```
3. **Iterate until all tests pass**
4. Do NOT add extra features - only what's needed to pass tests

### Phase 3: REFACTOR - Clean Up

1. **Review the implementation** for:
   - Code duplication
   - Unclear naming
   - Complex logic that could be simplified
2. **Refactor while keeping tests green**
3. **Run tests after each refactor**:
   ```bash
   npm test
   ```

### Phase 4: VERIFY - Full Validation

Run complete verification:

```bash
# Lint
npm run lint

# Type check
npm run typecheck 2>/dev/null || npx tsc --noEmit

# All tests
npm test

# Build
npm run build
```

If ANY step fails:
1. Fix the issue
2. Re-run verification
3. Do NOT proceed until all pass

### Phase 5: AUTO-UPDATE DOCUMENTATION

Documentation is updated automatically after each story:

#### 5a. Update prd.json
```json
{
  "id": "{story-id}",
  "passes": true
}
```

#### 5b. Update INDEX.md
Add all new files to the registry:
```markdown
| `{path/file.ts}` | {purpose} | `{exports}` |
```
Update dependency graph if needed.

#### 5c. Update AGENTS.md
Add patterns discovered:
```markdown
### Pattern: {Name}
**When**: {trigger}
**Do**: {action}
```
Add gotchas:
```markdown
| {Situation} | {Watch out} | {Solution} |
```

#### 5d. Append to progress.txt
```markdown
---
## {YYYY-MM-DD} - {story-id}: {title}
### Completed
- {What was implemented}
### Files Created/Changed
- `{path}`: {description}
### Patterns Used
- {Pattern}: {why}
### Gotchas Found
- {Issue}: {solution}
### Learnings
- {Insight for future}
---
```

#### 5e. Update USAGE.md (if user-facing feature)
```markdown
## {Feature}
**Usage**: `{example}`
```

### Phase 6: COMMIT & PR

1. **Stage changes** (specific files, not `git add .`):
   ```bash
   git add src/{files} tests/{files} docs/specs/prd.json
   ```

2. **Commit with descriptive message**:
   ```bash
   git commit -m "feat({story-id}): {description}

   - Implements {story title}
   - Adds tests for {acceptance criteria}

   Co-Authored-By: Claude <noreply@anthropic.com>"
   ```

3. **Push and create PR**:
   ```bash
   git push -u origin HEAD
   gh pr create --title "feat({story-id}): {description}" --body "## Summary
   Implements {story-id}: {title}

   ## Changes
   - {change 1}
   - {change 2}

   ## Test Plan
   - [x] Unit tests pass
   - [x] Integration tests pass
   - [x] All acceptance criteria verified

   ## Checklist
   - [x] Tests added
   - [x] Lint passes
   - [x] Type check passes
   - [x] Build succeeds"
   ```

### Phase 7: MERGE & NEXT

1. **Wait for PR checks** (if CI configured)
2. **Merge the PR**:
   ```bash
   gh pr merge --squash --delete-branch
   ```
3. **Return to main**:
   ```bash
   git checkout main && git pull
   ```
4. **Check for next story** in prd.json where `passes: false`
5. If more stories exist, repeat from Phase 0
6. If all stories pass, output completion message

### Completion Signal

When all stories in prd.json have `passes: true`:

```
<promise>TASK_COMPLETE</promise>
```

Report:
- All completed stories
- Total PRs created
- Any notes or recommendations

### Error Handling

If stuck on a story for more than 3 attempts:
1. Document the blocker in `progress.txt`
2. Skip to next story if possible
3. Report blocked stories at the end
