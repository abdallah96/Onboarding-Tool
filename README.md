# Company Init

A CLI tool for quickly setting up new development projects from GitHub repositories.

## Installation

```bash
npm install -g company-init
```

Or use with npx (no installation required):

```bash
npx company-init init
```

## Usage

```bash
company-init init
```

The tool will:
1. Ask for the project name
2. Ask for the GitHub organization (defaults to "company")
3. Clone the repository from `git@github.com:<organization>/<projectName>.git`
4. Install dependencies with `npm install`
5. Copy `.env.example` to `.env` if it exists
6. Provide instructions to start the development server

## Example

```bash
$ company-init init
? What is the project name? my-awesome-project
? What is the GitHub organization? company
📁 Setting up project: my-awesome-project
🔗 Repository URL: git@github.com:company/my-awesome-project.git
📥 Cloning repository...
✅ Repository cloned successfully
📦 Installing dependencies...
✅ Dependencies installed successfully
🔧 Setting up environment file...
✅ Environment file created from .env.example
✅ Project setup complete!
```

## Development

```bash
# Install dependencies
yarn install

# Build the project
yarn build

# Run in development mode
yarn dev

# Test locally
npm link
company-init --help
```

## Features

- Interactive prompts for project setup
- Automatic dependency installation
- Environment file configuration
- Error handling with fallback options
- Support for any GitHub organization
- Clean, user-friendly output

## Requirements

- Node.js 16.0.0 or higher
- Git access to the target repository
- npm or yarn package manager

## License

MIT