# Project Development Guide

## Available Commands

| Command | Description |
|---------|-------------|
| `/new-project` | Create new project (Expo, React, Next.js) |
| `/feature [name]` | Implement a complete feature |
| `/commit` | Generate conventional commit message |
| `/pr` | Create pull request with description |
| `/ticket` | Create Jira ticket |
| `/review [file]` | Code review with suggestions |

## Quick Start

```bash
# Create a new project
/new-project

# Implement a feature
/feature user-authentication

# After making changes
/commit
/pr
```

## MCP Integrations

If configured, these commands can interact with:
- **GitHub** - Create PRs, issues, request reviews
- **Jira** - Create and update tickets
- **Git** - Commits, branches, diffs

Run `dev-agents mcp` to configure API tokens.

---
*Powered by [create-dev-agents](https://github.com/yourusername/create-dev-agents)*
