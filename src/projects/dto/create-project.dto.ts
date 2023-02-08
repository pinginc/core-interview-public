import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateProjectDto {
  @IsBoolean()
  @ApiProperty()
  description: boolean;

  @Type(() => ObjectId)
  @ApiProperty()
  clientId: ObjectId;
}
