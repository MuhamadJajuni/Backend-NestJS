import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  // Get
  @Get('/users')
  @HttpCode(200)
  async getAllUsers(): Promise<Prisma.UserCreateManyInput[]> {
    return await this.userService.getAllUsers();
  }
  // Get
  @Get('/users/:id')
  async getUserById(@Param('id') id) {
    return await this.userService.getUserById(parseInt(id));
  }
  // Post
  @Post('/users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
  // Put
  @Put('/users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(parseInt(id), updateUserDto);
  }

  // Soft Delete
  @Delete('/users/:id')
  async deleteUser(@Param('id') id) {
    return await this.userService.softDeleteUser(parseInt(id));
  }

  // Delete Permanent
  @Delete('/usersPermanen/:id')
  async deleteUserPermanen(@Param('id') id) {
    return await this.userService.deleteUserPermanen(parseInt(id));
  }
}
