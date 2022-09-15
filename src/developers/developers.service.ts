import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Collections, StoreService } from '../store/store.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './entities/developer.entity';

@Injectable()
export class DevelopersService {
  constructor(private readonly store: StoreService) {
    this.store = new StoreService();
  }
  create(createDeveloperDto: CreateDeveloperDto) {
    const developer = new Developer();
    developer.id = new ObjectId();
    developer.name = createDeveloperDto.name;
    developer.projects = [];

    console.log(
      'before insert',
      this.store.collections[Collections.Developers],
    );
    const a = this.store.insert(Collections.Developers, developer);
    console.log('after insert', this.store.collections[Collections.Developers]);
    return a;
  }

  findAll() {
    return this.store.getAll(Collections.Clients);
  }

  findOne(id: number) {
    const result = this.store.findOne(Collections.Developers, id as any);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  update(id: string, update_Developer_Dto: UpdateDeveloperDto) {
    throw new NotImplementedException();
  }

  remove(id: string) {
    const result = this.store.DeleteOne(Collections.Developers, id);

    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
