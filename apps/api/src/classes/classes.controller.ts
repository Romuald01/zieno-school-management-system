import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(
    private readonly classesService: ClassesService,
  ) {}

  @Post()
  create(@Body() body: CreateClassDto) {
    return this.classesService.create(body);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.classesService.findAll(search);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: CreateClassDto,
  ) {
    return this.classesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(id);
  }
}