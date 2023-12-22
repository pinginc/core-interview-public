/* Copyright © Time By Ping, Inc. 2023. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.’s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/
import { BadRequestException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';

import { Collections, StoreService } from '../store/store.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly store: StoreService) {
    this.store = new StoreService();
  }
  create(createProjectDto: CreateProjectDto) {
    const { clientId } = createProjectDto;
    const client = this.store.findOne(Collections.Clients, clientId);
    if (client) {
      const p = this.store.insert(Collections.Projects, createProjectDto);
      const newProject = { ...p };
      return newProject;
    }
    throw new BadRequestException('Client not found');
  }

  find_many(filter: any) {
    const result = this.store.find_many(Collections.Projects, filter);
    return result;
  }

  findOne(id: string) {
    const result = this.store.findOne(Collections.Projects, id as any);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    throw new NotImplementedException();
  }

  remove(id: string) {
    throw new NotImplementedException();
  }
}
