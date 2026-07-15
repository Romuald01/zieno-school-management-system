import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.student.findMany({
      include: {
        schoolClass: true,
      },
    });
  }

  async create(data: any) {
    return this.prisma.student.create({
      data,
    });
  }
  
  async remove(id: string) {
  return this.prisma.student.delete({
    where: {
      id,
    },
  });
}
async update(id: string, data: any) {
  return this.prisma.student.update({
    where: {
      id,
    },
    data,
  });
}
}