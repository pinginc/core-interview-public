/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { Test, TestingModule } from '@nestjs/testing';

import { HealthModule } from './health.module';
import { HealthService } from './health.service';

describe('HealthService', () => {
    let module: TestingModule;
    let healthService: HealthService;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [HealthModule],
        }).compile();
        module.enableShutdownHooks();
        healthService = await module.resolve(HealthService);
    });

    afterEach(async () => {
        jest.restoreAllMocks();
        await module.close();
    });

    it('should create instances', () => {
        expect(healthService).toBeInstanceOf(HealthService);
    });

    it('should return health status', async () => {
        const health = await healthService.getHealth();
        expect(health).toEqual(healthService.health);
    });
});
