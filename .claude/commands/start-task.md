# Start Task - Full Automated Workflow

**Runs from spec**: Reads next story from `docs/specs/prd.json` and completes it automatically.

This is a **complete workflow** - branch, implement, test, security, docs, PR, merge.

## Prerequisite

Run `/create-spec` first to create the specification with user stories.

## Pre-computed Context

```bash
git branch --show-current
git status --short
git log --oneline -3
cat docs/specs/prd.json 2>/dev/null || echo "No prd.json - run /create-spec first"
cat docs/INDEX.md 2>/dev/null | head -30 || echo "No docs yet"
cat docs/AGENTS.md 2>/dev/null | head -20 || echo "No AGENTS.md"
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

### Phase 1: SETUP

#### 1a. Read Spec
Load `docs/specs/prd.json` and select the highest priority story where `passes: false`.

If all stories are complete, report "All stories complete!" and exit.

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

#### 2a. Display Story
Show the user:
- Story ID and title
- Description
- Acceptance criteria

#### 2b. Confirm or Clarify
Ask: "Ready to implement this story? Any questions before I start?"

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
