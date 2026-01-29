# Create Specification Sheet

Generate a comprehensive specification document for a new feature or project.

## Pre-computed Context

```bash
git branch --show-current
ls -la docs/ 2>/dev/null || echo "No docs directory"
cat package.json 2>/dev/null | grep -E "(name|description)" | head -5 || echo "No package.json"
```

## Instructions

Create a specification document by gathering requirements. Ask clarifying questions until you have enough information.

### Step 1: Initial Questions

Ask the user about:

1. **Project Overview**
   - What is the feature/project name?
   - What problem does it solve?
   - Who are the target users?

2. **Functional Requirements**
   - What are the core features?
   - What inputs does it accept?
   - What outputs does it produce?
   - What are the success criteria?

3. **Technical Requirements**
   - What technologies/frameworks should be used?
   - Are there performance requirements?
   - Are there security requirements?
   - What integrations are needed?

4. **Constraints**
   - What are the boundaries/limitations?
   - What is out of scope?
   - Are there dependencies on other systems?

### Step 2: Create Spec Document

After gathering answers, create `docs/specs/SPEC-{feature-name}.md` with:

```markdown
# Specification: {Feature Name}

## Overview
Brief description of the feature/project.

## Problem Statement
What problem this solves and why it matters.

## Target Users
Who will use this and how.

## Functional Requirements

### FR-1: {Requirement Name}
- Description:
- Acceptance Criteria:
  - [ ] Criterion 1
  - [ ] Criterion 2

### FR-2: {Requirement Name}
...

## Technical Requirements

### Tech Stack
- Framework:
- Database:
- APIs:

### Performance Requirements
- Response time:
- Throughput:

### Security Requirements
- Authentication:
- Authorization:
- Data protection:

## User Stories

### US-1: {Story Title}
As a {user type}, I want to {action} so that {benefit}.

**Acceptance Criteria:**
- [ ] Given {context}, when {action}, then {result}

### US-2: ...

## Out of Scope
- Item 1
- Item 2

## Dependencies
- Dependency 1
- Dependency 2

## Success Metrics
- Metric 1: Target value
- Metric 2: Target value
```

### Step 3: Create prd.json

Also create `docs/specs/prd.json` for task tracking:

```json
{
  "name": "{Feature Name}",
  "description": "{Brief description}",
  "stories": [
    {
      "id": "US-1",
      "title": "{Story title}",
      "description": "{Full description}",
      "acceptance_criteria": ["{criterion 1}", "{criterion 2}"],
      "priority": 1,
      "passes": false
    }
  ]
}
```

### Step 4: Output

- Report the spec file location
- List all user stories created
- Ask if the user wants to refine the spec with `/refine-spec`
