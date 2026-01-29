# Refine Specification

Iteratively improve the specification by asking clarifying questions until it's complete and high-quality.

## Pre-computed Context

```bash
cat docs/specs/prd.json 2>/dev/null || echo "No prd.json found"
ls docs/specs/*.md 2>/dev/null || echo "No spec files found"
```

## Instructions

Review the existing specification and ask questions until you're satisfied with its quality.

### Quality Checklist

Before marking the spec as complete, verify:

**Completeness:**
- [ ] All user stories have clear acceptance criteria
- [ ] Technical requirements are specific and measurable
- [ ] Dependencies are identified
- [ ] Out of scope items are listed

**Clarity:**
- [ ] No ambiguous terms or requirements
- [ ] Each story is independently testable
- [ ] Success metrics are quantifiable

**Feasibility:**
- [ ] Technical approach is realistic
- [ ] No conflicting requirements
- [ ] Dependencies are available

**Testability:**
- [ ] Each requirement can be verified
- [ ] Acceptance criteria are binary (pass/fail)
- [ ] Edge cases are considered

### Refinement Loop

1. **Read the current spec** from `docs/specs/`

2. **Identify gaps or ambiguities**

3. **Ask clarifying questions** such as:
   - "What should happen when {edge case}?"
   - "How should errors be handled for {scenario}?"
   - "What's the expected behavior when {condition}?"
   - "Is {assumption} correct?"
   - "What's the priority between {feature A} and {feature B}?"

4. **Update the spec** with answers

5. **Repeat** until all checklist items pass

### Completion Signal

When you have no more questions and the spec passes all quality checks:

1. Update the spec file with any final changes
2. Report: "Specification is complete and ready for implementation"
3. List the user stories in priority order
4. Suggest running `/create-spec-tests` to generate tests

### Important

- Ask ONE question at a time for complex topics
- Group simple yes/no questions (max 3-4)
- Always explain WHY you're asking
- Update the spec document after each answer
