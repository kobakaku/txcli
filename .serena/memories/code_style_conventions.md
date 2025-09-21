# Code Style and Conventions

## General Style
- **Language**: TypeScript with strict type checking enabled
- **Module System**: ES2022 modules with ES2021 target
- **Import Style**: ES6 imports, with path aliases (@/ for src/)

## Code Formatting (Biome)
- **Indentation**: Spaces (not tabs)
- **Quote Style**: Double quotes for JavaScript/TypeScript
- **Formatter**: Biome with recommended rules enabled
- **Linter**: Biome with recommended rules

## TypeScript Configuration
- **Strict Mode**: Enabled with all strict type-checking options
- **Decorators**: Experimental decorators and metadata emission enabled
- **Module Resolution**: Node.js style
- **Target**: ES2021 with ES2022 modules
- **Path Aliases**: 
  - `@/*` maps to `src/*`
  - `@/e2etests/*` maps to `e2etests/*`

## Naming Conventions
- **Files**: kebab-case for TypeScript files (e.g., `schema.test.ts`)
- **Variables**: camelCase (e.g., `etherAmount`, `toAddress`)
- **Constants**: camelCase for regular constants
- **Types**: PascalCase (inferred from Viem usage)

## Code Organization
- **Environment**: Centralized in `src/env.ts` with Zod validation
- **Schemas**: Reusable validation schemas in `src/schema.ts`
- **Main Logic**: Entry point in `src/main.ts`
- **Tests**: Co-located with source files (`.test.ts` suffix)

## Import Patterns
- External libraries first
- Internal imports using path aliases
- Destructured imports preferred where appropriate

## Error Handling
- Type-safe error handling with proper TypeScript types
- Validation through Zod schemas with meaningful error messages