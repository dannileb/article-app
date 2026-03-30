import type { Config } from 'jest';
import path from 'path';

const config: Config = {
    clearMocks: true,
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
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
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            path.resolve(__dirname, 'jestEmptyComponent.tsx'),
        '#/(.*)$': '<rootDir>/src/$1',
        '\\.(s?css|less)$': 'identity-obj-proxy',
    },
    globals: {
        __IS_DEV__: true,
        __API__: '',
        __PROJECT__: 'jest',
        __BUNDLER__: 'webpack',
    },
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: '<rootDir>/jest-report',
                filename: 'report.html',
                openReport: false,
            },
        ],
    ],
};

export default config;
