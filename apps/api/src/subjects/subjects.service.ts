import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSubjectDto) {
    return this.prisma.subject.create({
      data,
    });
  }

  findAll(search?: string) {
    if (search) {
      return this.prisma.subject.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              code: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              teacherName: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              className: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
      });
    }

    return this.prisma.subject.findMany();
  }

  update(id: string, data: CreateSubjectDto) {
    return this.prisma.subject.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.subject.delete({
      where: { id },
    });
  }
}