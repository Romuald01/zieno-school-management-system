import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
  ) {}

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.studentsService.create(body);
  }
  @Delete(':id')
remove(@Param('id') id: string) {
  return this.studentsService.remove(id);
}
@Put(':id')
update(
  @Param('id') id: string,
  @Body() body: any,
) {
  return this.studentsService.update(id, body);
}
}
