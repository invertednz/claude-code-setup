# TDD Loop - Full Automated Workflow

**Runs from spec**: Reads `docs/specs/prd.json` and completes ALL stories automatically.

Complete TDD cycle for all stories: Red → Green → Refactor → Security → Docs → PR → Merge.

## Prerequisite

Run `/create-spec` first to create the specification with user stories.

## Pre-computed Context

```bash
git branch --show-current
git status --short
cat docs/specs/prd.json 2>/dev/null || echo "ERROR: No prd.json - run /create-spec first"
cat docs/INDEX.md 2>/dev/null | head -30 || echo "No docs - will create"
cat package.json 2>/dev/null | grep -A 15 '"scripts"' || echo "No package.json"
```

## Spec Requirement

This command requires `docs/specs/prd.json` with stories:
```json
{
  "name": "Feature Name",
  "stories": [
    {
      "id": "US-1",
      "title": "Story title",
      "description": "...",
      "acceptance_criteria": ["..."],
      "priority": 1,
      "passes": false
    }
  ]
}
```

If no prd.json exists, prompt user to run `/create-spec` first.

## Instructions

For EACH story in prd.json, execute the complete workflow automatically:

---

## Per-Story Workflow

### Phase 0: SETUP BRANCH

```bash
git checkout main
git pull origin main
git checkout -b feature/{story-id}-{short-description}
```

Initialize docs if missing.

### Phase 1: RED - Failing Tests

1. Read story from `docs/specs/prd.json`
2. Select highest priority story where `passes: false`
3. Verify/create tests:
   - Unit tests: `tests/unit/{feature}/{story-id}.test.ts`
   - Integration: `tests/integration/{feature}/{story-id}.test.ts`
   - E2E (Playwright): `tests/e2e/{feature}/{story-id}.spec.ts`
4. Run tests - confirm they FAIL:
   ```bash
   npm test -- --testPathPattern="{story-id}"
   ```

### Phase 2: GREEN - Make Tests Pass

1. Implement minimum code to pass tests
2. Run tests after each change:
   ```bash
   npm test -- --testPathPattern="{story-id}"
   ```
3. Iterate until ALL tests pass
4. Only implement what's needed - no extras

### Phase 3: REFACTOR

1. Review implementation:
   - Remove duplication
   - Improve naming
   - Simplify complex logic
2. Keep tests green:
   ```bash
   npm test
   ```

### Phase 4: VERIFY (Automatic)

Run full verification:

```bash
# Lint
npm run lint

# Type check
npm run typecheck || npx tsc --noEmit

# All tests
npm test

# E2E tests
npm run test:e2e || npx playwright test

# Build
npm run build
```

Fix any failures, repeat until all pass.

### Phase 5: SECURITY CHECK (Automatic)

Scan for:
- Hardcoded secrets/credentials
- Injection vulnerabilities (SQL, XSS, command)
- Insecure patterns
- `npm audit`

Fix issues before proceeding.

### Phase 6: UPDATE DOCS (Automatic)

#### 6a. Update prd.json
```json
{ "id": "{story-id}", "passes": true }
```

#### 6b. Update INDEX.md
Add all new files:
```markdown
| `{path/file.ts}` | {purpose} | `{exports}` |
```

#### 6c. Update AGENTS.md
Add patterns/gotchas discovered.

#### 6d. Append to progress.txt
```markdown
---
## {YYYY-MM-DD} - {story-id}: {title}
### Completed
- {What was implemented}
### Files
- `{path}`: {description}
### Tests
- `{test file}`: {what it tests}
### Learnings
- {Insights}
---
```

#### 6e. Update USAGE.md (if user-facing)

### Phase 7: COMMIT & PR (Automatic)

```bash
git add src/ tests/ docs/

git commit -m "feat({story-id}): {title}

- Implements: {description}
- Tests: unit, integration, e2e
- Docs: Updated

Co-Authored-By: Claude <noreply@anthropic.com>"

git push -u origin HEAD

gh pr create --title "feat({story-id}): {title}" --body "## Summary
Implements {story-id}: {title}

## Changes
- {Changes}

## Testing
- [x] Unit tests
- [x] Integration tests
- [x] E2E tests (Playwright)
- [x] All passing

## Security
- [x] Scan passed

## Documentation
- [x] INDEX.md updated
- [x] progress.txt updated"
```

### Phase 8: MERGE (Automatic)

```bash
gh pr merge --squash --delete-branch
git checkout main
git pull
```

---

## Loop Control

After completing each story:

1. Check `prd.json` for next story where `passes: false`
2. If more stories exist → Repeat from Phase 0
3. If all stories `passes: true` → Output completion:

```
<promise>TASK_COMPLETE</promise>
```

Report:
- All completed stories
- PRs created
- Documentation updated
- Total files changed

### Error Recovery

If stuck on a story (3+ attempts):
1. Document blocker in progress.txt
2. Skip to next story
3. Report blocked stories at end

---

## What This Handles Automatically

For EACH story:
- ✅ Branch creation
- ✅ TDD cycle (Red → Green → Refactor)
- ✅ Testing (unit, integration, Playwright e2e)
- ✅ Security scanning
- ✅ Documentation updates
- ✅ Commit & PR
- ✅ Merge to main

No need to run any other commands - this handles everything.
