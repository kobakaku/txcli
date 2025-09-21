import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Select the environment file based on the test type
const getEnvFile = () => {
  const testName = process.env.ENVIRONMENT;
  switch (testName) {
    case "unit":
    case "unit-dev":
      return path.join(__dirname, "../../.env.unit");
    case "e2e":
    case "e2e-dev":
      return path.join(__dirname, "../../e2etests/.env");
    default:
      throw new Error(`Invalid test name: ${testName}`);
  }
};

const envFile = getEnvFile();
console.log(`Loading environment from: ${envFile}`);
dotenv.config({ path: envFile });
