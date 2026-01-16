import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';
import enquirer from 'enquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

const COMMANDS = {
  'new-project': 'Create new projects (Expo, React Native, React, Next.js)',
  'feature': 'Implement complete features with components, hooks, tests',
  'commit': 'Generate conventional commit messages',
  'pr': 'Create pull requests with proper descriptions',
  'ticket': 'Create Jira tickets with templates',
  'review': 'Code review with actionable feedback'
};

const AGENTS = {
  'project': 'Project scaffolding agent',
  'feature': 'Feature development agent',
  'git': 'Git workflow agent (commits, PRs)',
  'jira': 'Jira ticket agent',
  'code-review': 'Code review agent'
};

export async function init(options = {}) {
  const spinner = ora();
  const targetDir = options.global ? path.join(process.env.HOME, '.claude') : process.cwd();

  try {
    // Prompt for what to install
    let selections;
    if (options.all) {
      selections = { commands: Object.keys(COMMANDS), extras: ['agents', 'templates', 'scripts', 'mcp'] };
    } else if (options.minimal) {
      selections = { commands: ['commit', 'pr', 'review'], extras: [] };
    } else {
      const { Select, MultiSelect } = enquirer;

      const commandPrompt = new MultiSelect({
        name: 'commands',
        message: 'Select commands to install',
        choices: Object.entries(COMMANDS).map(([name, desc]) => ({
          name,
          message: `/${name}`,
          hint: desc
        })),
        initial: Object.keys(COMMANDS)
      });

      const extrasPrompt = new MultiSelect({
        name: 'extras',
        message: 'Select additional components',
        choices: [
          { name: 'agents', message: 'Agent definitions', hint: 'Detailed agent behaviors' },
          { name: 'templates', message: 'Templates', hint: 'PR, commit, Jira templates' },
          { name: 'scripts', message: 'Shell scripts', hint: 'Automation scripts' },
          { name: 'mcp', message: 'MCP config', hint: 'GitHub, Jira, Git servers' }
        ],
        initial: ['mcp']
      });

      const commands = await commandPrompt.run();
      const extras = await extrasPrompt.run();
      selections = { commands, extras };
    }

    // Create directories
    spinner.start('Creating directories...');
    const dirs = ['.claude/commands'];
    if (selections.extras.includes('agents')) dirs.push('agents');
    if (selections.extras.includes('templates')) dirs.push('templates');
    if (selections.extras.includes('scripts')) dirs.push('scripts');

    for (const dir of dirs) {
      const fullPath = path.join(targetDir, dir);
      fs.mkdirSync(fullPath, { recursive: true });
    }
    spinner.succeed('Directories created');

    // Copy commands
    spinner.start('Installing commands...');
    for (const cmd of selections.commands) {
      const src = path.join(TEMPLATES_DIR, 'commands', `${cmd}.md`);
      const dest = path.join(targetDir, '.claude', 'commands', `${cmd}.md`);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
    }
    spinner.succeed(`Installed ${selections.commands.length} commands`);

    // Copy extras
    if (selections.extras.includes('agents')) {
      spinner.start('Installing agents...');
      copyDir(path.join(TEMPLATES_DIR, 'agents'), path.join(targetDir, 'agents'));
      spinner.succeed('Agents installed');
    }

    if (selections.extras.includes('templates')) {
      spinner.start('Installing templates...');
      copyDir(path.join(TEMPLATES_DIR, 'templates'), path.join(targetDir, 'templates'));
      spinner.succeed('Templates installed');
    }

    if (selections.extras.includes('scripts')) {
      spinner.start('Installing scripts...');
      copyDir(path.join(TEMPLATES_DIR, 'scripts'), path.join(targetDir, 'scripts'));
      // Make scripts executable
      const scriptsDir = path.join(targetDir, 'scripts');
      if (fs.existsSync(scriptsDir)) {
        for (const file of fs.readdirSync(scriptsDir)) {
          if (file.endsWith('.sh')) {
            fs.chmodSync(path.join(scriptsDir, file), '755');
          }
        }
      }
      spinner.succeed('Scripts installed');
    }

    if (selections.extras.includes('mcp')) {
      spinner.start('Installing MCP config...');
      const src = path.join(TEMPLATES_DIR, 'mcp-settings.json');
      const dest = path.join(targetDir, '.claude', 'settings.json');
      if (fs.existsSync(src) && !fs.existsSync(dest)) {
        fs.copyFileSync(src, dest);
      }
      spinner.succeed('MCP config installed');
    }

    // Create CLAUDE.md if not exists
    const claudeMd = path.join(targetDir, 'CLAUDE.md');
    if (!fs.existsSync(claudeMd) && !options.global) {
      const template = path.join(TEMPLATES_DIR, 'CLAUDE.md');
      if (fs.existsSync(template)) {
        fs.copyFileSync(template, claudeMd);
        spinner.succeed('Created CLAUDE.md');
      }
    }

    // Success message
    console.log(chalk.green.bold('\n✅ Dev Agents installed successfully!\n'));
    console.log(chalk.white('Available commands:'));
    for (const cmd of selections.commands) {
      console.log(chalk.yellow(`  /${cmd}`) + chalk.gray(` - ${COMMANDS[cmd]}`));
    }
    console.log();
    console.log(chalk.white('Next steps:'));
    console.log(chalk.gray('  1. Open this project in Claude Code'));
    console.log(chalk.gray('  2. Type a command like /new-project or /commit'));
    if (selections.extras.includes('mcp')) {
      console.log(chalk.gray('  3. Run `dev-agents mcp` to configure API tokens'));
    }
    console.log();

  } catch (error) {
    spinner.fail('Installation failed');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

export async function addCommand(command) {
  const spinner = ora();

  if (!COMMANDS[command]) {
    console.log(chalk.red(`Unknown command: ${command}`));
    console.log(chalk.white('\nAvailable commands:'));
    Object.keys(COMMANDS).forEach(cmd => {
      console.log(chalk.yellow(`  ${cmd}`) + chalk.gray(` - ${COMMANDS[cmd]}`));
    });
    return;
  }

  spinner.start(`Adding /${command}...`);

  const targetDir = process.cwd();
  fs.mkdirSync(path.join(targetDir, '.claude', 'commands'), { recursive: true });

  const src = path.join(TEMPLATES_DIR, 'commands', `${command}.md`);
  const dest = path.join(targetDir, '.claude', 'commands', `${command}.md`);

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    spinner.succeed(`Added /${command}`);
  } else {
    spinner.fail(`Template not found for ${command}`);
  }
}

export function listCommands() {
  console.log(chalk.blue.bold('\n📋 Available Commands\n'));

  console.log(chalk.white.bold('Slash Commands (/.claude/commands/):'));
  Object.entries(COMMANDS).forEach(([name, desc]) => {
    console.log(chalk.yellow(`  /${name}`) + chalk.gray(` - ${desc}`));
  });

  console.log(chalk.white.bold('\nAgents (/agents/):'));
  Object.entries(AGENTS).forEach(([name, desc]) => {
    console.log(chalk.cyan(`  ${name}`) + chalk.gray(` - ${desc}`));
  });

  console.log(chalk.white.bold('\nTemplates (/templates/):'));
  console.log(chalk.gray('  pr/feature.md, pr/bugfix.md'));
  console.log(chalk.gray('  jira/story.md, jira/bug.md'));
  console.log(chalk.gray('  commit/examples.md'));
  console.log();
}

export async function setupMcp() {
  const { Input, Password } = enquirer;

  console.log(chalk.blue.bold('\n🔌 MCP Server Configuration\n'));
  console.log(chalk.gray('Configure API tokens for GitHub and Jira integration.\n'));

  try {
    // GitHub
    console.log(chalk.white.bold('GitHub Configuration'));
    console.log(chalk.gray('Create token at: https://github.com/settings/tokens'));
    console.log(chalk.gray('Required scopes: repo, read:user\n'));

    const githubPrompt = new Password({
      name: 'github',
      message: 'GitHub Token (leave empty to skip)'
    });
    const githubToken = await githubPrompt.run();

    // Jira
    console.log(chalk.white.bold('\nJira Configuration'));
    console.log(chalk.gray('Create token at: https://id.atlassian.com/manage-profile/security/api-tokens\n'));

    const jiraHostPrompt = new Input({
      name: 'host',
      message: 'Jira Host (e.g., company.atlassian.net)',
      initial: ''
    });
    const jiraHost = await jiraHostPrompt.run();

    let jiraEmail = '', jiraToken = '';
    if (jiraHost) {
      const emailPrompt = new Input({ name: 'email', message: 'Jira Email' });
      const tokenPrompt = new Password({ name: 'token', message: 'Jira API Token' });
      jiraEmail = await emailPrompt.run();
      jiraToken = await tokenPrompt.run();
    }

    // Write to env file
    const envContent = `# Dev Agents MCP Configuration
# Source this file: source ~/.dev-agents-env

# GitHub
export GITHUB_TOKEN="${githubToken}"

# Jira
export JIRA_HOST="${jiraHost}"
export JIRA_EMAIL="${jiraEmail}"
export JIRA_API_TOKEN="${jiraToken}"
`;

    const envPath = path.join(process.env.HOME, '.dev-agents-env');
    fs.writeFileSync(envPath, envContent, { mode: 0o600 });

    console.log(chalk.green.bold('\n✅ Configuration saved!\n'));
    console.log(chalk.white('Add to your shell profile:'));
    console.log(chalk.yellow(`  echo 'source ~/.dev-agents-env' >> ~/.zshrc`));
    console.log(chalk.white('\nOr run:'));
    console.log(chalk.yellow(`  source ~/.dev-agents-env`));
    console.log();

  } catch (error) {
    if (error.message !== 'cancelled') {
      console.error(chalk.red(error.message));
    }
  }
}

export async function installGlobal() {
  const spinner = ora();
  const globalDir = path.join(process.env.HOME, '.claude');

  spinner.start('Installing globally to ~/.claude...');

  try {
    // Create directories
    fs.mkdirSync(path.join(globalDir, 'commands'), { recursive: true });

    // Copy all commands
    const commandsDir = path.join(TEMPLATES_DIR, 'commands');
    if (fs.existsSync(commandsDir)) {
      for (const file of fs.readdirSync(commandsDir)) {
        fs.copyFileSync(
          path.join(commandsDir, file),
          path.join(globalDir, 'commands', file)
        );
      }
    }

    // Copy MCP settings if not exists
    const settingsSrc = path.join(TEMPLATES_DIR, 'mcp-settings.json');
    const settingsDest = path.join(globalDir, 'settings.json');
    if (fs.existsSync(settingsSrc) && !fs.existsSync(settingsDest)) {
      fs.copyFileSync(settingsSrc, settingsDest);
    }

    spinner.succeed('Installed globally');

    console.log(chalk.green.bold('\n✅ Commands available in all projects!\n'));
    console.log(chalk.white('Installed commands:'));
    Object.keys(COMMANDS).forEach(cmd => {
      console.log(chalk.yellow(`  /${cmd}`));
    });
    console.log();

  } catch (error) {
    spinner.fail('Global installation failed');
    console.error(chalk.red(error.message));
  }
}

// Helper: Copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;

  fs.mkdirSync(dest, { recursive: true });

  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
