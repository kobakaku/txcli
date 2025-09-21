import { defineProject } from "vitest/config";
import { baseProject } from "./config.base";

export const e2eLocalProject = defineProject({
    ...baseProject,
    test: {
        ...baseProject.test,
        name: "e2e",
        include: ["e2etests/**/*.test.ts"],
        env: {
            ENVIRONMENT: "e2e",
        },
    }
})

// Currently not in use, but should be used for testing in the Dev environment when necessary.
export const e2eDevProject = defineProject({
    ...baseProject,
    test: {
        ...baseProject.test,
        name: "e2e-dev",
        include: ["e2etests/**/*.test.ts"],
        env: {
            ENVIRONMENT: "e2e-dev",
        },
    }
})