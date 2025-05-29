module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'], // Ignore compiled JS files
  collectCoverage: true, // Enable coverage collection
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Output formats
  coverageDirectory: '<rootDir>/tests/coverage', // Directory for coverage reports
  testMatch: ['**/tests/**/*.test.ts'], // Only look for tests in the tests folder
  coverageProvider: 'v8',
};
