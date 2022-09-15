import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { StoreModule } from '../store/store.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [StoreModule],
})
export class ProjectsModule {}
