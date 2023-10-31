module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  // setupFilesAfterEnv: ["<rootDir>/tests/main.spec.ts"],
  testMatch: ["**/*.spec.ts"],
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest",
  },
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/app/$1",
  },
  collectCoverage: false,
  coverageReporters: ["html"],
};
