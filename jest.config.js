module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.spec.ts',
    '!src/**/*.spec.tsx',
  ],
  // https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-reports/lib
  coverageReporters: [
    'text-summary',
    'html',
    'lcovonly',
    'json-summary',
  ],
  globals: {
    // normally set by webpack.DefinePlugin
    BUILD_INFO: {
      version: '0.1.0',
      buildDate: new Date().toJSON(),
      commitHash: 'babb2a47d9f3849ff0f697b2df7f44cc9f3b121f',
    },
  },
}
;
