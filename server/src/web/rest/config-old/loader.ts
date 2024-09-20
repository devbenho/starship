import { config } from "dotenv";
import { readFileSync } from "fs";
import { IConfig } from "./config";

// Load environment variables from .env file
config();

// Define a function to validate the environment variables
const validateEnv = (config: IConfig, env: NodeJS.ProcessEnv): boolean => {
  const configKeys = Object.keys(config);
  for (const key of configKeys) {
    if (!(key in env)) {
      console.error(`Missing ${key} environment variable in .env file`);
      return false;
    }

    // Check if types match
    const expectedType = typeof config[key];
    const actualType = typeof env[key];
    if (expectedType !== actualType) {
      console.error(
        `Type mismatch for ${key}: Expected ${expectedType}, got ${actualType}`
      );
      return false;
    }
  }
  return true;
};

const envFileIntoObject = () => {
  // Load .env file content
  const envFilePath = "../.env";
  const envFileContent = readFileSync(envFilePath, "utf-8");

  // Parse .env file content
  const envData = envFileContent
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .reduce((acc, line) => {
      const [key, value] = line.split("=");
      acc[key.trim()] = value.trim();
      return acc;
    }, {} as { [key: string]: string });
};

// Validate the loaded environment variables against the interface
