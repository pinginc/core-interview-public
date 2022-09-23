/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ObjectNotFoundError } from '../error/object-not-found.error';
import { ClientRepository } from './client.repository';
import { ClientIdDto } from './dto/client-id.dto';
import { ImportManyClientsDto } from './dto/import-many-clients.dto';
import { SearchManyClientsDto } from './dto/search-many-clients.dto';
import { Client } from './entity/client.entity';

@Injectable()
export class ClientService {
    readonly defaultSearchLimit = 10;

    constructor(private readonly clientRepository: ClientRepository) {}

    /**
     * finds one client or throws
     *
     * @param dto the data transfer object containing the client id
     * @throws {ObjectNotFoundError} if the client doesn't exist
     */
    async findOneOrThrow(dto: ClientIdDto): Promise<Client> {
        const clientOrNone = await this.clientRepository.findOne({ _id: dto.clientId });

        if (typeof clientOrNone === 'undefined') {
            throw new ObjectNotFoundError();
        }

        Logger.debug('found one client', { dto, readCount: 1 });
        return clientOrNone;
    }

    /**
     * searches many clients using the provided query
     *
     * @param dto the data transfer object containing the search query
     * @throws
     */
    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
    async searchMany(dto: SearchManyClientsDto): Promise<Client[]> {
        // TODO: implement this function
        // 1. search all clients for ones containing the given text
        // 2. if user provided a limit, return the top n results, otherwise use `defaultSearchLimit`
        throw new NotImplementedException();
    }

    /**
     * handles the logic of importing many clients
     *
     * @param dto the data transfer object containing the import parameters
     * @throws
     */
    async importMany(dto: ImportManyClientsDto): Promise<void> {
        const clients = dto.clients.map((clientDto) => {
            const client = new Client();

            client._id = new ObjectId();
            client.externalId = clientDto.externalId;
            client.customerId = clientDto.customerId;
            client.name = clientDto.name;
            client.description = clientDto.description;
            client.createdAt = client.updatedAt = new Date();

            return client;
        });

        await this.clientRepository.importMany(clients);
        Logger.log('imported many clients', { writeCount: clients.length });
    }
}
