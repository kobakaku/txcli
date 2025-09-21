# Suggested Commands for txcli Development

## Setup and Installation
```bash
# Complete project setup (creates .env, installs deps, builds)
make all

# Initial setup only
make setup

# Install dependencies only
bun install
```

## Development Commands
```bash
# Build the project
make build
# OR
bun run build

# Run the application (example)
make run TO_ADDRESS=0x... ETHER=0.01 NONCE=0 BROADCAST=false
```

## Testing Commands
```bash
# Run unit tests
make test
# OR
bun run test

# Run E2E tests (starts test environment automatically)
make e2e
# OR
bun run test:e2e

# Start E2E environment manually
make start-e2e-env

# Stop E2E environment
make stop-e2e-env
```

## Code Quality Commands
```bash
# Auto-lint and format code (applies fixes)
make lint
# OR
bun lint --write && bun format --write

# Check linting and formatting (no fixes)
make lint-check
# OR
bun lint && bun format
```

## Local Ethereum Development
```bash
# Start local Ethereum node (Anvil)
make start-anvil

# Stop local Ethereum node
make stop-anvil
```

## Utility Commands
```bash
# Clean build artifacts and dependencies
make clean

# Get help on available make commands
make help
```

## Environment Setup
```bash
# Copy example environment file (done automatically by make all)
cp .env.example .env
# Then edit .env with your actual values
```

## Most Important Commands for Development
1. `make all` - Complete setup
2. `make test` - Run tests
3. `make lint` - Format and lint code
4. `make run TO_ADDRESS=0x... ETHER=0.01 NONCE=0` - Test the CLI