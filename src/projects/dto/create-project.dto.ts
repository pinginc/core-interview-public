import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { ObjectId } from 'mongodb';

export class CreateProjectDto {
  @IsBoolean()
  @ApiProperty()
  description: boolean;

  @IsObjectId()
  @ApiProperty()
  clientId: ObjectId;
}
