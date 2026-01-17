# Stop Writing Boilerplate: How I Built AI-Powered Slash Commands for Claude Code

*Supercharge your development workflow with custom Claude Code agents that handle commits, PRs, project scaffolding, and more.*

---

If you've been using Claude Code, you already know it's a game-changer for development. But what if you could make it even more powerful with custom slash commands tailored to your workflow?

That's exactly why I built **create-dev-agents** — a CLI tool that adds pre-configured AI agents to any project in seconds.

```bash
npx create-dev-agents init
```

One command. Six powerful slash commands. Zero configuration.

---

## The Problem

Every developer knows the drill:

- Writing commit messages that actually describe what changed
- Creating PRs with proper descriptions, checklists, and context
- Setting up new projects with the right folder structure, linting, and dependencies
- Implementing features following consistent patterns
- Reviewing code and providing actionable feedback

These tasks are repetitive, yet they require thought and consistency. They're perfect candidates for AI assistance — but setting up custom commands for each project is tedious.

## The Solution

**create-dev-agents** gives you instant access to six battle-tested slash commands:

| Command | What It Does |
|---------|-------------|
| `/new-project` | Interactive scaffolding for Expo, React Native, React, Next.js |
| `/feature` | Implements complete features with components, hooks, services, tests |
| `/commit` | Generates conventional commit messages from staged changes |
| `/pr` | Creates pull requests with descriptions and checklists |
| `/ticket` | Creates well-formatted Jira tickets |
| `/review` | Code review with actionable feedback |

---

## Getting Started

### Installation

For a single project:

```bash
cd your-project
npx create-dev-agents init
```

For global access across all projects:

```bash
npx create-dev-agents global
```

That's it. Open Claude Code and start using the commands.

---

## Real-World Examples

### Generate Perfect Commit Messages

Tired of writing `"fixed stuff"` or `"WIP"`? Just stage your changes and run:

```
> /commit

Staged changes:
  M src/features/cart/hooks/useCart.ts
  A src/features/cart/components/CartBadge.tsx

Analyzing changes...

Suggested commits:
  1. ✨ feat(cart): add cart badge showing item count
  2. ✨ feat(cart): add CartBadge component with item counter

? Select: 1

✓ Committed: ✨ feat(cart): add cart badge showing item count
```

The command analyzes your actual code changes and generates [Conventional Commits](https://www.conventionalcommits.org/) with emoji prefixes that make your git history beautiful and scannable:

- ✨ `feat` — New features
- 🐛 `fix` — Bug fixes
- 📝 `docs` — Documentation
- ♻️ `refactor` — Code restructuring
- ⚡ `perf` — Performance improvements
- ✅ `test` — Tests
- 🔧 `chore` — Maintenance

### Scaffold a Complete Feature

Need to implement user authentication? Don't start from scratch:

```
> /feature user-auth

Planning feature: user-auth

Files to create:
├── src/features/auth/
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── AuthGuard.tsx
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── services/
│   │   └── auth.service.ts
│   └── types/
│       └── auth.types.ts

Implementing...
```

The `/feature` command follows your project's existing patterns and creates a complete, consistent implementation.

### Create PRs That Reviewers Love

```
> /pr

Analyzing branch: feature/user-auth
Commits: 5 commits ahead of main

Generated PR:

## Summary
- Implements user authentication with email/password
- Adds protected route wrapper component
- Integrates with existing user store

## Changes
- Added LoginForm and SignupForm components
- Created useAuth hook for auth state management
- Added AuthGuard for protected routes

## Test Plan
- [ ] Test login with valid credentials
- [ ] Test login with invalid credentials
- [ ] Test signup flow
- [ ] Verify protected routes redirect

Creating PR...
✓ PR #42 created: https://github.com/...
```

### Start New Projects Right

```
> /new-project

? Project type: Expo (React Native)
? Architecture: Feature-based
? State management: Zustand
? Styling: NativeWind (Tailwind)
? Include testing setup? Yes

Creating project...
✓ Initialized Expo project
✓ Created folder structure
✓ Installed dependencies
✓ Configured TypeScript
✓ Added ESLint + Prettier

Next: cd my-app && npx expo start
```

No more spending hours configuring a new project. Get a production-ready setup in minutes.

---

## How It Works

The package installs markdown files into `.claude/commands/` — the directory where Claude Code looks for custom slash commands.

```
your-project/
├── .claude/
│   ├── commands/
│   │   ├── commit.md      # /commit instructions
│   │   ├── pr.md          # /pr instructions
│   │   ├── feature.md     # /feature instructions
│   │   └── ...
│   └── settings.json      # MCP configuration
└── CLAUDE.md              # Project context
```

Each `.md` file contains detailed instructions that tell Claude exactly how to handle that command. It's like giving Claude a specialized playbook for each task.

### Customization

The real power comes from customization. Want to modify how `/commit` works for your team? Just edit `.claude/commands/commit.md`:

```markdown
# /commit - Create a Commit Message

When generating commits, follow these rules:
- Always include ticket number from branch name
- Use our custom commit types: feature, bugfix, hotfix, chore
- Add emoji prefix based on type
...
```

You can also add your own commands. Create `.claude/commands/deploy.md` and you instantly have `/deploy`.

---

## MCP Integration for GitHub & Jira

For full integration with GitHub and Jira, configure MCP servers:

```bash
npx create-dev-agents mcp
```

This enables:
- `/pr` creates actual pull requests on GitHub
- `/ticket` creates tickets directly in Jira
- `/review` can fetch and review PR diffs

---

## Why I Built This

As developers, we spend a surprising amount of time on meta-work — writing about code rather than writing code. Commit messages, PR descriptions, ticket creation, code reviews... it adds up.

Claude Code already helps with the coding part. **create-dev-agents** extends that help to everything around the code.

The commands encode best practices:
- Conventional Commits for readable git history
- Structured PR templates for better reviews
- Consistent feature architecture across your codebase
- Thorough code reviews that catch real issues

And because it's all just markdown files, you can customize everything to match your team's conventions.

---

## Get Started

```bash
# Add to your current project
npx create-dev-agents init

# Or install globally
npx create-dev-agents global
```

Then open Claude Code and try:
- `/commit` after staging some changes
- `/pr` when ready to create a pull request
- `/feature auth` to scaffold an authentication feature

---

## Links

- **npm**: [npmjs.com/package/create-dev-agents](https://www.npmjs.com/package/create-dev-agents)
- **GitHub**: [github.com/ck-kiran/create-dev-agents](https://github.com/ck-kiran/create-dev-agents)

---

## What's Next?

I'm planning to add more commands based on community feedback:
- `/test` — Generate tests for existing code
- `/refactor` — Intelligent code refactoring
- `/docs` — Generate documentation
- `/debug` — Structured debugging assistance

What commands would you find useful? Drop a comment or open an issue on GitHub!

---

*If you found this useful, give the repo a star and share it with your team. Happy coding!*

---

**Tags:** #ClaudeCode #AI #DeveloperTools #Productivity #JavaScript #TypeScript #npm
