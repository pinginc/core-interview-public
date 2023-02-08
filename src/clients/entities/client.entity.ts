import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class Client {
  @Type(() => ObjectId)
  @ApiProperty()
  id: ObjectId;

  @IsString()
  @ApiProperty()
  name: string;
}
