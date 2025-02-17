// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  //setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  rootDir: './',
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  //moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironmentOptions: {},
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/playwright/',
    '<rootDir>/tests-examples/',
  ],
  clearMocks: true,
  //preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/__mocks__/singleton.ts'],
  moduleNameMapper: {
    //'@/auth': '<rootDir>/__tests__/mocks/auth.ts',
    'next-auth/providers/credentials':
      '<rootDir>/__tests__/mocks/next-auth-providers-credentials.ts',
    'next-auth': '<rootDir>/__mocks__/next-auth/index.ts',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
