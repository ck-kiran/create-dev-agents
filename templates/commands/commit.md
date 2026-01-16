# /commit - Create a Commit Message

Generate a well-formatted commit message following Conventional Commits.

## Instructions

When the user runs `/commit`:

### 1. Analyze Changes
First, check staged changes:
- Run `git status` to see staged files
- Run `git diff --staged` to see actual changes
- Understand the nature of changes

### 2. Determine Type
Based on changes, identify:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting (no code change)
- `refactor` - Code restructuring
- `perf` - Performance improvement
- `test` - Tests
- `chore` - Maintenance
- `ci` - CI/CD changes
- `build` - Build system

### 3. Identify Scope
Determine affected area:
- Component name (e.g., `button`, `auth`)
- Feature area (e.g., `notes`, `search`)
- Technical area (e.g., `api`, `database`)

### 4. Generate Message
Create commit message:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Rules:**
- Subject: imperative, lowercase, no period, max 50 chars
- Body: wrap at 72 chars, explain what and why
- Footer: reference issues, breaking changes

### 5. Present Options
Show 2-3 commit message options:

```
Option 1 (Concise):
feat(auth): add Google OAuth login

Option 2 (Detailed):
feat(auth): add Google OAuth login

Implement social authentication using Google OAuth 2.0.
- Add GoogleSignIn button component
- Handle OAuth callback and token exchange
- Store refresh token securely

Closes #123

Option 3 (With Breaking Change):
feat(auth)!: replace session auth with JWT

BREAKING CHANGE: Session-based authentication has been
replaced with JWT tokens. All clients must update to
use the new token-based flow.
```

### 6. Create Commit
After user selects or modifies:
- Stage files if needed
- Create commit with message
- Show commit hash

## Quick Mode

For simple changes, `/commit -q` or `/commit --quick`:
- Auto-detect type and scope
- Generate concise message
- Commit immediately

## Examples

```bash
# User runs /commit after adding a new button component
> Staged files:
>   src/components/ui/AppButton/AppButton.tsx
>   src/components/ui/AppButton/AppButton.types.ts
>   src/components/ui/AppButton/index.ts

Generated: feat(ui): add AppButton component with variants

# User runs /commit after fixing a bug
> Staged files:
>   src/hooks/useNotes.ts

Generated: fix(notes): prevent crash on empty note list

Handles edge case where notes array is undefined
by providing empty array fallback.

Fixes #456
```

## Commit Message Guidelines

### Good Examples
```
feat(notes): add markdown preview toggle
fix(auth): handle expired token refresh
docs(readme): update installation steps
refactor(api): extract common fetch logic
perf(list): virtualize note list for large datasets
test(button): add unit tests for disabled state
chore(deps): update expo to v51
```

### Bad Examples
```
fixed stuff                    # Not descriptive
WIP                           # Not meaningful
Update Button.tsx             # No type, unclear change
feat: added new awesome feature # No scope, past tense
```
