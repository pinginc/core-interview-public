import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { DevelopersModule } from './developers/developers.module';
import { TasksModule } from './tasks/tasks.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    StoreModule,
    ClientsModule,
    ProjectsModule,
    DevelopersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
