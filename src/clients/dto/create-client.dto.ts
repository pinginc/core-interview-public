import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @IsString()
  @ApiProperty()
  name: string;
}
