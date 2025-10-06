import type { Config } from 'jest';
import path from 'path';

const config: Config = {
    clearMocks: true,
    testEnvironment: 'jsdom',
    coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: [
        'js',
        'mjs',
        'cjs',
        'jsx',
        'ts',
        'mts',
        'cts',
        'tsx',
        'json',
        'node',
    ],
    rootDir: '../../',
    testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
    setupFilesAfterEnv: ['<rootDir>config/jest/jest-setup.ts'],
    moduleNameMapper: {
        '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
        '#/(.*)': '<rootDir>/src/$1',
        '\\.(s?css|less)$': 'identity-obj-proxy',
    },
};

export default config;
