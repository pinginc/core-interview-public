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
