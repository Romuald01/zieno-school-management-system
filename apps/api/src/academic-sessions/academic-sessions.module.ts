import { Module } from '@nestjs/common';
import { AcademicSessionsController } from './academic-sessions.controller';
import { AcademicSessionsService } from './academic-sessions.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AcademicSessionsController],
  providers: [AcademicSessionsService],
})
export class AcademicSessionsModule {}