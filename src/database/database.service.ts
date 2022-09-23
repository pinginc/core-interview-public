/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Collection, Db, Document, MongoClient } from 'mongodb';

import { Client } from '../client/entity/client.entity';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
    private static readonly clientCollectionName = 'client';
    private static readonly clientCollectionSearchIndexName = 'client_search_index';
    private static readonly clientCollectionExternalIdIndexName = 'client_externalId_index';

    static async initializeIfNeeded(client: MongoClient) {
        const db = client.db();
        const existingCollections = await db.listCollections().toArray();
        const collectionExists = existingCollections.some(
            (collection) => collection.name === DatabaseService.clientCollectionName
        );

        if (!collectionExists) {
            await db.createCollection(DatabaseService.clientCollectionName);
        }

        const collection = client.db().collection<Client>(DatabaseService.clientCollectionName);

        const searchIndexExists = await collection.indexExists(DatabaseService.clientCollectionSearchIndexName);
        if (!searchIndexExists) {
            await collection.createIndex(
                {
                    description: 'text',
                    name: 'text',
                },
                {
                    background: true,
                    name: DatabaseService.clientCollectionSearchIndexName,
                }
            );
        }

        const externalIdIndexExists = await collection.indexExists(DatabaseService.clientCollectionExternalIdIndexName);
        if (!externalIdIndexExists) {
            await collection.createIndex(
                {
                    customerId: 1,
                    externalId: 1,
                },
                {
                    background: true,
                    name: DatabaseService.clientCollectionExternalIdIndexName,
                }
            );
        }
    }

    readonly db: Db;

    constructor(readonly client: MongoClient) {
        this.db = client.db();
    }

    collection<T extends Document>(collectionName: string): Collection<T> {
        return this.db.collection<T>(collectionName);
    }

    async onApplicationShutdown(): Promise<void> {
        await this.client.close();
    }
}
