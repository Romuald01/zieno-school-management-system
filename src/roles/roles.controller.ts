import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
  ) {}

  @Post()
  create(
    @Body()
    body: {
      name: string;
      description?: string;
    },
  ) {
    return this.rolesService.create(body);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }
}