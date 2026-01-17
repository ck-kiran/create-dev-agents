#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { init, addCommand, listCommands, setupMcp, installGlobal } from '../src/index.js';

const program = new Command();

program
  .name('dev-agents')
  .description('Claude Code agents for rapid development')
  .version('1.0.0');

// Init command - add agents to current project
program
  .command('init')
  .description('Initialize dev agents in current project')
  .option('-g, --global', 'Install globally to ~/.claude')
  .option('--all', 'Install all agents and templates')
  .option('--minimal', 'Install only essential commands')
  .action(async (options) => {
    console.log(chalk.blue.bold('\n🤖 Dev Agents Setup\n'));
    await init(options);
  });

// Add specific command
program
  .command('add <command>')
  .description('Add a specific command (new-project, feature, commit, pr, ticket, review)')
  .action(async (command) => {
    await addCommand(command);
  });

// List available commands
program
  .command('list')
  .description('List all available agents and commands')
  .action(() => {
    listCommands();
  });

// Setup MCP servers
program
  .command('mcp')
  .description('Configure MCP servers (GitHub, Jira, Git)')
  .action(async () => {
    await setupMcp();
  });

// Install globally
program
  .command('global')
  .description('Install commands globally to ~/.claude (works in any project)')
  .action(async () => {
    await installGlobal();
  });

// Show examples
program
  .command('examples')
  .description('Show usage examples')
  .action(() => {
    console.log(chalk.blue.bold('\n📚 Usage Examples\n'));
    console.log(chalk.white('After running `dev-agents init`, use these in Claude Code:\n'));
    console.log(chalk.yellow('  /new-project') + '     Create Expo, React, Next.js project');
    console.log(chalk.yellow('  /feature auth') + '   Implement authentication feature');
    console.log(chalk.yellow('  /commit') + '         Generate conventional commit message');
    console.log(chalk.yellow('  /pr') + '             Create pull request with description');
    console.log(chalk.yellow('  /ticket') + '         Create Jira ticket');
    console.log(chalk.yellow('  /review') + '         Code review with suggestions');
    console.log();
  });

program.parse();
