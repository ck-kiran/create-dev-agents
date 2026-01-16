# /feature - Develop a New Feature

Implement a complete feature with components, hooks, services, and tests.

## Instructions

When the user runs `/feature [name]` or `/feature`:

### 1. Feature Identification
If no name provided, ask: "What feature would you like to implement?"

Get details:
- Feature name (e.g., "user authentication", "note editor")
- Brief description
- User stories or requirements

### 2. Requirements Gathering
Ask targeted questions:
- "What are the main user interactions?"
- "Does this feature need to persist data?"
- "Are there any API integrations required?"
- "What states should this feature handle?" (loading, error, empty, success)

### 3. Planning
Generate and show:
```
Feature: [Name]

Files to Create:
├── src/features/[name]/
│   ├── components/
│   │   ├── [Component].tsx
│   │   └── index.ts
│   ├── hooks/
│   │   ├── use[Feature].ts
│   │   └── index.ts
│   ├── services/
│   │   └── [feature].service.ts
│   ├── types/
│   │   └── [feature].types.ts
│   └── index.ts
└── __tests__/features/[name]/
    └── [Feature].test.tsx

Tasks:
1. [ ] Define TypeScript types
2. [ ] Create service layer
3. [ ] Implement custom hooks
4. [ ] Build UI components
5. [ ] Add state management
6. [ ] Write tests
7. [ ] Update exports
```

### 4. Implementation
For each file, provide:
- Clear, typed code
- JSDoc comments
- Error handling
- Loading states

### 5. Testing
Generate tests for:
- Unit tests for utilities
- Hook tests with renderHook
- Component tests with user interactions
- Integration tests if needed

### 6. Documentation
Provide:
- Usage examples
- Props documentation
- API reference

## Example

User: `/feature user-profile`

Output:
```typescript
// types/user-profile.types.ts
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

// hooks/useUserProfile.ts
export function useUserProfile(userId: string) {
  // Implementation
}

// components/UserProfileCard.tsx
export function UserProfileCard({ user }: Props) {
  // Implementation
}
```
