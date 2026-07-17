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

import { AcademicTermsService } from './academic-terms.service';
import { CreateAcademicTermDto } from './dto/create-academic-term.dto';

@Controller('academic-terms')
export class AcademicTermsController {
  constructor(
    private readonly academicTermsService: AcademicTermsService,
  ) {}

  @Post()
  create(@Body() body: CreateAcademicTermDto) {
    return this.academicTermsService.create(body);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.academicTermsService.findAll(search);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: CreateAcademicTermDto,
  ) {
    return this.academicTermsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicTermsService.remove(id);
  }
}