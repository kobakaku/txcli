# txcli

CLI application for creating signed Ethereum transfer transactions

## Overview

This tool allows you to sign Ethereum transactions in an offline environment. It uses a private key to sign transactions and outputs the signed transaction in hexadecimal format.

## Prerequisites

- [Bun](https://bun.sh/) v1.0 or higher must be installed

Installing Bun:
```bash
curl -fsSL https://bun.sh/install | bash
```

## Configuration

Create a `.env` file and set the following environment variables:

```env
# Chain ID (e.g., 84532 = Base Sepolia)
CHAIN_ID=84532

# Private key (hexadecimal format starting with 0x)
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
```

## Usage

### Basic Usage (Offline Signing)

```bash
# Using Makefile
make run TO_ADDRESS=0xRecipientAddress ETHER=0.01 NONCE=0
```

### Options

- `--toAddress` (`-t`): Ethereum recipient address (required)
- `--etherAmount` (`-e`): Amount to send in ETH (required)
- `--nonce` (`-n`): Transaction nonce value (required)

## Output Examples

```
Using nonce: 0
Signed transaction: 0xf86f808502540be40082520894863454baa02ff0a84ed9e663ea0921c8c388c44688016345785d8a0000808302948ba0...
```

## Testing

```bash
# Unit tests
make test

# E2E tests
make e2e
```

## Development

### Project Structure

```
src/
├── main.ts         # Main entry point
├── env.ts          # Environment variable validation and parsing
├── schema.ts       # Zod schema definitions
└── schema.test.ts  # Schema tests
```

### Starting Local Node (Anvil)

```bash
# Start Anvil
make start-anvil

# Stop Anvil
make stop-anvil
```

## License

MIT