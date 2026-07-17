import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateClassDto) {
    return this.prisma.class.create({
      data,
    });
  }

  findAll(search?: string) {
    if (search) {
      return this.prisma.class.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              arm: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              level: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
      });
    }

    return this.prisma.class.findMany();
  }

  update(id: string, data: CreateClassDto) {
    return this.prisma.class.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.class.delete({
      where: { id },
    });
  }
}