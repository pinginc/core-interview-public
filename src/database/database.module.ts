/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';

import { Config } from '../config/entity/config.entity';
import { DatabaseService } from './database.service';

declare global {
    /**
     * @see https://github.com/shelfio/jest-mongodb
     */
    // eslint-disable-next-line no-underscore-dangle
    let __MONGO_URI__: string;

    /**
     * @see https://github.com/shelfio/jest-mongodb
     */
    // eslint-disable-next-line no-underscore-dangle
    let __MONGO_DB_NAME__: string;
}

@Global()
@Module({})
export class DatabaseModule {
    static forRoot(): DynamicModule {
        return {
            exports: [DatabaseService],
            global: true,
            module: DatabaseModule,
            providers: [
                {
                    inject: [Config],
                    provide: MongoClient,
                    useFactory: async (config: Config): Promise<MongoClient> => {
                        let mongoUri: string;

                        try {
                            mongoUri = new URL(__MONGO_DB_NAME__, __MONGO_URI__).href;
                        } catch {
                            // eslint-disable-next-line prefer-destructuring
                            mongoUri = config.mongoUri;
                        }

                        const client = await MongoClient.connect(mongoUri);
                        await DatabaseService.initializeIfNeeded(client);
                        return client;
                    },
                },
                DatabaseService,
            ],
        };
    }
}
