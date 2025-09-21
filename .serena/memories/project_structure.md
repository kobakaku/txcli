# Project Structure

## Directory Layout
```
txcli/
├── src/                    # Main source code
│   ├── main.ts            # CLI entry point and main logic
│   ├── env.ts             # Environment variable validation with Zod
│   ├── schema.ts          # Reusable Zod schemas (hex validation)
│   └── schema.test.ts     # Tests for schemas
├── e2etests/              # End-to-end tests
│   ├── helpers/           # Test helper functions
│   ├── client/            # Test client utilities
│   ├── index.test.ts      # Main E2E test file
│   └── const.ts           # Test constants
├── configs/               # Configuration files
│   └── vitest/            # Vitest configuration
│       ├── config.base.ts # Base vitest config
│       ├── config.unit.ts # Unit test config
│       └── config.e2e.ts  # E2E test config
├── scripts/               # Build and utility scripts
├── abi/                   # Ethereum ABI files (if needed)
├── .github/               # GitHub workflows and templates
├── dist/                  # Compiled TypeScript output
└── node_modules/          # Dependencies
```

## Key Files
- **package.json**: Dependencies and npm scripts
- **Makefile**: Main build automation and commands
- **biome.json**: Code formatting and linting configuration
- **vitest.config.ts**: Test runner configuration
- **tsconfig.json**: TypeScript configuration (extends tsconfig.base.json)
- **tsconfig.build.json**: Production build configuration
- **docker-compose.e2e.yml**: E2E test environment
- **.env.example**: Environment variable template
- **.env**: Local environment variables (gitignored)
- **Dockerfile**: Container configuration

## Build Output
- **dist/**: Compiled JavaScript files from TypeScript source
- Built files are used for running the CLI application

## Test Structure
- **Unit Tests**: Located alongside source files with `.test.ts` suffix
- **E2E Tests**: Separate directory with full integration testing
- **Test Configuration**: Split configurations for unit vs E2E testing

## Configuration Management
- Environment variables validated with Zod schemas
- TypeScript path aliases for clean imports
- Biome for consistent code formatting and linting
- Vitest workspaces for different test types