import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAcademicTermDto } from './dto/create-academic-term.dto';

@Injectable()
export class AcademicTermsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAcademicTermDto) {
    return this.prisma.academicTerm.create({
      data,
    });
  }

  findAll(search?: string) {
    if (search) {
      return this.prisma.academicTerm.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      });
    }

    return this.prisma.academicTerm.findMany();
  }

  update(id: string, data: CreateAcademicTermDto) {
    return this.prisma.academicTerm.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.academicTerm.delete({
      where: { id },
    });
  }
}