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
import { ObjectNotFoundError } from '../error/object-not-found.error';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';
import { ClientIdDto } from './dto/client-id.dto';
import { ImportManyClientsDto } from './dto/import-many-clients.dto';
import { ImportOneClientDto } from './dto/import-one-client.dto';
import { Client } from './entity/client.entity';

describe('ClientService', () => {
    let module: TestingModule;
    let clientRepository: ClientRepository;
    let clientService: ClientService;

    let client: Client;
    let clientIdDto: ClientIdDto;
    let importOneClientDto: ImportOneClientDto;
    let importManyClientsDto: ImportManyClientsDto;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        module.enableShutdownHooks();
        clientRepository = await module.resolve(ClientRepository);
        clientService = await module.resolve(ClientService);

        client = new Client();
        clientIdDto = new ClientIdDto();
        importOneClientDto = new ImportOneClientDto();
        importManyClientsDto = new ImportManyClientsDto();

        client._id = clientIdDto.clientId = new ObjectId();
        client.externalId = importOneClientDto.externalId = faker.random.alphaNumeric(20);
        client.customerId = importOneClientDto.customerId = new ObjectId();
        client.name = importOneClientDto.name = faker.company.name();
        client.description = importOneClientDto.description = faker.company.catchPhrase();
        client.createdAt = client.updatedAt = new Date();

        importManyClientsDto.clients = [importOneClientDto];
    });

    afterEach(async () => {
        jest.restoreAllMocks();
        await module.close();
    });

    it('should create instances', () => {
        expect(clientRepository).toBeInstanceOf(ClientRepository);
        expect(clientService).toBeInstanceOf(ClientService);
    });

    it('should find one client', async () => {
        const spy = jest.spyOn(clientRepository, 'findOne').mockResolvedValue(client);
        const returnedClient = await clientService.findOneOrThrow(clientIdDto);
        expect(spy).toHaveBeenCalled();
        expect(returnedClient).toEqual(client);
    });

    it('should throw ObjectNotFoundError when client is not found', async () => {
        const spy = jest.spyOn(clientRepository, 'findOne').mockResolvedValue(undefined);
        let thrownError: unknown;
        try {
            await clientService.findOneOrThrow(clientIdDto);
        } catch (error) {
            thrownError = error;
        }
        expect(spy).toHaveBeenCalled();
        expect(thrownError).toBeInstanceOf(ObjectNotFoundError);
    });

    it('should import many clients', async () => {
        const spy = jest.spyOn(clientRepository, 'importMany').mockImplementation(async (passedClients) => {
            expect(Array.isArray(passedClients)).toEqual(true);
            expect(passedClients.length).toEqual(1);

            const [passedClient] = passedClients;
            expect(passedClient).toBeInstanceOf(Client);
            expect(passedClient?.externalId).toEqual(client.externalId);
            expect(passedClient?.customerId).toEqual(client.customerId);
            expect(passedClient?.name).toEqual(client.name);
            expect(passedClient?.description).toEqual(client.description);
        });

        await clientService.importMany(importManyClientsDto);
        expect(spy).toHaveBeenCalled();
    });
});
