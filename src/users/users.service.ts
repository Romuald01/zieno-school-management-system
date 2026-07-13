import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: string;
    phone?: string;
  }) {
    return this.prisma.user.create({
      data,
      include: {
        role: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        role: true,
      },
      orderBy: {
        firstName: 'asc',
      },
    });
  }
}