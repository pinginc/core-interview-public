import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { ObjectId } from 'mongodb';

export class Project {
  @IsObjectId()
  @ApiProperty()
  id: ObjectId;

  @IsString()
  @ApiProperty()
  description: string;

  @IsObjectId()
  @ApiProperty()
  client: ObjectId;
}
