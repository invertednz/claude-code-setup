# Complete Task Workflow

Full task completion workflow: verify, test, commit, PR, and prepare for next task.

## Pre-computed Context

```bash
git status
git diff --stat
cat package.json 2>/dev/null | grep -A 20 '"scripts"' || echo "No package.json"
```

## Instructions

Follow this complete workflow:

### 1. Verify Changes Compile/Build
- Run type checking if TypeScript project
- Run build command
- Fix any errors before proceeding

### 2. Create Tests (if project requires testing)

Check if this project has testing requirements enabled. If so:

**Unit Tests:**
- Create tests for new functions/components
- Place in `*.test.ts` or `*.spec.ts` alongside source
- Test edge cases and error conditions

**Integration Tests:**
- Create tests for API endpoints or component interactions
- Place in `tests/integration/`
- Test realistic usage scenarios

**UI Tests (if UI changes):**
- Create end-to-end tests for user flows
- Place in `tests/e2e/` or `tests/ui/`
- Test critical user journeys

### 3. Run Full Verification
- Run lint, typecheck, all test suites
- Fix any failures before proceeding

### 4. Commit and Push
- Stage specific files (not `git add .`)
- Write descriptive commit message
- Push to remote

### 5. Create Pull Request
- Use `gh pr create`
- Include summary of changes
- Include test plan section
- Link any related issues

### 6. Report Completion
- Provide PR URL
- Summarize what was completed
- Note any follow-up items

## Important

Do NOT skip any steps. If verification fails, fix issues before creating PR.
