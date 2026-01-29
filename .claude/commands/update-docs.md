# Update Documentation

Update documentation after completing a task. Keeps docs as source of truth.

Based on best practices: layered documentation, trigger tables, append-only learnings.

## Pre-computed Context

```bash
git diff main --name-only 2>/dev/null || git diff HEAD~1 --name-only
cat docs/INDEX.md 2>/dev/null | head -60 || echo "Run /init-docs first"
cat docs/AGENTS.md 2>/dev/null | head -40 || echo "No AGENTS.md"
```

## Instructions

### Update Priority

1. **INDEX.md** - Always update (codebase map)
2. **AGENTS.md** - If patterns/gotchas discovered
3. **progress.txt** - Always append learnings
4. **ARCHITECTURE.md** - If significant technical changes
5. **USAGE.md** - If user-facing features changed

### Step 1: Identify Changes

From git diff, identify:
- New files created → Add to INDEX.md registry
- Modified files → Update INDEX.md if exports changed
- New patterns used → Add to AGENTS.md
- Gotchas discovered → Add to AGENTS.md
- User features → Add to USAGE.md

### Step 2: Update INDEX.md (Required)

Add new files to the registry:

```markdown
### {Section}
| File | Purpose | Exports |
|------|---------|---------|
| `{new file}` | {purpose} | `{exports}` |
```

Update module dependencies if changed.

Keep entries **concise** - one line per file.

### Step 3: Update AGENTS.md (If Applicable)

Add discovered patterns:

```markdown
### Pattern: {Name}
**When**: {Trigger - when to use this}
**Do**: {Action - what to do}
**Example**: `{brief code or file ref}`
```

Add gotchas:

```markdown
| {Situation} | {Watch out for} | {Solution} |
```

Add conventions:

```markdown
| {Area} | {Convention} | {Example} |
```

### Step 4: Append to progress.txt (Required)

Always append, never edit previous entries:

```markdown
---

## {Date} - {Task/Feature Name}

### Completed
- {What was built}

### Files Changed
- `{file}`: {brief change}

### Patterns Applied
- {Pattern used and why}

### Gotchas Found
- {Issue discovered}: {solution}

### Learnings
- {Insight gained}

---
```

### Step 5: Update ARCHITECTURE.md (If Significant)

Only update for:
- New system components
- Changed data flow
- New integration patterns
- Database schema changes

Keep technical but concise:

```markdown
## {Component Name}

**Added**: {date}
**Purpose**: {one sentence}
**Location**: `{path}`

**Key Interface**:
```typescript
// Only the public interface, not implementation
```
```

### Step 6: Update USAGE.md (If User-Facing)

Only update for:
- New features users can access
- Changed APIs or interfaces
- New configuration options

Keep user-focused:

```markdown
## {Feature Name}

**Quick Start**:
```typescript
// Minimal working example
```

**Options**: {table if multiple options}
```

### Step 7: Update CHANGELOG.md

Add entry under [Unreleased]:

```markdown
### Added
- {New feature}: {one-line description}

### Changed
- {Modified feature}: {what changed}

### Fixed
- {Bug}: {what was fixed}
```

### Step 8: Verify Index Accuracy

Cross-check INDEX.md against actual files:
- All new files listed?
- Exports still accurate?
- Dependencies still correct?

### Step 9: Commit Documentation

```bash
git add docs/
git commit -m "docs: Update for {feature/task}

- INDEX.md: Added {new files}
- AGENTS.md: {patterns/gotchas if any}
- progress.txt: Appended learnings

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Token Impact

Report estimated token savings:
- Files documented: N
- Tokens in docs: ~X
- Tokens if loading all source: ~Y
- Savings: ~Z%

### Output

Summary:
- Files updated
- New entries added
- Patterns documented
- Token impact estimate
