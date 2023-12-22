/* Copyright © Time By Ping, Inc. 2023. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.’s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/
import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { Collections, StoreService } from '../store/store.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  readonly store: StoreService;
  constructor() {
    this.store = new StoreService();
  }

  create(createClientDto: CreateClientDto) {
    const client = new Client();
    client.id = new ObjectId();
    client.name = createClientDto.name;

    return this.store.insert(Collections.Clients, client);
  }

  getAll() {
    return this.store.getAll(Collections.Clients);
  }

  findOne(id: number) {
    const result = this.store.findOne(Collections.Clients, +id as any);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  remove(id: any) {
    console.log('before delete', this.store.collections[Collections.Clients]);
    const result = this.store.DeleteOne(Collections.Clients, id);
    console.log('after delete', this.store.collections[Collections.Clients]);

    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
