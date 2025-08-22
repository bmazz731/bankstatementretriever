# Contributing to Bank Statement Retriever

Thank you for your interest in contributing! This document outlines the process and guidelines for contributing to this project.

## Quick Links

- [Development Guide](./docs/DEVELOPMENT.md) - Detailed development setup and workflow
- [Setup Guide](./docs/setup/SETUP.md) - Environment setup and configuration
- [Architecture Documentation](./docs/implementation/) - Technical implementation details

## Before You Start

1. Read the [Product Requirements Document](./docs/prd.md) to understand the project goals
2. Check the [current issues](https://github.com/bmazz731/bankstatementretriever/issues) for work that needs to be done
3. Review the [development guide](./docs/DEVELOPMENT.md) for technical setup

## Development Process

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/bankstatementretriever.git
cd bankstatementretriever
```

### 2. Set Up Development Environment

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development servers
npm run dev
```

See the [Setup Guide](./docs/setup/SETUP.md) for detailed configuration.

### 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### 4. Make Your Changes

- Follow the [code standards](./docs/DEVELOPMENT.md#code-standards)
- Write clear, descriptive commit messages
- Add tests for new functionality (when testing framework is available)
- Update documentation as needed

### 5. Test Your Changes

```bash
# Run linting
npm run lint

# Run type checking
npm run typecheck

# Format code
npm run format

# Build to ensure no errors
npm run build
```

### 6. Submit a Pull Request

1. Push your branch to your fork
2. Create a Pull Request against the `main` branch
3. Fill out the PR template with:
   - Clear description of changes
   - Link to related issues
   - Steps to test the changes
   - Screenshots if UI changes

## Code Standards

### General Guidelines

- Write clean, readable code with clear variable names
- Add comments for complex business logic
- Follow TypeScript strict mode requirements
- Use meaningful commit messages

### Commit Message Format

```
type(scope): description

Examples:
feat(auth): add JWT token validation
fix(plaid): resolve circular dependency issue  
docs(setup): update environment configuration guide
refactor(api): improve error handling structure
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

### Code Review Process

1. All PRs require review before merging
2. Address review feedback promptly
3. Keep PRs focused and reasonably sized
4. Ensure CI checks pass

## Project Structure

### Adding New Features

- **Frontend components**: `apps/dashboard/src/components/`
- **API routes**: `apps/workers/src/routes/`
- **Shared utilities**: `packages/`
- **Documentation**: `docs/`

### Database Changes

1. Create migration in `deploy/database/`
2. Update TypeScript types
3. Test locally before submitting
4. Document breaking changes

## Security Guidelines

- Never commit secrets or API keys
- Use proper input validation
- Follow authentication best practices
- Review code for potential vulnerabilities

## Getting Help

- Check existing [GitHub Issues](https://github.com/bmazz731/bankstatementretriever/issues)
- Create a new issue for bugs or feature requests
- Join discussions in issue comments
- Reference the [troubleshooting guide](./docs/DEVELOPMENT.md#troubleshooting)

## Areas for Contribution

Current priorities (check issues for specific tasks):

1. **TypeScript Error Resolution** - Fix remaining type errors in workers
2. **Test Framework Setup** - Add comprehensive testing
3. **Documentation** - Improve setup and API documentation
4. **UI/UX Improvements** - Enhance dashboard experience
5. **Error Handling** - Improve error boundaries and user feedback

## Recognition

Contributors are recognized in:
- Git commit history
- Release notes
- Project README (for significant contributions)

Thank you for helping make Bank Statement Retriever better!