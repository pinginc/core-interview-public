/* Copyright © Time By Ping, Inc. 2023. All rights reserved.
 *
 * Any unauthorized reproduction, distribution, public display, public
 * performance or derivatization thereof can constitute, among other things, an
 * infringement of Time By Ping Inc.’s exclusive rights under the Copyright Law
 * of the U.S. (17 U.S.C. § 106) and may subject the infringer thereof to
 * severe legal liability.*/
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './entities/developer.entity';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Post()
  create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.developersService.create(createDeveloperDto);
  }

  @Get()
  findAll() {
    return this.developersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Developer })
  findOne(@Param('id') id: string) {
    return this.developersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeveloperDto: UpdateDeveloperDto) {
    return this.developersService.update(id, updateDeveloperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.developersService.remove(id);
  }
}
