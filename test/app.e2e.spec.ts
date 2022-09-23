/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { faker } from '@faker-js/faker';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { ImportManyClientsDto } from '../src/client/dto/import-many-clients.dto';
import { ImportOneClientDto } from '../src/client/dto/import-one-client.dto';
import { SearchManyClientsDto } from '../src/client/dto/search-many-clients.dto';

describe('AppController (e2e)', () => {
    let module: TestingModule;
    let app: INestApplication;

    let search: string;
    let customerId: ObjectId;

    let searchManyClientsDto: SearchManyClientsDto;
    let importManyClientsDto: ImportManyClientsDto;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        module.enableShutdownHooks();

        app = module.createNestApplication();
        app.setGlobalPrefix('');
        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        await app.init();

        customerId = new ObjectId();

        searchManyClientsDto = new SearchManyClientsDto();
        searchManyClientsDto.search = search = faker.random.alpha(5);
        searchManyClientsDto.limit = 10;

        importManyClientsDto = new ImportManyClientsDto();
        importManyClientsDto.clients = Array(200)
            .fill(null)
            .map(() => {
                const dto = new ImportOneClientDto();
                dto.externalId = faker.random.alphaNumeric(20);
                dto.customerId = customerId;
                dto.name = faker.company.name();
                dto.description = [faker.company.catchPhrase(), search].join(' ');
                return dto;
            });
    });

    afterAll(async () => {
        await app.close();
        await module.close();
    });

    it('GET /health', async () => {
        await request(app.getHttpServer())
            .get('/health')
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('healthy', true);
            });
    });

    it('POST /clients/import', async () => {
        await request(app.getHttpServer()).post('/clients/import').send(importManyClientsDto).expect(201);
    });

    it('GET /clients - should validate limit', async () => {
        for (const limit of [-10, 0, 200]) {
            await request(app.getHttpServer()).get('/clients').query({ limit, search }).expect(400);
        }
    });

    it('GET /clients - should validate search', async () => {
        await request(app.getHttpServer()).get('/clients').expect(400);
        await request(app.getHttpServer()).get('/clients').query({ search: '' }).expect(400);
        await request(app.getHttpServer()).get('/clients').query({ search: 'a' }).expect(400);
    });

    it('GET /clients - should return valid results', async () => {
        for (const limit of [1, 10, 25, 50]) {
            await request(app.getHttpServer())
                .get('/clients')
                .query({ limit, search })
                .expect(200)
                .expect((res) => {
                    expect(res.body).toHaveProperty('length', limit);

                    for (const client of res.body) {
                        expect(client).toHaveProperty('_id');
                        expect(client).toHaveProperty('externalId');
                        expect(client).toHaveProperty('customerId', customerId.toString());
                        expect(client).toHaveProperty('name');
                        expect(client).toHaveProperty('description');
                        expect(client).toHaveProperty('createdAt');
                        expect(client).toHaveProperty('updatedAt');
                    }
                });
        }
    });
});
