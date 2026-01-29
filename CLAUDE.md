# Project Configuration for Claude Code

## Overview

This project uses Claude Code with automated testing and PR workflows. Follow this guide for consistent, high-quality contributions.

---

## Simplified Workflow

You only need to run **2 commands** for most work:

### Option A: Spec-Driven (Recommended)

```bash
/create-spec          # Define requirements, creates prd.json
/tdd-loop             # Automatically completes ALL stories
```

### Option B: Ad-hoc Task

```bash
/start-task           # Full workflow for a single task
```

### Option C: Autonomous

```bash
/create-spec          # Define requirements
/ralph-loop           # Autonomous until all done
```

**Everything else is automatic**: tests, security, docs, PR, merge.

---

## Commands Reference

### Primary Commands (Use These)

| Command | Description |
|---------|-------------|
| `/create-spec` | Create spec with user stories (prd.json) |
| `/start-task` | Full workflow: implement → test → security → docs → PR → merge |
| `/tdd-loop` | TDD for all stories in spec: Red → Green → PR → merge (loop) |
| `/ralph-loop` | Autonomous loop until all stories complete |

### Support Commands (Automatic - rarely need manually)

| Command | Description |
|---------|-------------|
| `/cancel-ralph` | Stop autonomous loop |
| `/refine-spec` | Ask more questions about spec |
| `/init-docs` | Create docs structure (auto-created if missing) |
| `/load-context` | Load docs for context (~50% token savings) |

### Manual Commands (If needed)

| Command | Description |
|---------|-------------|
| `/test-and-verify` | Run all checks manually |
| `/security-check` | Run security scan manually |
| `/commit-push-pr` | Quick commit without full workflow |

---

## Context Management

### Token Reduction Strategy

Instead of loading all source files, use documentation as context:

| Approach | Tokens | When to Use |
|----------|--------|-------------|
| Load all source | ~10-50k | Never (wasteful) |
| Load INDEX.md + AGENTS.md | ~1-3k | Starting work |
| Load specific files | +500 each | When needed |

### Before Starting Work

1. Run `/load-context` or read:
   - `docs/INDEX.md` - Codebase map (ALWAYS read first)
   - `docs/AGENTS.md` - Patterns, gotchas, conventions

2. Load specific files only when needed

### Documentation Files

| File | Purpose | Load When |
|------|---------|-----------|
| `docs/INDEX.md` | File registry, structure | Always (first) |
| `docs/AGENTS.md` | Patterns, gotchas | Starting task |
| `docs/ARCHITECTURE.md` | Technical deep-dive | Complex work |
| `docs/USAGE.md` | User guide | Documenting features |
| `docs/progress.txt` | Learnings log | Recording discoveries |

### After Completing Work

Run `/update-docs` or manually update:
- INDEX.md with new files
- AGENTS.md with patterns/gotchas
- progress.txt with learnings

**Documentation is the source of truth** - it enables efficient future work.

---

## Workflow

### Recommended: Spec-Driven Development

```bash
# Step 1: Create spec (Claude asks questions until satisfied)
/create-spec

# Step 2: Run TDD loop (handles EVERYTHING automatically)
/tdd-loop
```

That's it. The TDD loop automatically:
- Creates branch per story
- Writes tests (unit, integration, Playwright e2e)
- Implements code
- Runs verification
- Runs security scan
- Updates documentation
- Creates PR
- Merges to main
- Moves to next story

### Alternative: Single Task

```bash
/start-task
```

Full workflow for one task - branch, implement, test, security, docs, PR, merge.

### Alternative: Autonomous

```bash
/create-spec
/ralph-loop --max-iterations 50
```

Runs completely autonomously until all stories are done.

---

## Common Bash Commands

### Project Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Production build
npm run start            # Start production server

# Testing
npm test                 # Run all tests
npm run test:unit        # Unit tests only
npm run test:integration # Integration tests only
npm run test:e2e         # End-to-end tests
npm run test:coverage    # Tests with coverage report

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix auto-fixable lint issues
npm run typecheck        # TypeScript type checking
npm run format           # Format with Prettier

# Database (if applicable)
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:reset         # Reset database
```

### Git Commands

```bash
# Status and history
git status               # Check working tree status
git log --oneline -10    # Recent commits
git diff                 # Unstaged changes
git diff --cached        # Staged changes

# Branching
git checkout -b feature/name    # Create feature branch
git checkout main               # Switch to main
git pull origin main            # Update from remote

