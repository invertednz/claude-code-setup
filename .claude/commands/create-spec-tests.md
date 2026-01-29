# Create Tests from Specification

Generate comprehensive tests based on the specification document before implementation (TDD approach).

Uses Playwright for UI/E2E testing.

## Pre-computed Context

```bash
cat docs/specs/prd.json 2>/dev/null || echo "No prd.json found"
ls docs/specs/*.md 2>/dev/null | head -5
cat package.json 2>/dev/null | grep -E "(jest|vitest|playwright|testing)" || echo "Test framework not detected"
ls tests/ 2>/dev/null || echo "No tests directory"
```

## Instructions

Create tests for each user story in the specification BEFORE writing implementation code.

### Step 0: Ensure Test Frameworks Installed

Check and install if needed:

```bash
# Unit/Integration tests (Vitest or Jest)
npm list vitest || npm install -D vitest @vitest/ui

# UI/E2E tests (Playwright)
npm list @playwright/test || npx playwright install && npm install -D @playwright/test
```

### Step 1: Read Specification

Load and parse:
- `docs/specs/prd.json` for user stories
- `docs/specs/SPEC-*.md` for detailed requirements

### Step 2: Create Test Structure

```
tests/
├── unit/                    # Unit tests (Vitest/Jest)
│   └── {feature}/
├── integration/             # Integration tests (Vitest/Jest)
│   └── {feature}/
└── e2e/                     # E2E tests (Playwright)
    └── {feature}/
```

### Step 3: Generate Unit Tests

For each user story, create `tests/unit/{feature}/{story-id}.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('US-{id}: {title}', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Acceptance Criteria', () => {
    it('should {criterion 1}', () => {
      // Arrange
      // Act
      // Assert
      expect(true).toBe(false); // TDD red phase - will fail
    });

    it('should {criterion 2}', () => {
      expect(true).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty input', () => {
      expect(true).toBe(false);
    });

    it('should handle invalid input', () => {
      expect(true).toBe(false);
    });

    it('should handle null/undefined', () => {
      expect(true).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should throw on {error condition}', () => {
      expect(() => {
        // Call function with invalid args
      }).toThrow();
    });
  });
});
```

### Step 4: Generate Integration Tests

Create `tests/integration/{feature}/{story-id}.test.ts`:

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('US-{id}: {title} - Integration', () => {
  beforeAll(async () => {
    // Setup test database, services, etc.
  });

  afterAll(async () => {
    // Cleanup
  });

  it('should integrate with {dependency}', async () => {
    expect(true).toBe(false);
  });

  it('should handle {service} errors gracefully', async () => {
    expect(true).toBe(false);
  });

  it('should persist data correctly', async () => {
    expect(true).toBe(false);
  });
});
```

### Step 5: Generate Playwright E2E Tests

Create `tests/e2e/{feature}/{story-id}.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('US-{id}: {title}', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to starting page
    await page.goto('/');
  });

  test('should complete user flow: {flow description}', async ({ page }) => {
    // Given: {context}
    // (setup steps)

    // When: {action}
    await page.getByRole('button', { name: '{button text}' }).click();

    // Then: {result}
    await expect(page.getByText('{expected text}')).toBeVisible();
  });

  test('should display error for invalid input', async ({ page }) => {
    await page.getByLabel('{field}').fill('invalid');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByRole('alert')).toContainText('{error message}');
  });

  test('should be accessible', async ({ page }) => {
    // Check for accessibility violations
    // (requires @axe-core/playwright)
  });

  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    // Mobile-specific assertions
  });
});
```

### Step 6: Create Playwright Config

If not exists, create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### Step 7: Update package.json Scripts

Ensure these scripts exist:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:unit": "vitest run tests/unit",
    "test:integration": "vitest run tests/integration",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Step 8: Update prd.json

Add test file references to each story:

```json
{
  "id": "US-1",
  "title": "{title}",
  "tests": {
    "unit": "tests/unit/{feature}/us-1.test.ts",
    "integration": "tests/integration/{feature}/us-1.test.ts",
    "e2e": "tests/e2e/{feature}/us-1.spec.ts"
  },
  "passes": false
}
```

### Step 9: Verify Tests Fail (Red Phase)

Run all tests to confirm they fail:

```bash
# Unit & Integration
npm run test:unit
npm run test:integration

# E2E (start dev server first or use webServer config)
npm run test:e2e
```

All tests should fail since no implementation exists yet.

### Step 10: Output

Report:
- Test framework versions installed
- Number of test files created
- Test breakdown per story (unit/integration/e2e)
- Confirmation all tests are failing
- Playwright browsers installed

Suggest: "Run `/tdd-loop` to implement features and make tests pass"
