/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^\\$lib/(.*)$': '<rootDir>/src/lib/$1',
    '^\\$cmp/(.*)$': '<rootDir>/src/components/$1'
  },
  setupFilesAfterEnv: ['jest-extended/all']
};
