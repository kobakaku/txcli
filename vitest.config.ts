import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { unitDevProject, unitLocalProject } from './configs/vitest/config.unit'
import { e2eLocalProject, e2eDevProject } from './configs/vitest/config.e2e'

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        workspace: [
            {
                extends: true,
                ...unitLocalProject
            },
            {
                extends: true,
                ...unitDevProject
            },
            {
                extends: true,
                ...e2eLocalProject
            },
            {
                extends: true,
                ...e2eDevProject
            },
        ],
        coverage: {
            provider: 'v8',
            reporter: [["lcovonly", { file: "lcov.info" }], ["text"]],
            include: ['src/**/*.{ts,js}'],
        },
        typecheck: {
            tsconfig: "./tsconfig.test.json"
        }
    },
    plugins: [tsconfigPaths()]
})
