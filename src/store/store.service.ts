import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import equal from 'deep-equal';
import * as path from 'path';

import { existsSync, writeFileSync } from 'fs';

export enum Collections {
  Clients = 'clients',
  Developers = 'developers',
  Projects = 'projects',
  Tasks = 'tasks',
}

type Id = string | ObjectId;
type Item<T> = T & { id: Id };

const persistedStorePath = path.resolve(
  __dirname,
  '../../persisted-store.json',
);

@Injectable()
export class StoreService {
  collections: Record<Collections, unknown[]>;

  constructor() {
    if (typeof global.store !== 'undefined') {
      return global.store;
    }

    if (existsSync(persistedStorePath)) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const storeData = require(persistedStorePath);
      this.collections = storeData;
    } else {
      this.collections = {
        [Collections.Clients]: [],
        [Collections.Developers]: [],
        [Collections.Projects]: [],
        [Collections.Tasks]: [],
      };
    }

    global.store = this;
  }
  private updatePersistedStore() {
    writeFileSync(
      persistedStorePath,
      JSON.stringify(global.store.collections),
      { encoding: 'utf-8', flag: 'w' },
    );
  }

  insert<T>(collection: Collections, data: T) {
    global.store.collections[collection].push(data);
    this.updatePersistedStore();
    return data;
  }

  getAll(collection: Collections) {
    return global.store.collections[collection];
  }

  findOne<T>(collection: Collections, id: Id) {
    const idStr = id.toString();
    return global.store.collections[collection].find(
      (item: Item<T>) => item.id.toString() === idStr,
    );
  }

  find_many<T>(
    collection: Collections,
    filter: { [property: string]: unknown },
  ) {
    return global.store.collections[collection].filter((item: T) => {
      let match = true; // what if we start by assuming we have a match?
      const filterProps = Object.keys(filter);
      for (const prop of filterProps) {
        const objectProp = (item as any)[prop];
        if (typeof objectProp !== 'undefined' && !equal(objectProp, filter)) {
          match = false;
          break;
        }
      }
      return match;
    });
  }

  DeleteOne<T>(collection: Collections, id: Id) {
    const idStr = id.toString();
    const index = global.store.collections[collection].findIndex(
      (item: Item<T>) => item.id.toString() === idStr,
    );

    if (index >= 0) {
      const itemToDelete = global.store.collections[collection][index];
      global.store.collections[collection] = global.store.collections[
        collection
      ].splice(index, 1);
      this.updatePersistedStore();
      return itemToDelete;
    }
    return null;
  }
}
