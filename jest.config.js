// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
//   };


// jest.config.js
module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/integration-tests/**/*.+(ts|tsx|js)'],
    collectCoverageFrom: [
        "src/**/*.{ts,tsx,js}"
    ],
    coverageDirectory: "coverage",
};