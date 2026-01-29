# Project Configuration for Claude Code

## Testing Requirements: ENABLED

This project requires comprehensive testing for all code changes.

## Task Completion Workflow

IMPORTANT: For every completed task, you MUST:

1. Create appropriate tests BEFORE marking task complete
2. Run full verification suite
3. Create a PR with test plan documented

## Required Tests

### Unit Tests (REQUIRED)
- Create for ALL new functions and methods
- Place alongside source files as `*.test.ts` or `*.spec.ts`
- Cover: happy path, edge cases, error conditions
- Mock external dependencies

### Integration Tests (REQUIRED for APIs/Services)
- Create for ALL new API endpoints
- Create for ALL new service integrations
- Place in `tests/integration/`
- Test realistic request/response cycles

### UI Tests (REQUIRED for UI changes)
- Create for ALL new user-facing features
- Place in `tests/e2e/` or `tests/ui/`
- Test critical user journeys
- Test error states and loading states

## Test Commands

```bash
# Run all tests
npm test

# Run specific test types
npm run test:unit
npm run test:integration
npm run test:e2e

# Run with coverage
npm run test:coverage
```

## Verification Checklist

Before creating a PR, verify ALL pass:

- [ ] `npm run lint` - No linting errors
- [ ] `npm run typecheck` - No type errors
- [ ] `npm run test:unit` - All unit tests pass
- [ ] `npm run test:integration` - All integration tests pass
- [ ] `npm run build` - Build succeeds
- [ ] New tests added for new code

## PR Requirements

Every PR must include:

1. **Summary** - What was changed and why
2. **Test Plan** - How the changes were tested
3. **New Tests** - List of new test files/cases added

## Code Standards

### Security
- Validate all user input
- Use parameterized queries
- Sanitize output
- No secrets in code

### Quality
- Small, focused functions
- Descriptive names
- Comments for non-obvious logic only

## Project-Specific Notes

<!-- Add your project-specific configuration below -->
