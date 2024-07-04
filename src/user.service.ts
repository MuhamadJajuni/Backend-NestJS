/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { STATUS_CODES } from 'http';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  deleteUser(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<Prisma.UserCreateManyInput[]> {
    return await this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
    });
  }
  async createUser(createUserDto: CreateUserDto) {
    const users = await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
    return users;
  }
  async getUserById(@Query('id', ParseIntPipe) id: number) {
    const users = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return users;
  }

  async updateUser(@Param('id') id, updateUserDto: UpdateUserDto) {
    const users = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
    return {
      Status: STATUS_CODES[200],
      Message: 'Data Succesfully Updated',
      Data: {
        ...users,
      },
    };
  }
  async softDeleteUser(@Param('id') id) {
    const users = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return {
      Status: STATUS_CODES[205],
      Message: 'Soft Deleted Succesfully',
      Data: {
        id: users.id,
        name: users.name,
        deletedAt: users.deletedAt,
      },
    };
  }

  async deleteUserPermanen(@Param('id') id) {
    const users = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return {
      Status: STATUS_CODES[200],
      Message: 'Data Succesfully Deleted',
      Data: {
        id: users.id,
        name: users.name,
        deletedAt: users.deletedAt,
      },
    };
  }
}