# Committing
git add <file>           # Stage specific file
git commit -m "message"  # Commit with message
git push -u origin HEAD  # Push and set upstream

# PRs (using GitHub CLI)
gh pr create             # Create pull request
gh pr view               # View current PR
gh pr checks             # Check PR status
```

---

## Code Style Conventions

### General Principles

- **Clarity over cleverness** - Write code that's easy to read
- **Small functions** - Each function does one thing well
- **Descriptive names** - Variables and functions describe their purpose
- **Minimal comments** - Code should be self-documenting; comment only non-obvious logic

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `userName`, `isActive` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRIES`, `API_URL` |
| Functions | camelCase, verb prefix | `getUserById`, `validateInput` |
| Classes | PascalCase | `UserService`, `ApiClient` |
| Components | PascalCase | `UserProfile`, `NavBar` |
| Files (components) | PascalCase | `UserProfile.tsx` |
| Files (utilities) | camelCase | `formatDate.ts` |
| CSS classes | kebab-case | `user-profile`, `nav-bar` |

### TypeScript

```typescript
// Use explicit types for function parameters and returns
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Use interfaces for objects
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Use type for unions/aliases
type Status = 'pending' | 'active' | 'completed';

// Prefer const assertions for literals
const CONFIG = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
} as const;
```

### File Organization

```
src/
├── components/          # React components
│   ├── common/          # Shared components (Button, Input, etc.)
│   └── features/        # Feature-specific components
├── hooks/               # Custom React hooks
├── services/            # API and external service integrations
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── constants/           # App-wide constants
└── styles/              # Global styles
```

---

## UI and Content Design Guidelines

### Layout Principles

- **Consistency** - Use consistent spacing, typography, and colors
- **Hierarchy** - Clear visual hierarchy guides user attention
- **Whitespace** - Use generous whitespace for readability
- **Responsive** - Mobile-first, works on all screen sizes

### Spacing System

Use a consistent spacing scale (based on 4px or 8px):

```css
/* Spacing scale */
--space-1: 4px;   /* Tight */
--space-2: 8px;   /* Compact */
--space-3: 12px;  /* Default */
--space-4: 16px;  /* Comfortable */
--space-5: 24px;  /* Relaxed */
--space-6: 32px;  /* Spacious */
--space-7: 48px;  /* Section gaps */
--space-8: 64px;  /* Page sections */
```

### Typography

- **Headings**: Clear hierarchy (h1 > h2 > h3)
- **Body text**: 16px minimum for readability
- **Line height**: 1.5 for body, 1.2 for headings
- **Max width**: 65-75 characters per line for readability

### Content Guidelines

- **Clear and concise** - Get to the point quickly
- **Active voice** - "Click the button" not "The button should be clicked"
- **User-focused** - Address the user directly with "you"
- **Error messages** - Be specific and helpful, suggest solutions
- **Empty states** - Provide guidance on what to do next

### Accessibility

- **Color contrast**: Minimum 4.5:1 for normal text
- **Focus states**: Visible focus indicators for keyboard navigation
- **Alt text**: Descriptive alt text for all images
- **ARIA labels**: Proper labels for interactive elements
- **Semantic HTML**: Use appropriate HTML elements

---

## State Management

### Principles

- **Single source of truth** - Each piece of state has one owner
- **Minimal state** - Derive values when possible, don't duplicate
- **Colocation** - Keep state close to where it's used
- **Immutability** - Never mutate state directly

### State Location Decision Tree

```
Is it used by multiple components?
├── No → Local state (useState)
└── Yes → Is it server data?
    ├── Yes → Server state (React Query, SWR)
    └── No → Is it app-wide?
        ├── Yes → Global state (Context, Zustand, Redux)
        └── No → Lift state to common ancestor
```

### Patterns

```typescript
// Local state
const [count, setCount] = useState(0);

// Server state with React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId),
});

// Global state with Context
const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be within UserProvider');
  return context;
}
```

---

## Logging

### Log Levels

| Level | When to Use | Example |
|-------|-------------|---------|
| `error` | Errors requiring attention | Failed API calls, exceptions |
| `warn` | Potential issues | Deprecated usage, fallbacks |
| `info` | Important events | User actions, state changes |
| `debug` | Development details | Variable values, flow tracing |

### Logging Format

```typescript
// Include context in log messages
logger.error('Failed to fetch user', {
  userId,
  error: error.message,
  stack: error.stack,
});

// Use structured logging
logger.info('Order completed', {
  orderId,
  userId,
  total,
  itemCount: items.length,
});
```

