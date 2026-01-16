# /pr - Create a Pull Request

Create a comprehensive pull request with proper description and checklist.

## Instructions

When the user runs `/pr`:

### 1. Gather Context
Check current state:
- Current branch name
- Commits since branching from main
- Changed files
- Related issues (from commit messages)

### 2. Determine PR Type
Ask or infer:
- Feature (new functionality)
- Bug Fix (fixes an issue)
- Refactor (code improvement)
- Documentation
- Chore/Maintenance

### 3. Generate Title
Format: `<type>(<scope>): <description>`

Examples:
- `feat(auth): add social login with Google`
- `fix(notes): resolve crash on empty content`
- `refactor(api): migrate to axios interceptors`

### 4. Generate Description
Create comprehensive description:

```markdown
## Summary
[2-3 sentence overview of the changes]

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (would cause existing functionality to change)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)

## Related Issues
Closes #[issue_number]

## Changes Made
- [Bullet point for each significant change]
- [Include file/component names when helpful]

## Screenshots/Recordings
[If UI changes, add before/after screenshots]

| Before | After |
|--------|-------|
| [img]  | [img] |

## Testing Done
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] Tested on iOS
- [ ] Tested on Android

## How to Test
1. [Step-by-step testing instructions]
2. [Include any setup needed]
3. [Expected outcomes]

## Checklist
- [ ] Code follows project conventions
- [ ] Self-review completed
- [ ] No new warnings
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Accessibility considered

## Additional Notes
[Any context reviewers should know]
```

### 5. Preview and Confirm
Show the generated PR:
- Title
- Description preview
- Base and head branches
- Reviewers to request

### 6. Create PR
If GitHub MCP configured:
- Create PR via API
- Add labels
- Request reviewers
- Return PR URL

If not:
- Output formatted content
- Provide GitHub CLI command

## Quick Templates

### Feature PR
```markdown
## Summary
Implements [feature] as specified in #[issue].

## Changes
- Added [component/hook/service]
- Updated [existing code]
- Created tests for [functionality]

## Demo
[Screenshot or video]

## Testing
Tested [scenarios] on [platforms].
```

### Bug Fix PR
```markdown
## Summary
Fixes [bug description] reported in #[issue].

## Root Cause
[Brief explanation of why bug occurred]

## Solution
[How the fix addresses it]

## Regression Test
Added test to prevent recurrence.
```

### Refactor PR
```markdown
## Summary
Refactors [area] to improve [goal].

## Motivation
[Why this refactor is needed]

## Changes
- Restructured [what]
- Extracted [components/utilities]
- Simplified [logic]

## Impact
No functional changes. [Any perf improvements]
```

## Example Flow

```bash
User: /pr

Claude: I'll analyze your changes and create a PR.

Current branch: feature/user-profile
Commits: 3 (ahead of main)
Changed files:
  - src/features/profile/UserProfile.tsx
  - src/features/profile/useProfile.ts
  - src/features/profile/profile.types.ts
  - __tests__/profile/UserProfile.test.tsx

Generated PR:

Title: feat(profile): add user profile screen with avatar upload

[Full description...]

Create this PR? (y/n)
```
