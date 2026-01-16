# /review - Code Review

Perform a thorough code review with actionable feedback.

## Instructions

When the user runs `/review [file|PR]`:

### 1. Identify Target
- If file path: Review that specific file
- If PR number: Review PR changes via GitHub MCP
- If nothing: Review staged changes or recent commits

### 2. Analysis Categories

**Code Quality**
- Readability and clarity
- Function/component size
- Code duplication
- Naming conventions
- Comments (where needed)

**Type Safety**
- Proper TypeScript usage
- No unnecessary `any`
- Null/undefined handling
- Interface definitions

**React/RN Best Practices**
- Hook rules followed
- Proper dependencies in useEffect
- Memoization where needed
- Key props in lists
- Event handler patterns

**Performance**
- Unnecessary re-renders
- Missing memoization
- Large bundle imports
- Memory leak potential

**Security**
- Input validation
- Sensitive data handling
- SQL injection prevention
- XSS prevention

**Accessibility**
- ARIA labels
- Touch target sizes
- Color contrast
- Screen reader support

**Testing**
- Test coverage
- Edge cases
- Meaningful assertions

### 3. Output Format

```markdown
## Code Review: [File/PR]

### Summary
**Quality Score:** [A/B/C/D]
**Recommendation:** [Approve / Request Changes / Comment]

---

### Critical Issues (Must Fix)

#### 1. [Issue Title]
**File:** `path/to/file.tsx`
**Line:** 42-48

```typescript
// Current code
const data = fetchData(); // Problem here
```

**Problem:** [Clear explanation]
**Impact:** [Why it matters]
**Fix:**
```typescript
// Suggested fix
const data = await fetchData();
```

---

### Improvements (Should Fix)

#### 1. [Issue Title]
**File:** `path/to/file.tsx`
**Line:** 15

**Current:**
```typescript
// Less optimal
```

**Suggested:**
```typescript
// Better approach
```

**Reason:** [Why this is better]

---

### Suggestions (Nice to Have)

- [ ] Consider extracting [X] into a custom hook
- [ ] Could use [pattern] for better readability
- [ ] Optional: Add JSDoc for public API

---

### Positive Highlights

- Well-structured component architecture
- Good error handling in [area]
- Clean separation of concerns

---

### Summary

[Overall assessment and specific action items]
```

## Quick Review Mode

`/review --quick` or `/review -q`:
- Focus on critical issues only
- Shorter output
- Faster turnaround

## Review Checklist

Use as mental model:

```
[ ] Types are correct and complete
[ ] No console.log left in code
[ ] Error states handled
[ ] Loading states handled
[ ] Edge cases considered
[ ] No memory leaks
[ ] Accessibility labels present
[ ] Tests cover happy path + errors
[ ] No hardcoded values
[ ] Imports are clean
[ ] File structure follows conventions
```

## Common Issues Database

### Hooks
```typescript
// Bad: Stale closure
useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1); // Stale!
  }, 1000);
}, []);

// Good: Functional update
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

### Async in useEffect
```typescript
// Bad: Async useEffect
useEffect(async () => {
  const data = await fetch();
}, []);

// Good: Inner async function
useEffect(() => {
  const loadData = async () => {
    const data = await fetch();
  };
  loadData();
}, []);
```

### Optional Chaining
```typescript
// Bad: Unsafe access
const name = user.profile.name;

// Good: Safe access
const name = user?.profile?.name ?? 'Unknown';
```
