import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Adjust this if you're using path aliases
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Optional: if you have a setup file
};

export default config;
