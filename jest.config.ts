const { resolve } = require('path');

module.exports = {
    rootDir: resolve(__dirname, '.'),
    testMatch: [
        '<rootDir>/src/**/*.test.ts',
    ],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
    ],
    coverageReporters: ['text-summary'],
};
