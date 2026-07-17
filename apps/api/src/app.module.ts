import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { ClassesModule } from './classes/classes.module';
import { SubjectsModule } from './subjects/subjects.module';
import { AcademicSessionsModule } from './academic-sessions/academic-sessions.module';
import { AcademicTermsModule } from './academic-terms/academic-terms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    StudentsModule,
    TeachersModule,
    ClassesModule,
    SubjectsModule,
    AcademicSessionsModule,
    AcademicTermsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
