/* Copyright © Time By Ping, Inc. 2023. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.’s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { DevelopersModule } from './developers/developers.module';
import { ProjectsModule } from './projects/projects.module';
import { StoreModule } from './store/store.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  controllers: [AppController],
  imports: [StoreModule, ClientsModule, ProjectsModule, DevelopersModule, TasksModule],
  providers: [AppService],
})
export class AppModule {}
