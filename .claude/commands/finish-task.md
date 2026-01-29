# Finish Task

Complete the current task: verify, commit, create PR, and merge.

## Pre-computed Context

```bash
git branch --show-current
git status
git diff --stat
git log main..HEAD --oneline
```

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

### Step 3: Stage and Commit

1. Review changes:
   ```bash
   git diff --name-only
   ```

2. Stage specific files (avoid `git add .`):
   ```bash
   git add {specific files}
   ```

3. Create commit:
   ```bash
   git commit -m "{type}({scope}): {description}

   {body explaining what and why}

   Co-Authored-By: Claude <noreply@anthropic.com>"
   ```

### Step 4: Push and Create PR

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

### Step 5: Merge PR

Ask user: "PR created. Should I merge it now?"

If yes:
```bash
gh pr merge --squash --delete-branch
git checkout main
git pull
```

### Step 6: Report

Output:
- PR URL
- Merge status
- Current branch (should be main)
- Suggest next task or ask what to work on next
