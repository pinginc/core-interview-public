import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { IsString, ValidateNested } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { Type } from 'class-transformer';

export class Developer {
  @IsObjectId()
  id: ObjectId;

  @IsString()
  @ApiProperty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => ObjectId)
  @ApiProperty()
  projects: ObjectId[];
}
