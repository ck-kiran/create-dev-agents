# /ticket - Create a Jira Ticket

Create well-structured Jira tickets with proper formatting and all required fields.

## Instructions

When the user runs `/ticket`:

### 1. Ticket Type
Ask: "What type of ticket?"
- Story - User-facing feature
- Bug - Something broken
- Task - Technical work
- Epic - Large initiative
- Sub-task - Part of larger story

### 2. Basic Information
Gather:
- **Summary** (required): Clear, concise title
- **Project**: Project key (e.g., MIND, VAULT)
- **Priority**: Highest, High, Medium, Low, Lowest

### 3. Description
Based on ticket type, prompt for:

**For Story:**
- User story format: "As a [user], I want [goal] so that [benefit]"
- Acceptance criteria
- Design links (Figma, Stitch)
- Technical considerations

**For Bug:**
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Screenshots/logs

**For Task:**
- What needs to be done
- Technical details
- Dependencies

### 4. Additional Fields
Ask about:
- Labels (frontend, backend, mobile, etc.)
- Sprint assignment
- Story points
- Epic link
- Assignee

### 5. Generate Ticket
Format the ticket content:

```markdown
## Description
[Formatted description based on type]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Technical Notes
[Implementation hints]

## Out of Scope
[Explicit exclusions]

## Resources
[Links to designs, docs]
```

### 6. Create in Jira
If Jira MCP is configured:
- Show preview
- Ask for confirmation
- Create ticket
- Return ticket link

If not configured:
- Output formatted content
- Provide copy-paste ready format

## Templates

### Story Template
```
## User Story
As a [user type], I want [capability] so that [benefit].

## Acceptance Criteria
- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]

## Design
- Figma: [link]

## Technical Notes
- [Note 1]
- [Note 2]

## Definition of Done
- [ ] Code complete and reviewed
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Deployed to staging
```

### Bug Template
```
## Bug Summary
[Brief description]

## Steps to Reproduce
1. [Step]
2. [Step]
3. [Step]

## Expected Behavior
[What should happen]

## Actual Behavior
[What happens instead]

## Environment
- Platform: iOS/Android/Web
- Version: X.X.X
- Device: [if applicable]

## Severity
[Critical/Major/Minor/Trivial]

## Workaround
[If any exists]
```
