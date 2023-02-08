import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class Project {
  @Type(() => ObjectId)
  @ApiProperty()
  id: ObjectId;

  @IsString()
  @ApiProperty()
  description: string;

  @ApiProperty()
  client: ObjectId;
}
