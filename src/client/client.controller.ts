/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

/* eslint-disable class-methods-use-this, @typescript-eslint/no-unused-vars */

import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    NotImplementedException,
    Param,
    Post,
    Query,
} from '@nestjs/common';

import { ObjectNotFoundError } from '../error/object-not-found.error';
import { ClientService } from './client.service';
import { ClientIdDto } from './dto/client-id.dto';
import { ImportManyClientsDto } from './dto/import-many-clients.dto';
import { SearchManyClientsDto } from './dto/search-many-clients.dto';
import { Client } from './entity/client.entity';

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Get()
    async searchMany(@Query() dto: SearchManyClientsDto): Promise<Client[]> {
        try {
            return await this.clientService.searchMany(dto);
        } catch (error) {
            Logger.error('failed to search clients', { dto, error });
            throw new InternalServerErrorException();
        }
    }

    @Get(':clientId')
    async findOne(@Param() dto: ClientIdDto): Promise<Client> {
        try {
            return await this.clientService.findOneOrThrow(dto);
        } catch (error) {
            if (error instanceof ObjectNotFoundError) {
                Logger.warn('client not found', { dto, error });
                throw new NotFoundException();
            } else {
                Logger.error('failed to find client', { dto, error });
                throw new InternalServerErrorException();
            }
        }
    }

    @Post('import')
    async importMany(@Body() dto: ImportManyClientsDto): Promise<void> {
        // TODO: implement this route
        // 1. must import clients through `clientService`
        // 2. must return appropriate response
        throw new NotImplementedException();
    }
}
