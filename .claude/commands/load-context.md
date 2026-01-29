# Load Context

Load minimal context from documentation before starting work. Reduces tokens by ~50%.

## Pre-computed Context

```bash
cat docs/INDEX.md 2>/dev/null || echo "No INDEX.md - run /init-docs"
cat docs/AGENTS.md 2>/dev/null || echo "No AGENTS.md"
```

## Instructions

### Purpose

Instead of reading all source files, load documentation that maps the codebase.

**Token savings**:
- Reading all source files: ~10,000-50,000 tokens
- Reading INDEX.md + AGENTS.md: ~1,000-3,000 tokens
- Savings: 50-90%

### Step 1: Load INDEX.md (Required)

Read `docs/INDEX.md` to understand:
- Directory structure
- Key files and their purposes
- Module dependencies
- Patterns used
- Known gotchas

This is the **codebase map** - know what exists and where.

### Step 2: Load AGENTS.md (Required)

Read `docs/AGENTS.md` to understand:
- Coding patterns to follow
- Gotchas to avoid
- Conventions to use
- Stack-specific notes

This is **codebase intelligence** - know how to work here.

### Step 3: Selective Loading

Based on the task, load only needed files:

| Task Type | Load |
|-----------|------|
| API work | INDEX.md API section → specific route files |
| UI work | INDEX.md Components section → specific components |
| Bug fix | AGENTS.md Gotchas → relevant source file |
| New feature | INDEX.md → similar existing feature files |
| Tests | INDEX.md Tests section → test patterns |

### Step 4: Report Context

Summarize what was loaded:
- Files in context
- Estimated tokens used
- Ready to work on: {task description}

### When to Load More

Only load additional source files when:
- Need to see implementation details
- Modifying existing code
- Understanding complex logic

Ask: "Do I need the actual source, or is the documentation sufficient?"

### Output

```
Context loaded:
- docs/INDEX.md: Codebase structure ({N} files mapped)
- docs/AGENTS.md: {N} patterns, {N} gotchas

Estimated tokens: ~{X}
Token savings vs full source: ~{Y}%

Ready to work. Load specific files as needed.
```
