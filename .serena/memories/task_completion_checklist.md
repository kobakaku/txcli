# Task Completion Checklist

When completing any development task in the txcli project, ensure you follow these steps:

## 1. Code Quality Checks
```bash
# ALWAYS run these commands before considering a task complete:
make lint          # Auto-format and lint code
make test          # Run unit tests  
```

## 2. Build Verification
```bash
make build         # Ensure TypeScript compilation succeeds
```

## 3. For Feature Changes
```bash
# If you modified core functionality, run E2E tests:
make e2e          # Run end-to-end tests
```

## 4. Manual Testing (if applicable)
```bash
# Test the CLI with sample data:
make run TO_ADDRESS=0x742d35CC61C81f3e94a12c1C850b56C9e4561a4C ETHER=0.001 NONCE=0

# Test with broadcasting (use testnet):
make run TO_ADDRESS=0x742d35CC61C81f3e94a12c1C850b56C9e4561a4C ETHER=0.001 NONCE=0 BROADCAST=true
```

## 5. Environment Variables Check
Ensure `.env` is properly configured with:
- Valid RPC_URL for the target network
- Correct CHAIN_ID (e.g., 84532 for Base Sepolia)
- Valid SENDER_PRIVATE_KEY (test key only!)

## Required Tools on System
- Bun v1.0+ (primary runtime)
- Docker (for E2E tests and Anvil)
- Make (for build automation)
- Git (for version control)

## Before Committing
1. ✅ Code passes `make lint`
2. ✅ Code passes `make test`
3. ✅ Code builds successfully with `make build`
4. ✅ Manual testing completed (if applicable)
5. ✅ No sensitive keys in code or .env committed