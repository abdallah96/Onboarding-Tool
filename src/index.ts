#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { ProjectSetup } from './project-setup';

const program = new Command();

program
  .name('company-init')
  .description('Initialize a new project for development')
  .version('1.0.0');

program
  .command('init')
  .description('Set up a new project')
  .action(async () => {
    try {
      console.log(chalk.blue.bold('\n🚀 Welcome to Company Init!\n'));
      
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'What is the project name? (e.g., the-dev-guy)',
          validate: (input: string) => {
            if (!input.trim()) {
              return 'Project name is required';
            }
            if (!/^[a-zA-Z0-9-_]+$/.test(input.trim())) {
              return 'Project name can only contain letters, numbers, hyphens, and underscores';
            }
            return true;
          }
        },
        {
          type: 'input',
          name: 'organization',
          message: 'What is the GitHub organization? (e.g., Developers-at-G)',
          default: 'company',
          validate: (input: string) => {
            if (!input.trim()) {
              return 'Organization name is required';
            }
            if (!/^[a-zA-Z0-9-_]+$/.test(input.trim())) {
              return 'Organization name can only contain letters, numbers, hyphens, and underscores';
            }
            return true;
          }
        }
      ]);

      const repositoryUrl = `git@github.com:${answers.organization.trim()}/${answers.projectName.trim()}.git`;
      const setup = new ProjectSetup(repositoryUrl);
      await setup.initialize();
      
    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error instanceof Error ? error.message : 'Unknown error occurred');
      process.exit(1);
    }
  });

program.parse();
