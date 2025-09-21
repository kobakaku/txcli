import { defineProject } from "vitest/config";
import { baseProject } from "./config.base";

export const unitLocalProject = defineProject({
    ...baseProject,
    test: {
        ...baseProject.test,
        name: "unit",
        include: ["src/**/*.test.ts"],
        env: {
            ENVIRONMENT: "unit"
        },
    }
})

// Currently not in use, but should be used for testing in the Dev environment when necessary.
export const unitDevProject = defineProject({
    ...baseProject,
    test: {
        ...baseProject.test,
        name: "unit-dev",
        include: ["src/**/*.test.ts"],
        env: {
            ENVIRONMENT: "unit-dev"
        },
    }
})