# Commit, Push, and Create PR

Create a commit with the current changes, push to remote, and create a pull request.

## Pre-computed Context

```bash
git status
git diff --cached --stat
git log --oneline -5
git branch --show-current
```

## Instructions

1. Review the staged and unstaged changes
2. Stage relevant files (be specific, avoid `git add .`)
3. Write a clear commit message:
   - First line: concise summary (50 chars max)
   - Body: explain "why" not "what"
   - End with: `Co-Authored-By: Claude <noreply@anthropic.com>`
4. Push to remote with `-u` flag if new branch
5. Create PR using `gh pr create`:
   - Title: concise description of change
   - Body: summary bullets, test plan, and link to any issues
6. Return the PR URL

## Important

- Do NOT force push
- Do NOT skip pre-commit hooks
- If hooks fail, fix the issues and create a NEW commit
- Never commit `.env`, credentials, or secrets
