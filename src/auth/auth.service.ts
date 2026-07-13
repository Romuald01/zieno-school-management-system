import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {

    const hashedPassword = await bcrypt.hash(
      data.password,
      10,
    );

    return this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,

        role: {
          connect: {
            name: 'SUPER_ADMIN',
          },
        },
      },
    });
  }

  async login(email: string, password: string) {
    return {
      message: 'Login coming soon',
    };
  }
}