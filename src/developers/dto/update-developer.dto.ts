import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';
import { CreateDeveloperDto } from './create-developer.dto';

export class UpdateDeveloperDto extends PartialType(CreateDeveloperDto) {
  @IsString()
  @ApiProperty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => ObjectId)
  @ApiProperty()
  projects: ObjectId[];
}
