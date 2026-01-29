# Complete Task Workflow

Full task completion workflow: verify, test, **auto-update docs**, commit, PR.

Documentation updates are AUTOMATIC - included in this workflow.

## Pre-computed Context

```bash
git status
git diff --stat
git diff --name-only
cat package.json 2>/dev/null | grep -A 20 '"scripts"' || echo "No package.json"
cat docs/INDEX.md 2>/dev/null | head -30 || echo "No docs - will create"
cat docs/AGENTS.md 2>/dev/null | head -20 || echo "No AGENTS.md"
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
- Create Playwright end-to-end tests for user flows
- Place in `tests/e2e/`
- Test critical user journeys

### 3. Run Full Verification
- Run lint, typecheck, all test suites
- Fix any failures before proceeding

### 4. Auto-Update Documentation (AUTOMATIC)

Documentation updates happen automatically. Perform ALL:

#### 4a. Create docs if missing
If no `docs/` directory, create structure:
```bash
mkdir -p docs
```
Create INDEX.md, AGENTS.md, ARCHITECTURE.md, USAGE.md, progress.txt.

#### 4b. Update INDEX.md (ALWAYS)
For EVERY new/changed file, add to registry:
```markdown
| `{path/file.ts}` | {purpose} | `{exports}` |
```
Update dependency graph if structure changed.

#### 4c. Update AGENTS.md (if patterns/gotchas)
```markdown
### Pattern: {Name}
**When**: {trigger}
**Do**: {action}
**Example**: `{reference}`
```
Add gotchas:
```markdown
| {Situation} | {Watch out} | {Solution} |
```

#### 4d. Append to progress.txt (ALWAYS)
```markdown
---
## {YYYY-MM-DD} - {Task Name}
### Completed
- {What was built}
### Files Changed
- `{path}`: {change}
### Learnings
- {Insight}
---
```

#### 4e. Update USAGE.md (if user-facing)
```markdown
## {Feature}
**Usage**: `{example code}`
```

#### 4f. Stage docs
```bash
git add docs/
```

### 5. Commit and Push
- Stage specific files including docs: `git add src/ tests/ docs/`
- Write descriptive commit message
- Push to remote

### 6. Create Pull Request
- Use `gh pr create`
- Include summary of changes
- Include test plan section
- Include documentation updates

### 7. Report Completion
- Provide PR URL
- Summarize what was completed
- List documentation updated
- Note any follow-up items

## Important

Do NOT skip any steps. If verification fails, fix issues before creating PR.
Documentation updates are REQUIRED - they are the source of truth for future context.
