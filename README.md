# Claude Code Team Setup

A streamlined, production-ready configuration for Claude Code based on [Boris Cherny's (Claude Code creator) workflow](https://x.com/i/status/2007179832300581177).

---

## Table of Contents

1. [Quick Setup](#quick-setup)
2. [What You Get](#what-you-get)
3. [Daily Usage Guide](#daily-usage-guide)
4. [Commands Reference](#commands-reference)
5. [Team Workflow](#team-workflow)
6. [Customization](#customization)
7. [Troubleshooting](#troubleshooting)

---

## Quick Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- [Claude Code CLI](https://claude.ai/code) installed (`npm install -g @anthropic-ai/claude-code`)
- [GitHub CLI](https://cli.github.com/) installed and authenticated (`gh auth login`)

### Installation

**Option A: Global Setup (Recommended for individuals)**

```bash
# Clone this repo
git clone <repo-url> claude-code-setup
cd claude-code-setup

# Run the installer
node scripts/setup.js --global
```

This installs commands and settings to `~/.claude/` - available in ALL your projects.

**Option B: Project Setup (Recommended for teams)**

```bash
# From your project directory
cd /path/to/your/project

# Run the installer
node /path/to/claude-code-setup/scripts/setup.js --project

# Commit the configuration
git add .claude/ CLAUDE.md
git commit -m "Add Claude Code team configuration"
git push
```

This installs to your project's `.claude/` folder - shared with your team via git.

**Option C: Both**

```bash
node scripts/setup.js --both
```

### Verify Installation

```bash
# Start Claude Code
claude

# Check commands are available
/help
```

You should see the custom commands: `/commit-push-pr`, `/complete-task`, etc.

---

## What You Get

### Slash Commands

| Command | What It Does |
|---------|--------------|
| `/commit-push-pr` | Commits your changes, pushes to remote, creates a PR |
| `/complete-task` | Full workflow: verify → test → commit → PR |
| `/test-and-verify` | Runs lint, typecheck, tests, and build |
| `/create-tests` | Generates unit, integration, and UI tests |
| `/security-check` | Analyzes code for OWASP Top 10 vulnerabilities |

### Automatic Formatting

A hook automatically formats code with Prettier after every edit.

### Pre-Approved Commands

Common safe commands are pre-approved to reduce permission prompts:
- Git operations (status, diff, commit, push, pull, etc.)
- npm/pnpm/yarn commands
- Node, TypeScript, ESLint, Prettier

### Security Guardrails

Dangerous commands are blocked:
- `git push --force`
- `git reset --hard`
- `--no-verify` flags
- Commands containing sensitive keywords

---

## Daily Usage Guide

### Starting a Task

1. **Open your terminal** in your project directory

2. **Start Claude Code**
   ```bash
   claude
   ```

3. **Enter Plan Mode** (press `Shift+Tab` twice)

   This is crucial. As Boris says:
   > "I use Plan mode, and go back and forth with Claude until I like its plan. From there, I switch into auto-accept edits mode and Claude can usually 1-shot it."

4. **Describe your task** to Claude and iterate on the plan

5. **When the plan is solid**, switch to auto-accept mode and let Claude implement

### Completing a Task

When your implementation is done, run:

```
/complete-task
```

This will:
1. ✅ Verify code compiles/builds
2. ✅ Create tests (unit, integration, UI as needed)
3. ✅ Run the full test suite
4. ✅ Commit with a descriptive message
5. ✅ Push and create a PR
6. ✅ Return the PR URL

### Quick Commits (without full workflow)

For smaller changes:

```
/commit-push-pr
```

### Running Verification Only

To check everything passes without committing:

```
/test-and-verify
```

### Creating Tests Only

To generate tests for your recent changes:

```
/create-tests
```

### Security Review

Before merging sensitive changes:

```
/security-check
```

---

## Commands Reference

### `/commit-push-pr`

**Purpose:** Quick commit and PR creation

**What it does:**
1. Reviews staged and unstaged changes
2. Stages relevant files (specific files, not `git add .`)
3. Creates commit with descriptive message
4. Pushes to remote
5. Creates PR with summary and test plan
6. Returns PR URL

**When to use:** After implementing a small change that doesn't need new tests

---

### `/complete-task`

**Purpose:** Full task completion workflow

**What it does:**
1. Verifies code compiles (typecheck, build)
2. Creates appropriate tests:
   - Unit tests for new functions
   - Integration tests for APIs
   - UI tests for user-facing changes
3. Runs full verification suite
4. Commits and pushes
5. Creates PR

**When to use:** After completing any feature or fix (recommended default)

---

### `/test-and-verify`

**Purpose:** Run all quality checks

**What it does:**
1. Lint check (`npm run lint`)
2. Type check (`tsc --noEmit`)
3. Unit tests (`npm test`)
4. Integration tests (`npm run test:integration`)
5. Build check (`npm run build`)

**When to use:** Before committing, or to verify current state

---

### `/create-tests`

**Purpose:** Generate tests for changed code

**What it does:**
1. Identifies changed files
2. Creates unit tests (same directory as source)
3. Creates integration tests (`tests/integration/`)
4. Creates UI tests (`tests/e2e/`)
5. Runs new tests to verify they pass

**When to use:** When you need tests but aren't ready for full commit

---

### `/security-check`

**Purpose:** Security vulnerability analysis

**What it does:**
1. Scans for accidentally committed secrets
2. Reviews for OWASP Top 10 vulnerabilities:
   - Injection (SQL, command, template)
   - Broken authentication
   - Sensitive data exposure
   - XSS
   - Broken access control
   - Security misconfiguration
3. Runs `npm audit`
4. Provides categorized report (Critical/Warning/Info)

**When to use:** Before merging any PR, especially auth/data handling code

---

## Team Workflow

### Sharing Configuration

The `.claude/` directory and `CLAUDE.md` are checked into git. When team members pull:

```bash
git pull
# Configuration is automatically available
```

### Improving CLAUDE.md Together

> "Anytime we see Claude do something incorrectly we add it to the CLAUDE.md, so Claude knows not to do it next time." - Boris

When Claude makes a mistake:
1. Fix the issue
2. Add guidance to `CLAUDE.md` to prevent it recurring
3. Commit the update

Example addition:
```markdown
## Project-Specific Notes

- Always use `pnpm` instead of `npm` in this project
- Database migrations must be run with `pnpm migrate` before testing
- The `/api/v2/` endpoints require authentication headers
```

### Code Review with Claude

Install the GitHub Action:
```
/install-github-action
```

Then tag `@.claude` in PR comments to have Claude help with reviews.

### Parallel Development (Advanced)

Boris runs 5+ Claude instances simultaneously. To do this:

```bash
# Create separate git checkouts
git clone <repo> project-1
git clone <repo> project-2
git clone <repo> project-3

# Run Claude in each
cd project-1 && claude  # Terminal 1
cd project-2 && claude  # Terminal 2
cd project-3 && claude  # Terminal 3
```

Each instance works on a different task without conflicts.

---

## Customization

### Project-Specific CLAUDE.md

Edit `CLAUDE.md` in your project root:

```markdown
## Project-Specific Notes

- Package manager: pnpm (not npm)
- Test command: `pnpm test:all`
- Requires Docker running for integration tests
- API docs: `/docs/api.md`
- Use `camelCase` for variables, `PascalCase` for components
```

### Adding Custom Commands

Create `.claude/commands/my-command.md`:

```markdown
# My Custom Command

Description of what this command does.

## Pre-computed Context

\`\`\`bash
# Commands to gather context (runs before Claude sees the prompt)
git status
cat package.json | grep version
\`\`\`

## Instructions

1. First step
2. Second step
3. Third step
```

### Modifying Permissions

Edit `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(your-safe-command *)"
    ],
    "deny": [
      "Bash(dangerous-command *)"
    ]
  }
}
```

### Adding Hooks

Edit `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool": "Write", "path": "*.py" },
        "hooks": [
          { "type": "command", "command": "black \"$CLAUDE_FILE_PATH\"" }
        ]
      }
    ]
  }
}
```

---

## Troubleshooting

### Commands not appearing

```bash
# Check global installation
ls ~/.claude/commands/

# Check project installation
ls .claude/commands/

# Restart Claude Code
exit
claude
```

### Permission prompts still appearing

The command might not match the allow pattern exactly. Check `.claude/settings.json` and adjust patterns.

### Hooks not running

1. Verify the tool is installed (e.g., `npx prettier --version`)
2. Check hook syntax in `settings.json`
3. Hooks run silently - check if file is actually formatted

### Tests not being created

Ensure your project has a test framework configured:
```bash
npm install --save-dev jest @types/jest ts-jest
# or
npm install --save-dev vitest
```

### PR creation failing

```bash
# Verify GitHub CLI is authenticated
gh auth status

# Login if needed
gh auth login
```

---

## Philosophy

This setup follows Boris's key principles:

1. **Plan before implementing** - Solid plans lead to one-shot implementations
2. **Verification loops are critical** - Always give Claude a way to verify its work
3. **One task per Claude instance** - Avoid scope creep
4. **Compound team knowledge** - CLAUDE.md improves over time
5. **Stay vanilla** - Simple configurations that work

---

## Sources

- [Boris Cherny's Setup (X/Twitter)](https://x.com/i/status/2007179832300581177)
- [Claude Code Best Practices (Anthropic)](https://www.anthropic.com/engineering/claude-code-best-practices)
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code)

---

## License

MIT
