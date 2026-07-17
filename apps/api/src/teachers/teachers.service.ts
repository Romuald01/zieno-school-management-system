import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTeacherDto) {
    return this.prisma.teacher.create({
      data,
    });
  }

  findAll(search?: string) {
    if (search) {
      return this.prisma.teacher.findMany({
        where: {
          OR: [
            {
              firstName: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              staffId: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
      });
    }

    return this.prisma.teacher.findMany();
  }

  remove(id: string) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }
  update(id: string, data: CreateTeacherDto) {
  return this.prisma.teacher.update({
    where: { id },
    data,
  });
}
}