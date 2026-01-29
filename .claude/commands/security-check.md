# Security Check

Analyze code changes for security vulnerabilities.

## Pre-computed Context

```bash
git diff --name-only
git diff
```

## Instructions

Review all changed files for security issues:

### 1. Secrets Detection
Check for accidentally committed:
- API keys, tokens, passwords
- Private keys, certificates
- Connection strings with credentials
- `.env` files or similar

### 2. OWASP Top 10 Review

**Injection:**
- SQL injection in database queries
- Command injection in shell executions
- Template injection in rendering

**Broken Authentication:**
- Hardcoded credentials
- Weak session management
- Missing authentication checks

**Sensitive Data Exposure:**
- Logging sensitive information
- Exposing data in error messages
- Missing encryption for sensitive data

**XSS (Cross-Site Scripting):**
- Unsanitized user input in HTML
- Missing output encoding
- Unsafe innerHTML usage

**Broken Access Control:**
- Missing authorization checks
- Direct object references
- Path traversal vulnerabilities

**Security Misconfiguration:**
- Debug mode in production code
- Overly permissive CORS
- Missing security headers

### 3. Dependency Check
```bash
npm audit 2>/dev/null || echo "No npm audit available"
```

### 4. Report

Provide a security report:
- **Critical**: Issues that must be fixed before merge
- **Warning**: Issues that should be addressed
- **Info**: Suggestions for improvement
- **Clear**: Confirmation if no issues found

## Important

Be thorough. Security issues caught early are far cheaper to fix.
