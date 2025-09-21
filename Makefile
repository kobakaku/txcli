ROOT_DIR := $(shell git rev-parse --show-toplevel)

BUN_DEPS := ./node_modules
DIST := ./dist
ENV_EXAMPLE := .env.example
ENV := .env

######## Dependencies ########

.PHONY: all
#? all: Complete project setup.
all: $(ENV) $(BUN_DEPS) $(DIST)

$(ENV): $(ENV_EXAMPLE)
	@test -f $(ENV) || (echo "🔧 .env not found. Creating from .env.example..." && cp $(ENV_EXAMPLE) $(ENV))

# We "touch" the directory, as a normal `bun install` won't update the
# timestamp, and make won't realize that the directory is actually up
# to date.
$(BUN_DEPS): package.json bun.lock
	@bun install
	@touch $@

$(DIST): $(shell find src -name "*.ts" 2>/dev/null)
	@echo "🔨 Building TypeScript..."
	@bun run build

######## App ########

APP_DEPS := $(ENV) $(BUN_DEPS) $(DIST)

.PHONY: setup
#? setup: Initialize project (env, DB).
setup: $(APP_DEPS)
	@echo "✅ Setup completed."

.PHONY: build
#? build: Build server's source.
build: $(BUN_DEPS) $(DIST)

.PHONY: run
#? run: Run app. Usage: make run TO_ADDRESS=0x... ETHER=0.01 NONCE=0
run: $(BUN_DEPS) $(DIST) $(ENV)
	@echo "🚀 Running app..."
	@bun run dist/main.js -- --toAddress $(TO_ADDRESS) --etherAmount $(ETHER) --nonce $(NONCE)

######## Tests ########

.PHONY: test
#? test: Run Unit tests.
test: $(BUN_DEPS)
	@echo "🧪 Running tests..."
	@bun run test

.PHONY: e2e
#? e2e: Run E2E tests.
e2e: $(BUN_DEPS) start-e2e-env
	@echo "🧪 Running E2E tests..."
	@set -e; \
	bun run test:e2e || (make stop-e2e-env; exit 1); \
	make stop-e2e-env

######## E2E Environment ########

.PHONY: start-e2e-env
#? start-e2e-env: Start E2E environment.
start-e2e-env: $(ENV)
	@echo "🚀 Starting E2E environment..."
	docker compose -f docker-compose.e2e.yml up -d

.PHONY: stop-e2e-env
#? stop-e2e-env: Stop E2E environment.
stop-e2e-env:
	@echo "🛑 Stopping E2E environment..."
	@docker compose -f docker-compose.e2e.yml down

######## Anvil ########

.PHONY: start-anvil
#? start-anvil: Start Ethereum local node (Anvil).
start-anvil: $(ENV)
	@if docker compose ps -q anvil | xargs docker inspect -f '{{.State.Running}}' 2>/dev/null | grep -q true; then \
		echo "✅ Anvil already running. Skipping start."; \
	else \
		echo "🚀 Anvil not running. Starting..."; \
		docker compose -f docker-compose.e2e.yml up -d anvil; \
	fi

.PHONY: stop-anvil
#? stop-anvil: Stop Ethereum local node (Anvil).
stop-anvil:
	@echo "🛑 Stopping Anvil..."
	@docker compose -f docker-compose.e2e.yml down anvil

######## Maintenance ########

.PHONY: lint
#? lint: Run code linter and formatter.
lint: $(BUN_DEPS)
	@echo "🧹 Auto-linting and formatting code..."
	@bun lint --write
	@bun format --write

.PHONY: lint-check
#? lint-check: Check formatting and linting without modifying files.
lint-check: $(BUN_DEPS)
	@echo "🔍 Linting and formatting code..."
	@bun lint
	@bun format

.PHONY: clean
#? clean: Remove node_modules, bun.lock, and dist.
clean: 
	@echo "🧼 Cleaning up..."
	@rm -rf node_modules dist
	@echo "✅ Done!"

.PHONY: help
#? help: Get more info on make commands.
help: Makefile
	@echo ''
	@echo 'Usage:'
	@echo '  make [target]'
	@echo ''
	@echo 'Targets:'
	@sed -n 's/^#?//p' $< | column -t -s ':' |  sort | sed -e 's/^/ /'
