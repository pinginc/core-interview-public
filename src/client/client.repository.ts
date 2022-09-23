/*
 * Copyright © Time By Ping, Inc. 2020. All rights reserved.
 * Any unauthorized reproduction, distribution, public display, public performance or
 * derivatization thereof can constitute, among other things, an infringement of Time By Ping Inc.’s
 * exclusive rights under the Copyright Law of the U.S. (17 U.S.C. § 106) and may subject the
 * infringer thereof to severe legal liability.
 */

/* eslint-disable class-methods-use-this, @typescript-eslint/no-unused-vars */

import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { Collection, Filter, FindCursor } from 'mongodb';

import { DatabaseService } from '../database/database.service';
import { Client } from './entity/client.entity';

@Injectable()
export class ClientRepository {
    constructor(databaseService: DatabaseService) {
        this.collection = databaseService.collection<Client>('client');
    }

    readonly collection: Collection<Client>;

    async findOne(filter: Filter<Client>): Promise<Client | undefined> {
        const clientOrNone = await this.collection.findOne(filter);

        if (clientOrNone === null) {
            return undefined;
        }

        Logger.debug('read one client', { filter });
        return clientOrNone;
    }

    findMany(filter: Filter<Client>): FindCursor<Client> {
        return this.collection.find(filter);
    }

    async importMany(clients: Client[]): Promise<void> {
        // TODO: implement this function
        // 1. `clients` may contain new and existing clients
        //   a. new clients must be created
        //   b. existing clients must be updated
        //   c. if the existing client is deleted, it must be restored
        throw new NotImplementedException();
    }
}
