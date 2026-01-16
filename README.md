# create-dev-agents

Claude Code agents for rapid development. Add AI-powered slash commands to any project.

```bash
npx create-dev-agents init
```

## What You Get

| Command | Description |
|---------|-------------|
| `/new-project` | Interactive project scaffolding (Expo, React Native, React, Next.js) |
| `/feature` | Implement complete features with components, hooks, services, tests |
| `/commit` | Generate conventional commit messages from staged changes |
| `/pr` | Create pull requests with proper descriptions and checklists |
| `/ticket` | Create well-formatted Jira tickets |
| `/review` | Code review with actionable feedback |

## Installation

### Per-Project (Recommended)

```bash
cd your-project
npx create-dev-agents init
```

### Global (Available in All Projects)

```bash
npx create-dev-agents global
```

## Usage

After installation, open your project in Claude Code and use the slash commands:

```
> /new-project
? What type of project? › Expo (React Native)
? Architecture pattern? › Feature-based
? State management? › Zustand
...

> /feature user-profile
Creating feature: user-profile
├── src/features/user-profile/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── types/
...

> /commit
Analyzing staged changes...
Generated: feat(profile): add user profile screen with avatar upload

> /pr
Creating pull request...
Title: feat(profile): add user profile screen
```

## Commands

### `dev-agents init`

Initialize dev agents in your project.

```bash
npx create-dev-agents init          # Interactive selection
npx create-dev-agents init --all    # Install everything
npx create-dev-agents init --minimal # Only commit, pr, review
```

### `dev-agents add <command>`

Add a specific command.

```bash
npx create-dev-agents add commit
npx create-dev-agents add feature
```

### `dev-agents global`

Install commands globally to `~/.claude` (works in any project).

```bash
npx create-dev-agents global
```

### `dev-agents mcp`

Configure MCP servers for GitHub and Jira integration.

```bash
npx create-dev-agents mcp
```

### `dev-agents list`

List all available commands and agents.

```bash
npx create-dev-agents list
```

## MCP Integration

For GitHub and Jira integration, configure API tokens:

```bash
npx create-dev-agents mcp
```

This enables:
- **`/pr`** - Creates actual PRs on GitHub
- **`/ticket`** - Creates tickets in Jira
- **`/review`** - Can review PR diffs

### Manual Setup

Set environment variables:

```bash
# GitHub (https://github.com/settings/tokens)
export GITHUB_TOKEN="ghp_xxxx"

# Jira (https://id.atlassian.com/manage-profile/security/api-tokens)
export JIRA_HOST="company.atlassian.net"
export JIRA_EMAIL="you@company.com"
export JIRA_API_TOKEN="xxxx"
```

## Project Structure After Init

```
your-project/
├── .claude/
│   ├── commands/           # Slash commands
│   │   ├── new-project.md
│   │   ├── feature.md
│   │   ├── commit.md
│   │   ├── pr.md
│   │   ├── ticket.md
│   │   └── review.md
│   └── settings.json       # MCP configuration
├── agents/                 # Agent behavior definitions (optional)
├── templates/              # PR, commit, Jira templates (optional)
└── CLAUDE.md              # Project context
```

## Customization

### Adding Custom Commands

Create `.claude/commands/my-command.md`:

```markdown
# /my-command - Description

When the user runs /my-command, do the following:

1. Step one
2. Step two
...
```

### Modifying Existing Commands

Edit files in `.claude/commands/` to match your team's conventions.

### Project-Specific Context

Edit `CLAUDE.md` to add:
- Tech stack details
- Coding conventions
- Architecture patterns
- API documentation

## Examples

### Create a React Native App

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

### Implement a Feature

```
> /feature shopping-cart

Planning feature: shopping-cart

Files to create:
├── src/features/cart/
│   ├── components/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartButton.tsx
│   ├── hooks/
│   │   └── useCart.ts
│   ├── services/
│   │   └── cart.service.ts
│   └── types/
│       └── cart.types.ts

Implementing...
```

### Generate Commit Message

```
> /commit

Staged changes:
  M src/features/cart/hooks/useCart.ts
  A src/features/cart/components/CartBadge.tsx

Analyzing changes...

Suggested commit:
  feat(cart): add cart badge showing item count

Options:
  1. feat(cart): add cart badge showing item count
  2. feat(cart): add CartBadge component with item counter
  3. Edit manually

? Select: 1

✓ Committed: feat(cart): add cart badge showing item count
```

## Requirements

- Node.js 16+
- Claude Code CLI

## License

MIT

## Contributing

Issues and PRs welcome at [github.com/yourusername/create-dev-agents](https://github.com/yourusername/create-dev-agents)
