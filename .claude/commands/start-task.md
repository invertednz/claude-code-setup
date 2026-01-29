# Start New Task

Create a new branch for a task and set up the working environment.

## Pre-computed Context

```bash
git branch --show-current
git status --short
git log --oneline -3
```

## Instructions

### Step 1: Ensure Clean State

Check for uncommitted changes:
- If changes exist, ask user: "You have uncommitted changes. Should I stash them, commit them, or abort?"
- Handle accordingly

### Step 2: Update Main

```bash
git checkout main
git pull origin main
```

### Step 3: Create Feature Branch

Ask user for task description if not provided, then:

```bash
# Branch naming convention:
# feature/{short-description} - for new features
# fix/{short-description} - for bug fixes
# refactor/{short-description} - for refactoring
# docs/{short-description} - for documentation

git checkout -b {type}/{short-description}
```

Examples:
- `feature/user-authentication`
- `fix/login-validation`
- `refactor/api-client`

### Step 4: Report

Output:
- Branch name created
- Starting point (main branch commit)
- Ready to begin work

Suggest next steps:
- `/create-spec` if starting a new feature
- Begin implementation if spec exists
- `/tdd-loop` if tests are ready
