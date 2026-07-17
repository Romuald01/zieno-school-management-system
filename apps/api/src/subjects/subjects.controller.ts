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

import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(
    private readonly subjectsService: SubjectsService,
  ) {}

  @Post()
  create(@Body() body: CreateSubjectDto) {
    return this.subjectsService.create(body);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.subjectsService.findAll(search);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: CreateSubjectDto,
  ) {
    return this.subjectsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }
}