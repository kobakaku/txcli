import path from "node:path";
import { defineProject } from "vitest/config";

export const baseProject = defineProject({
    test: {
        setupFiles: [
            path.join(__dirname, "../../scripts/vitest/dotenv.ts"),
        ],
        pool: "forks",
        poolOptions: {
            forks: {
                singleFork: true,
            },
        },
        sequence: {
            concurrent: false,
            shuffle: false,
        },
    }
})