### What to Log

- **DO log**: API requests/responses, user actions, errors, performance metrics
- **DON'T log**: Passwords, tokens, PII, sensitive data

---

## Error Handling

### Principles

- **Fail gracefully** - Show user-friendly messages, not stack traces
- **Be specific** - Different errors need different handling
- **Recover when possible** - Retry transient failures
- **Log for debugging** - Capture details for troubleshooting

### Error Boundaries (React)

```typescript
class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logger.error('React error boundary caught error', { error, info });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### API Error Handling

```typescript
async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      // Handle known API errors
      logger.warn('API error', { url, status: error.status });
      throw error;
    }
    // Handle network errors
    logger.error('Network error', { url, error });
    throw new NetworkError('Failed to connect to server');
  }
}
```

### User-Facing Error Messages

```typescript
const ERROR_MESSAGES: Record<string, string> = {
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
  NOT_FOUND: 'The requested item could not be found.',
  UNAUTHORIZED: 'Please sign in to continue.',
  FORBIDDEN: 'You don\'t have permission to access this.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  DEFAULT: 'Something went wrong. Please try again later.',
};
```

---

## Feature Gating

### Implementation

```typescript
// Feature flag configuration
const FEATURES = {
  NEW_DASHBOARD: process.env.FEATURE_NEW_DASHBOARD === 'true',
  BETA_EXPORTS: process.env.FEATURE_BETA_EXPORTS === 'true',
} as const;

// Feature gate hook
function useFeature(feature: keyof typeof FEATURES): boolean {
  return FEATURES[feature] ?? false;
}

// Usage in components
function Dashboard() {
  const hasNewDashboard = useFeature('NEW_DASHBOARD');

  if (hasNewDashboard) {
    return <NewDashboard />;
  }
  return <LegacyDashboard />;
}
```

### Best Practices

- **Default to off** - New features should be disabled by default
- **Clean up** - Remove feature flags after full rollout
- **Document** - Keep a list of active feature flags
- **Test both paths** - Ensure both enabled and disabled states work

---

## Debugging

### Browser DevTools

```javascript
// Breakpoints in code
debugger;

// Console methods
console.log('Basic output');
console.table(arrayOfObjects);     // Tabular data
console.group('Grouped logs');     // Collapsible groups
console.time('operation');         // Performance timing
console.trace('Call stack');       // Stack trace
```

### React DevTools

- **Components tab**: Inspect component tree, props, state
- **Profiler tab**: Identify performance bottlenecks
- **Highlight updates**: See what re-renders

### Network Debugging

1. Open DevTools → Network tab
2. Filter by XHR/Fetch for API calls
3. Check request headers, payload, response
4. Look for failed requests (red)

### Common Issues Checklist

- [ ] Check browser console for errors
- [ ] Verify network requests succeed
- [ ] Confirm state updates correctly (React DevTools)
- [ ] Check for typos in variable/property names
- [ ] Verify environment variables are set
- [ ] Clear cache and hard refresh

---

## Testing Requirements

When tests are requested for this project, create:

### Unit Tests
- Test individual functions/components in isolation
- Place alongside source: `*.test.ts` or `*.spec.ts`
- Cover: happy path, edge cases, error conditions

### Integration Tests
- Test component interactions and API endpoints
- Place in: `tests/integration/`
- Test realistic usage scenarios

### UI/E2E Tests
- Test user-facing functionality
- Place in: `tests/e2e/`
- Test critical user journeys

---

## Pull Request Template

When creating PRs, use this format:

```markdown
## Summary

Brief description of what this PR does and why.

## Changes

- Change 1
- Change 2
- Change 3

## Type of Change

- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Testing

Describe how you tested these changes:

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

### Test Commands Run

```bash
npm run test
npm run lint
npm run typecheck
```

## Screenshots (if UI changes)

| Before | After |
|--------|-------|
| screenshot | screenshot |

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if needed)
- [ ] No new warnings introduced
- [ ] Tests pass locally
```

---

## Security

- Never commit secrets, API keys, or credentials
- Validate all user input at system boundaries
- Use parameterized queries for databases
- Sanitize output to prevent XSS
- Follow OWASP Top 10 guidelines

---

## Project-Specific Notes

<!-- Add your project-specific configuration below -->
<!-- Examples: -->
<!-- - Package manager: pnpm -->
<!-- - Test command: pnpm test:all -->
<!-- - API docs: /docs/api.md -->
<!-- - Deployment: Vercel -->
