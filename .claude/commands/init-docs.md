# Initialize Documentation Structure

Create a layered documentation system optimized for Claude context management.

Based on best practices: 54% token reduction through on-demand loading, trigger tables, and minimal upfront context.

## Pre-computed Context

```bash
ls -la docs/ 2>/dev/null || echo "No docs directory"
cat package.json 2>/dev/null | grep -E "(name|description|version)" | head -5
find src -type f -name "*.ts" -o -name "*.tsx" 2>/dev/null | head -20 || ls -la
```

## Instructions

### Documentation Philosophy

1. **Minimal upfront context** - CLAUDE.md stays under 500 lines
2. **On-demand loading** - Detailed docs loaded only when needed
3. **Trigger tables** - Concise "when to use" instead of verbose explanations
4. **Single source of truth** - INDEX.md maps the codebase
5. **Layered memory** - Different files for different purposes

### Step 1: Create Directory Structure

```bash
mkdir -p docs/components docs/api docs/specs
```

### Step 2: Create INDEX.md (Codebase Map)

This is the **primary context file** - a registry of what exists and where.

Create `docs/INDEX.md`:

```markdown
# Codebase Index

> Source of truth for codebase structure. Read this FIRST before loading other files.
> Last updated: {date}

## Quick Reference

| Need | Location | Load When |
|------|----------|-----------|
| API endpoints | `src/api/` | Working on API |
| UI components | `src/components/` | Working on UI |
| Business logic | `src/services/` | Modifying logic |
| Types | `src/types/` | Type errors |
| Tests | `tests/` | Writing tests |
| Config | `src/config/` | Config changes |

## File Registry

### Core Files
| File | Purpose | Exports |
|------|---------|---------|
| `src/index.ts` | Entry point | App bootstrap |
| `src/config/index.ts` | Configuration | `config` object |

### Components
| Component | Location | Props |
|-----------|----------|-------|
| {name} | `src/components/{name}.tsx` | {key props} |

### Services
| Service | Location | Methods |
|---------|----------|---------|
| {name} | `src/services/{name}.ts` | {key methods} |

### API Routes
| Method | Route | Handler |
|--------|-------|---------|
| GET | /api/{route} | `src/api/{handler}.ts` |

## Module Dependencies

```
App → Layout → [Header, Sidebar, Content]
                     ↓
Content → Services → Utils
              ↓
           Types
```

## Environment Variables

| Var | Required | Purpose |
|-----|----------|---------|
| `API_URL` | Yes | Backend URL |

## Patterns Used

| Pattern | Where | Why |
|---------|-------|-----|
| Repository | Services | Data access abstraction |
| Factory | Components | Dynamic component creation |

## Gotchas & Constraints

- {Gotcha 1}: {Brief explanation}
- {Gotcha 2}: {Brief explanation}
```

### Step 3: Create AGENTS.md (Codebase Intelligence)

Patterns, gotchas, and conventions discovered during development.

Create `docs/AGENTS.md`:

```markdown
# Agent Knowledge Base

> Patterns, gotchas, and conventions for AI agents working on this codebase.
> Updated incrementally as patterns are discovered.

## Coding Patterns

### Pattern: {Name}
**When**: {Trigger condition}
**Do**: {Brief instruction}
**Example**: `{one-liner or file reference}`

## Gotchas

| Situation | Watch Out For | Solution |
|-----------|---------------|----------|
| {situation} | {gotcha} | {solution} |

## Conventions

| Area | Convention | Example |
|------|------------|---------|
| Naming | camelCase for functions | `getUserById()` |
| Files | PascalCase for components | `UserProfile.tsx` |
| Tests | `.test.ts` suffix | `auth.test.ts` |

## Stack-Specific Notes

### {Framework/Library}
- {Important note}
- {Important note}

## Don't Do

- {Anti-pattern to avoid}
- {Common mistake}
```

### Step 4: Create progress.txt (Learnings Log)

Append-only log of discoveries and learnings.

Create `docs/progress.txt`:

```
# Progress & Learnings Log

Append discoveries here. Do not edit previous entries.

---

## {Date} - Initial Setup

- Created documentation structure
- Established conventions

---
```

### Step 5: Create ARCHITECTURE.md (Technical Deep-Dive)

Only loaded when deep technical context is needed.

Create `docs/ARCHITECTURE.md`:

```markdown
# Architecture

> Load this file when you need deep technical understanding.
> For quick reference, use INDEX.md instead.

## System Overview

{Architecture diagram or description}

## Data Flow

```
User Action → Component → Service → API → Database
     ↑                                      |
     └──────────── Response ←───────────────┘
```

## Component Details

### {Component Name}

**File**: `src/components/{name}.tsx`

**State**:
```typescript
interface State {
  // state shape
}
```

**Key Logic**:
```typescript
// Critical function with brief comment
```

## API Structure

### {Endpoint Group}

{Endpoint details only when needed}

## Database Schema

{Schema only when working with DB}
```

### Step 6: Create USAGE.md (User Guide)

How to use features - loaded when explaining functionality.

Create `docs/USAGE.md`:

```markdown
# Usage Guide

> How to use this project's features.

## Quick Start

```bash
npm install
npm run dev
```

## Features

### {Feature Name}

**Usage**:
```typescript
import { feature } from '@/features';
feature.doThing();
```

**Options**:
| Option | Default | Description |
|--------|---------|-------------|
| `opt` | `value` | What it does |
```

### Step 7: Update Project CLAUDE.md

Add context loading instructions (keep minimal):

```markdown
## Context Management

### Before Starting Work

1. Read `docs/INDEX.md` for codebase map
2. Check `docs/AGENTS.md` for patterns/gotchas
3. Load specific docs only when needed

### Documentation Files

| File | Load When |
|------|-----------|
| `docs/INDEX.md` | Always (first) |
| `docs/AGENTS.md` | Starting new task |
| `docs/ARCHITECTURE.md` | Deep technical work |
| `docs/USAGE.md` | Documenting features |
| `docs/progress.txt` | Recording learnings |

### After Completing Work

Run `/update-docs` to keep documentation current.
```

### Step 8: Scan and Populate INDEX.md

Analyze the existing codebase:
1. List all directories under src/
2. Identify key files and their exports
3. Detect patterns in use
4. Find configuration files
5. Map dependencies

### Output

Report:
- Documentation files created
- INDEX.md populated with codebase scan
- Estimated token savings vs loading all source files
- Suggest: "Run `/update-docs` after completing tasks"
