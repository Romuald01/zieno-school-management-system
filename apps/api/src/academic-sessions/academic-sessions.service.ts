import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAcademicSessionDto } from './dto/create-academic-session.dto';

@Injectable()
export class AcademicSessionsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAcademicSessionDto) {
    return this.prisma.academicSession.create({
      data,
    });
  }

  findAll(search?: string) {
    if (search) {
      return this.prisma.academicSession.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      });
    }

    return this.prisma.academicSession.findMany();
  }

  update(id: string, data: CreateAcademicSessionDto) {
    return this.prisma.academicSession.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.academicSession.delete({
      where: { id },
    });
  }
}