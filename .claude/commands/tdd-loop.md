# TDD Loop - Full Automated Workflow

Uses the ralph-loop plugin with TDD methodology.

## Usage

```
/tdd-loop US-1            # Single story
/tdd-loop US-1,US-2       # Multiple stories
/tdd-loop all             # All incomplete stories
```

## Prerequisite

1. Run `/create-spec` first to create prd.json
2. Ensure ralph-loop plugin is installed: `/plugin install ralph-loop@claude-plugins-official`

## Pre-computed Context

```bash
cat docs/specs/prd.json 2>/dev/null || echo "ERROR: No prd.json - run /create-spec first"
cat docs/INDEX.md 2>/dev/null | head -30 || echo "No docs - will create"
git branch --show-current
```

## Arguments

- **task** (required): Story ID(s) or "all"

## Instructions

### Step 1: Parse Task Argument

If no argument provided:
- List available stories from prd.json
- Ask: "Which stories? (e.g., US-1 or US-1,US-2 or all)"

### Step 2: Build TDD Prompt

For the selected story/stories, construct a prompt following the ralph-loop TDD template:

```markdown
Complete the following user story using TDD methodology.

## Story: {story-id} - {title}

{description}

### Acceptance Criteria
{acceptance_criteria as checklist}

## TDD Process (Follow Exactly)

1. **Create feature branch**
   git checkout main && git pull
   git checkout -b feature/{story-id}

2. **Write failing tests FIRST**
   - Unit tests in tests/unit/{feature}/{story-id}.test.ts
   - Integration tests in tests/integration/{feature}/{story-id}.test.ts
   - E2E tests (Playwright) in tests/e2e/{feature}/{story-id}.spec.ts

3. **Run tests - confirm they FAIL**
   npm test

4. **Implement minimum code to pass tests**
   - Only implement what's needed
   - No extra features

5. **Run tests after each change**
   npm test

6. **If tests fail, debug and fix**
   - Read error messages
   - Fix the issue
   - Run tests again

7. **When tests pass, refactor if needed**
   - Remove duplication
   - Improve naming
   - Keep tests green

8. **Run full verification**
   npm run lint
   npm run typecheck
   npm test
   npm run build

9. **Security scan**
   - Check for hardcoded secrets/credentials
   - Scan for SQL injection vulnerabilities
   - Scan for XSS vulnerabilities
   - Scan for command injection
   - Run `npm audit` for dependency vulnerabilities
   - Fix any issues before proceeding

11. **Update documentation**
    - Add new files to docs/INDEX.md
    - Add patterns/gotchas to docs/AGENTS.md
    - Append learnings to docs/progress.txt

12. **Commit and create PR**
    git add src/ tests/ docs/
    git commit -m "feat({story-id}): {title}"
    git push -u origin HEAD
    gh pr create

13. **Merge PR**
    gh pr merge --squash --delete-branch
    git checkout main && git pull

14. **Mark story complete**
    Update prd.json: { "id": "{story-id}", "passes": true }

## Completion Criteria

Output <promise>TASK_COMPLETE</promise> ONLY when:
- All tests pass (unit, integration, e2e)
- Lint passes
- TypeScript compiles
- Build succeeds
- Security scan passes (no vulnerabilities)
- Documentation updated
- PR merged to main
- Story marked as passes: true in prd.json

If multiple stories, repeat for each one.
```

### Step 3: Start Ralph Loop

Execute the ralph-loop with the TDD prompt:

```bash
/ralph-loop:ralph-loop "{TDD prompt}" --max-iterations 30 --completion-promise "TASK_COMPLETE"
```

### Step 4: Loop Behavior

The ralph-loop plugin handles:
- Automatic re-prompting after each iteration
- Persistence of work in files/git
- Stopping when completion promise is output
- Max iterations safety limit

### Completion

When `<promise>TASK_COMPLETE</promise>` is output:
- All specified stories are done
- All tests pass (unit, integration, e2e)
- Security scan passed
- PRs have been merged
- Documentation is updated

Report summary:
- Stories completed
- Tests created/passed
- Security issues found/fixed
- PRs created
- Files changed
