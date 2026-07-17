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

import { AcademicSessionsService } from './academic-sessions.service';
import { CreateAcademicSessionDto } from './dto/create-academic-session.dto';

@Controller('academic-sessions')
export class AcademicSessionsController {
  constructor(
    private readonly academicSessionsService: AcademicSessionsService,
  ) {}

  @Post()
  create(@Body() body: CreateAcademicSessionDto) {
    return this.academicSessionsService.create(body);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.academicSessionsService.findAll(search);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: CreateAcademicSessionDto,
  ) {
    return this.academicSessionsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicSessionsService.remove(id);
  }
}