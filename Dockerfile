FROM oven/bun:1.1.29

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Run the CLI
CMD ["bun", "run", "dist/main.js"]