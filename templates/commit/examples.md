# Commit Message Examples

## Feature Commits

```
feat(auth): add Google OAuth login

Implement social authentication using Google OAuth 2.0.
- Add GoogleSignIn button component
- Handle OAuth callback and token exchange
- Store refresh token securely in expo-secure-store

Closes #123
```

```
feat(notes): add markdown preview toggle

Allow users to switch between edit and preview modes
in the note editor with animated transition.
```

```
feat(search): implement full-text search with FTS5

Add SQLite FTS5 virtual table for fast full-text search
across note titles and content with relevance ranking.
```

## Bug Fix Commits

```
fix(notes): prevent crash when note content is null

Added null check before rendering markdown preview.
Default to empty string when content is undefined.

Fixes #456
```

```
fix(auth): handle expired token refresh correctly

Token refresh was failing silently, causing logout.
Now properly queues requests and retries after refresh.
```

```
fix(navigation): resolve back button not working on Android

Hardware back button was being captured but not handled.
Added proper navigation listener for Android back press.
```

## Refactor Commits

```
refactor(api): extract common fetch logic into useApi hook

Reduce code duplication by centralizing fetch logic,
error handling, and loading state management.
```

```
refactor(store): migrate from Redux to Zustand

Simplify state management with Zustand:
- Reduce boilerplate by 60%
- Improve TypeScript inference
- Remove redux-thunk dependency
```

## Performance Commits

```
perf(list): virtualize note list for large datasets

Replace ScrollView with FlatList and implement
getItemLayout for consistent 60fps scrolling
with 1000+ notes.
```

```
perf(images): lazy load images in note cards

Defer image loading until cards are near viewport.
Reduces initial render time by 40%.
```

## Documentation Commits

```
docs(readme): update installation instructions

Add section for M1 Mac setup and common troubleshooting
steps for Expo development environment.
```

```
docs(api): add JSDoc comments to note service

Document all public methods with parameters,
return types, and usage examples.
```

## Test Commits

```
test(button): add unit tests for disabled state

Cover all button variants in disabled state:
- Visual appearance (opacity)
- Interaction blocked (onPress not called)
- Accessibility state updated
```

```
test(notes): add integration tests for CRUD operations

Test full lifecycle: create, read, update, delete
with database mocking and state verification.
```

## Chore Commits

```
chore(deps): update expo to v51

Update Expo SDK and related dependencies.
Run expo-doctor and fix compatibility issues.
```

```
chore(ci): add PR preview builds

Configure EAS Update for automatic preview builds
on pull requests with QR code comments.
```

## Breaking Change Commits

```
feat(api)!: change response format to JSON:API spec

BREAKING CHANGE: API responses now follow JSON:API spec.
All clients must update to handle new response structure.

Migration guide: docs/migration-v2.md
```
