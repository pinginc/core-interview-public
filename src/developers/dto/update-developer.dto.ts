/* Copyright © Time By Ping, Inc. 2023. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.’s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/
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
