import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get()
  getApi() {
    return {
      status: "success",
      message: "Zieno School Management API is running",
    };
  }
}