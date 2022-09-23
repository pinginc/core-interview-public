/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';

import { AppModule } from '../app.module';
import { ClientRepository } from './client.repository';
import { Client } from './entity/client.entity';

describe('ClientRepository', () => {
    let module: TestingModule;
    let clientRepository: ClientRepository;

    let client: Client;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        module.enableShutdownHooks();
        clientRepository = await module.resolve(ClientRepository);

        client = new Client();
        client._id = new ObjectId();
        client.externalId = faker.random.alphaNumeric(20);
        client.customerId = new ObjectId();
        client.name = faker.company.name();
        client.description = faker.company.catchPhrase();
        client.createdAt = client.updatedAt = new Date();
    });

    afterEach(async () => {
        jest.restoreAllMocks();
        await module.close();
    });

    it('should create instances', () => {
        expect(clientRepository).toBeInstanceOf(ClientRepository);
    });

    it('should find one client', async () => {
        const spy = jest.spyOn(clientRepository.collection, 'findOne').mockResolvedValue(client as never);
        const returnedClient = await clientRepository.findOne({ _id: client._id });
        expect(spy).toHaveBeenCalled();
        expect(returnedClient).toEqual(client);
    });

    it('should return undefined when client is not found', async () => {
        const spy = jest.spyOn(clientRepository.collection, 'findOne').mockResolvedValue(null as never);
        const returnedClient = await clientRepository.findOne({ _id: client._id });
        expect(spy).toHaveBeenCalled();
        expect(returnedClient).toBeUndefined();
    });
});
