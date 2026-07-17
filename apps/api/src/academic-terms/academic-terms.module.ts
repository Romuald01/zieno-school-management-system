import { Module } from '@nestjs/common';
import { AcademicTermsController } from './academic-terms.controller';
import { AcademicTermsService } from './academic-terms.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AcademicTermsController],
  providers: [AcademicTermsService],
})
export class AcademicTermsModule {}