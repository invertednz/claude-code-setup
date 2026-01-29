# Test and Verify

Run the full verification suite to ensure code quality.

## Pre-computed Context

```bash
cat package.json | grep -A 20 '"scripts"'
ls -la tests/ 2>/dev/null || echo "No tests directory"
ls -la *.config.* 2>/dev/null || echo "No config files in root"
```

## Instructions

Run all verification steps in order. Stop and fix if any step fails:

1. **Lint Check**
   ```bash
   npm run lint 2>/dev/null || npx eslint . --ext .ts,.tsx,.js,.jsx 2>/dev/null || echo "No linting configured"
   ```

2. **Type Check** (if TypeScript)
   ```bash
   npm run typecheck 2>/dev/null || npx tsc --noEmit 2>/dev/null || echo "No TypeScript configured"
   ```

3. **Unit Tests**
   ```bash
   npm test 2>/dev/null || npm run test:unit 2>/dev/null || echo "No unit tests configured"
   ```

4. **Integration Tests**
   ```bash
   npm run test:integration 2>/dev/null || echo "No integration tests configured"
   ```

5. **Build Check**
   ```bash
   npm run build 2>/dev/null || echo "No build step configured"
   ```

## Output

Report:
- Which checks passed
- Which checks failed (with error details)
- Which checks were not configured

If all configured checks pass, report "All verification checks passed."
