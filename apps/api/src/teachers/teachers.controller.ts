import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  Query,
} from '@nestjs/common';

import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';


@Controller('teachers')
export class TeachersController {
  constructor(
    private readonly teachersService: TeachersService,
  ) {}

  @Post()
  create(@Body() data: CreateTeacherDto) {
    return this.teachersService.create(data);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.teachersService.findAll(search);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: CreateTeacherDto,
  ) {
    return this.teachersService.update(id, data);
  }
}