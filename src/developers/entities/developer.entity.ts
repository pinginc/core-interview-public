import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { IsString, Validate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class Developer {
  @Type(() => ObjectId)
  id: ObjectId;

  @IsString()
  @ApiProperty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => ObjectId)
  @ApiProperty()
  projects: ObjectId[];
}
