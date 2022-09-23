/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    collectCoverage: true,
    collectCoverageFrom: ['**/*.ts'],
    coverageDirectory: '../test-results/e2e/coverage',
    maxWorkers: 2,
    moduleFileExtensions: ['ts', 'js'],
    preset: '@shelf/jest-mongodb',
    reporters: [
        'default',
        [
            'jest-junit',
            {
                ancestorSeparator: ' › ',
                classNameTemplate: '{classname}-{title}',
                outputDirectory: './test-results/e2e',
                outputName: 'junit.xml',
                suiteName: 'e2e',
                titleTemplate: '{classname}-{title}',
                uniqueOutputName: 'false',
                usePathForSuiteName: 'true',
            },
        ],
    ],
    rootDir: 'test',
    testRegex: '.*\\.e2e\\.spec\\.ts$',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    verbose: true,
    watchPathIgnorePatterns: ['globalConfig'],
};

export default config;
