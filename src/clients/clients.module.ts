import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { StoreModule } from '../store/store.module';

@Module({
  controllers: [ClientsController],
  imports: [StoreModule],
  providers: [ClientsService],
})
export class ClientsModule {}
