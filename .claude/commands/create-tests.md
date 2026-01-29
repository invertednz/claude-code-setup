# Create Tests for Recent Changes

Generate comprehensive tests for recently modified code.

## Pre-computed Context

```bash
git diff --name-only HEAD~1 2>/dev/null || git diff --name-only
cat package.json 2>/dev/null | grep -E "(jest|vitest|mocha|testing)" || echo "Test framework not detected"
ls tests/ 2>/dev/null || echo "No tests directory"
```

## Instructions

For each changed file, create appropriate tests:

### Unit Tests

Location: Same directory as source, named `*.test.ts` or `*.spec.ts`

For each function/method:
1. Test the happy path with typical inputs
2. Test edge cases (empty, null, boundary values)
3. Test error conditions
4. Mock external dependencies

Example structure:
```typescript
describe('functionName', () => {
  it('should handle typical input correctly', () => {});
  it('should handle edge case: empty input', () => {});
  it('should throw on invalid input', () => {});
});
```

### Integration Tests

Location: `tests/integration/` directory

For APIs and services:
1. Test request/response cycles
2. Test error handling
3. Test authentication/authorization
4. Test data persistence

### UI Tests

Location: `tests/e2e/` or `tests/ui/` directory

For user interfaces:
1. Test critical user journeys
2. Test form submissions
3. Test navigation flows
4. Test error states and loading states

### After Creating Tests

1. Run the new tests to verify they pass
2. Check test coverage if available
3. Report which tests were created and their status

## Output

List all created test files and their test cases.
