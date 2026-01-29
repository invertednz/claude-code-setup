# Finish Task

Complete the current task: verify, test, **auto-update docs**, commit, create PR, and merge.

Documentation updates are AUTOMATIC - no manual `/update-docs` needed.

## Pre-computed Context

```bash
git branch --show-current
git status
git diff --stat
git diff --name-only
git log main..HEAD --oneline
cat docs/INDEX.md 2>/dev/null | head -30 || echo "No docs - run /init-docs first"
cat docs/AGENTS.md 2>/dev/null | head -20 || echo "No AGENTS.md"


## Instructions

### Step 1: Verify Not on Main

```bash
BRANCH=$(git branch --show-current)
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
  echo "ERROR: Cannot finish task on main branch"
  exit 1
fi
```

If on main, abort and inform user to use `/start-task` first.

### Step 2: Run Full Verification

```bash
# Lint
npm run lint || echo "Lint failed"

# Type check
npm run typecheck 2>/dev/null || npx tsc --noEmit || echo "No TypeScript"

# Tests
npm test || echo "Tests failed"

# Build
npm run build || echo "Build failed"
```

If ANY verification fails:
1. Report which checks failed
2. Ask user: "Should I attempt to fix these issues?"
3. Fix if requested, then re-verify
4. Do NOT proceed until all pass

### Step 3: Auto-Update Documentation (REQUIRED)

Documentation updates happen automatically. Do ALL of the following:

#### 3a. Initialize docs if missing

If `docs/INDEX.md` doesn't exist:
```bash
mkdir -p docs
```
Then create INDEX.md, AGENTS.md, progress.txt with basic structure.

#### 3b. Update INDEX.md (ALWAYS)

For EACH new/modified file, add or update the registry:

```markdown
### {Section - Components/Services/Utils/etc.}
| File | Purpose | Exports |
|------|---------|---------|
| `{path/to/file.ts}` | {one-line purpose} | `{key exports}` |
```

Also update:
- Module dependencies diagram if structure changed
- Quick Reference table if new areas added

#### 3c. Update AGENTS.md (if patterns/gotchas found)

Add any discovered patterns:
```markdown
### Pattern: {Name}
**When**: {specific trigger condition}
**Do**: {specific action}
**Example**: `{file path or code snippet}`
```

Add any gotchas discovered:
```markdown
| {Situation} | {What to watch out for} | {Solution} |
```

#### 3d. Append to progress.txt (ALWAYS)

APPEND (never edit previous entries):
```markdown
---

## {YYYY-MM-DD} - {Task/Feature Name}

### Completed
- {Specific thing built/changed}
- {Another thing}

### Files Changed
- `{path}`: {brief description of change}

### Patterns Used
- {Pattern name}: {why it was used}

### Gotchas Found
- {Issue}: {solution that worked}

### Learnings
- {Insight for future reference}

---
```

#### 3e. Update USAGE.md (if user-facing features)

For new features users will interact with:
```markdown
## {Feature Name}

{One sentence description}

**Quick Start**:
```typescript
// Minimal working example
```

**Options**:
| Option | Type | Default | Description |
```

#### 3f. Stage documentation
```bash
git add docs/
```

### Step 4: Stage and Commit

1. Review changes:
   ```bash
   git diff --name-only
   ```

2. Stage specific files (avoid `git add .`):
   ```bash
   git add src/{files} tests/{files} docs/
   ```

3. Create commit:
   ```bash
   git commit -m "{type}({scope}): {description}

   {body explaining what and why}

   Co-Authored-By: Claude <noreply@anthropic.com>"
   ```

### Step 5: Push and Create PR

```bash
git push -u origin HEAD

gh pr create --title "{type}({scope}): {description}" --body "$(cat <<'EOF'
## Summary

{Brief description of changes}

## Changes

- {Change 1}
- {Change 2}
- {Change 3}

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## Testing

- [x] Unit tests pass
- [x] Integration tests pass (if applicable)
- [x] Manual testing performed

## Checklist

- [x] Code follows style guidelines
- [x] Self-review completed
- [x] Tests added/updated
- [x] Documentation updated (if needed)
EOF
)"
```

### Step 6: Merge PR

Ask user: "PR created. Should I merge it now?"

If yes:
```bash
gh pr merge --squash --delete-branch
git checkout main
git pull
```

### Step 7: Report

Output:
- PR URL
- Merge status
- Current branch (should be main)
- Suggest next task or ask what to work on next
