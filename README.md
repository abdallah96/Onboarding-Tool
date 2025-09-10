# Company Init

A CLI tool for quickly setting up new development projects.

## Installation

```bash
npm install -g company-init
```

Or use with npx:

```bash
npx company-init init
```

## Usage

```bash
company-init init
```

The tool will:
1. Ask for a project name
2. Clone the repository from `git@github.com:company/<projectName>.git`
3. Install dependencies with `npm install`
4. Copy `.env.example` to `.env` if it exists
5. Provide instructions to start the development server

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev
```
# Onboarding-Tool
