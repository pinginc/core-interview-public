/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { Controller, Get, InternalServerErrorException, Logger } from '@nestjs/common';

import { HealthDto } from './dto/health.dto';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

    @Get()
    async getHealth(): Promise<HealthDto> {
        try {
            return await this.healthService.getHealth();
        } catch (error) {
            Logger.error('failed to get health', { error });
            throw new InternalServerErrorException();
        }
    }
}
