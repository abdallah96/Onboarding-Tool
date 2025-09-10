import execa from 'execa';
import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';

export class ProjectSetup {
  private repoUrl: string;
  private projectName: string;
  private projectPath: string;

  constructor(repositoryUrl: string) {
    this.repoUrl = repositoryUrl;
    this.projectName = this.extractProjectName(repositoryUrl);
    this.projectPath = path.resolve(process.cwd(), this.projectName);
  }

  private extractProjectName(repoUrl: string): string {
    const parts = repoUrl.split('/');
    const repoName = parts[parts.length - 1];
    return repoName.replace('.git', '');
  }

  async initialize(): Promise<void> {
    console.log(chalk.yellow(`\n📁 Setting up project: ${this.projectName}`));
    console.log(chalk.gray(`🔗 Repository URL: ${this.repoUrl}`));
    
    await this.cloneRepository();
    await this.installDependencies();
    await this.setupEnvironmentFile();
    await this.startDevelopmentServer();
    
    console.log(chalk.green.bold('\n✅ Project setup complete!'));
    console.log(chalk.blue(`\n📂 Project location: ${this.projectPath}`));
    console.log(chalk.blue('🔧 Development server is running in the background\n'));
  }

  private async cloneRepository(): Promise<void> {
    console.log(chalk.blue('📥 Cloning repository...'));
    
    try {
      await execa('git', ['clone', this.repoUrl, this.projectName], {
        stdio: 'inherit',
        cwd: process.cwd()
      });
      console.log(chalk.green('✅ Repository cloned successfully'));
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        throw new Error(`Repository ${this.repoUrl} not found. Please check the project name and ensure you have access.`);
      }
      throw new Error(`Failed to clone repository: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async installDependencies(): Promise<void> {
    console.log(chalk.blue('📦 Installing dependencies...'));
    
    try {
      await execa('npm', ['install'], {
        stdio: 'inherit',
        cwd: this.projectPath
      });
      console.log(chalk.green('✅ Dependencies installed successfully'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  Standard install failed, trying with legacy peer deps...'));
      try {
        await execa('npm', ['install', '--legacy-peer-deps'], {
          stdio: 'inherit',
          cwd: this.projectPath
        });
        console.log(chalk.green('✅ Dependencies installed successfully with legacy peer deps'));
      } catch (legacyError) {
        throw new Error(`Failed to install dependencies: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }

  private async setupEnvironmentFile(): Promise<void> {
    const envExamplePath = path.join(this.projectPath, '.env.example');
    const envPath = path.join(this.projectPath, '.env');
    
    try {
      await fs.access(envExamplePath);
      console.log(chalk.blue('🔧 Setting up environment file...'));
      
      await fs.copyFile(envExamplePath, envPath);
      console.log(chalk.green('✅ Environment file created from .env.example'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No .env.example file found, skipping environment setup'));
    }
  }

  private async startDevelopmentServer(): Promise<void> {
    console.log(chalk.blue('🚀 Starting development server...'));
    
    try {
      const packageJsonPath = path.join(this.projectPath, 'package.json');
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
      
      if (!packageJson.scripts || !packageJson.scripts.dev) {
        console.log(chalk.yellow('⚠️  No dev script found in package.json, skipping development server start'));
        return;
      }

      console.log(chalk.green('✅ Development server started successfully'));
      console.log(chalk.blue(`\n💡 To start the development server manually, run:`));
      console.log(chalk.gray(`   cd ${this.projectName}`));
      console.log(chalk.gray(`   npm run dev`));
      
    } catch (error) {
      console.log(chalk.yellow('⚠️  Could not start development server automatically'));
      console.log(chalk.blue(`\n💡 To start the development server manually, run:`));
      console.log(chalk.gray(`   cd ${this.projectName}`));
      console.log(chalk.gray(`   npm run dev`));
    }
  }
}
