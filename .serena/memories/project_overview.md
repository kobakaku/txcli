# txcli Project Overview

## Purpose
`txcli` is a CLI application for creating signed Ethereum transfer transactions. It allows users to sign Ethereum transactions in an offline environment and optionally broadcast them to the network using a private key to sign transactions and outputs the signed transaction in hexadecimal format.

## Key Features
- Offline transaction signing for security
- Optional transaction broadcasting to Ethereum networks
- Support for various Ethereum chains (configurable via CHAIN_ID)
- Built with Bun runtime for performance
- Comprehensive testing with unit and E2E tests

## Tech Stack
- **Runtime**: Bun v1.0+
- **Language**: TypeScript with strict type checking
- **Blockchain**: Ethereum via Viem library
- **CLI Framework**: yargs for argument parsing
- **Validation**: Zod for schema validation and environment variable parsing
- **Testing**: Vitest for unit and E2E testing
- **Linting/Formatting**: Biome for code quality
- **Build Tool**: TypeScript compiler (tsc)
- **Development Environment**: Docker for E2E testing with Anvil

## Dependencies
- **Main**: viem (Ethereum library), zod (validation), yargs (CLI)
- **Dev**: @biomejs/biome, vitest, typescript, dotenv
- **Runtime**: Bun types and utilities