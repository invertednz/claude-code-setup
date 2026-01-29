# Start Task - Full Automated Workflow

**Requires task ID**: Specify which story to work on from `docs/specs/prd.json`.

This is a **complete workflow** - branch, implement, test, security, docs, PR, merge.

## Usage

```
/start-task US-1
/start-task US-2
/start-task "Add user authentication"
```

## Prerequisite

Run `/create-spec` first to create the specification with user stories.

## Pre-computed Context

```bash
git branch --show-current
git status --short
cat docs/specs/prd.json 2>/dev/null || echo "No prd.json - run /create-spec first"
cat docs/INDEX.md 2>/dev/null | head -30 || echo "No docs yet"
cat package.json 2>/dev/null | grep -A 15 '"scripts"' || echo "No package.json"
```

## Arguments

- **task** (required): Story ID from prd.json (e.g., "US-1") or task description

## Instructions

### Phase 1: SETUP

#### 1a. Parse Task Argument
If argument matches a story ID in prd.json (e.g., "US-1"):
- Load that specific story
- Show story details and confirm

If argument is a description (not in prd.json):
- Use it as an ad-hoc task
- Ask clarifying questions if needed

If NO argument provided:
- List available stories from prd.json
- Ask: "Which story would you like to work on?"

#### 1b. Ensure Clean State
Check for uncommitted changes:
- If changes exist, ask: "Uncommitted changes found. Stash, commit, or abort?"

#### 1c. Update Main
```bash
git checkout main
git pull origin main
```

#### 1d. Create Feature Branch
```bash
git checkout -b feature/{story-id}-{short-description}
```

#### 1e. Initialize Docs (if missing)
If `docs/INDEX.md` doesn't exist, create documentation structure.

### Phase 2: PLAN

#### 2a. Display Task
Show the user:
- Story ID and title (if from prd.json)
- Description
- Acceptance criteria

#### 2b. Confirm
Ask: "Ready to implement? Any questions before I start?"

Get user approval before proceeding.

### Phase 3: IMPLEMENT

#### 3a. Write Code
Implement the feature/fix based on the plan.

#### 3b. Create Tests
**Unit Tests** (`*.test.ts` alongside source):
- Test happy path
- Test edge cases
- Test error conditions

**Integration Tests** (`tests/integration/`):
- Test component interactions
- Test API endpoints

**E2E Tests with Playwright** (`tests/e2e/`):
- Test user flows
- Test critical journeys

### Phase 4: VERIFY (Automatic)

Run all verification automatically:

```bash
# Lint
npm run lint || npx eslint . --ext .ts,.tsx,.js,.jsx

# Type check
npm run typecheck || npx tsc --noEmit

# Unit tests
npm test || npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e || npx playwright test

# Build
npm run build
```

If ANY fails:
1. Fix the issue
2. Re-run verification
3. Repeat until all pass

### Phase 5: SECURITY CHECK (Automatic)

Automatically scan for:
- Hardcoded secrets/credentials
- SQL injection vulnerabilities
- XSS vulnerabilities
- Command injection
- Insecure dependencies (`npm audit`)

Report any issues and fix before proceeding.

### Phase 6: UPDATE DOCUMENTATION (Automatic)

#### 6a. Update INDEX.md
Add ALL new/modified files:
```markdown
| `{path/file.ts}` | {purpose} | `{exports}` |
```

#### 6b. Update AGENTS.md
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

#### 6c. Append to progress.txt
```markdown
---
## {YYYY-MM-DD} - {story-id}: {title}
### Completed
- {What was built}
### Files Changed
- `{path}`: {description}
### Tests Added
- {Test file}: {what it tests}
### Patterns Used
- {Pattern}: {why}
### Learnings
- {Insight}
---
```

#### 6d. Update USAGE.md (if user-facing)
```markdown
## {Feature}
**Usage**: `{example}`
```

#### 6e. Update prd.json
Mark the story as complete:
```json
{ "id": "{story-id}", "passes": true }
```

### Phase 7: COMMIT & PR (Automatic)

#### 7a. Stage Files
```bash
git add src/ tests/ docs/
```

#### 7b. Commit
```bash
git commit -m "{type}({scope}): {description}

- {Change 1}
- {Change 2}
- Tests: {test summary}
- Docs: Updated INDEX.md, progress.txt

Co-Authored-By: Claude <noreply@anthropic.com>"
```

#### 7c. Push & Create PR
```bash
git push -u origin HEAD

gh pr create --title "{type}({scope}): {description}" --body "## Summary
{Brief description}

## Changes
- {Change 1}
- {Change 2}

## Testing
- [x] Unit tests added/updated
- [x] Integration tests (if applicable)
- [x] E2E tests (if applicable)
- [x] All tests passing

## Security
- [x] Security scan passed
- [x] No secrets in code

## Documentation
- [x] INDEX.md updated
- [x] progress.txt updated
- [x] USAGE.md updated (if user-facing)

## Checklist
- [x] Lint passes
- [x] Type check passes
- [x] Build succeeds"
```

### Phase 8: MERGE & COMPLETE (Automatic)

#### 8a. Merge PR
```bash
gh pr merge --squash --delete-branch
```

#### 8b. Return to Main
```bash
git checkout main
git pull
```

#### 8c. Report Completion
Output:
- PR URL
- Summary of what was completed
- Files changed
- Tests added
- Documentation updated

Ask: "What would you like to work on next?"

## Important

This command handles the ENTIRE workflow:
- ✅ Branch creation
- ✅ Implementation
- ✅ Testing (unit, integration, e2e)
- ✅ Security scanning
- ✅ Documentation updates
- ✅ Commit & PR
- ✅ Merge

No need to run `/finish-task` or `/complete-task` - it's all included.
