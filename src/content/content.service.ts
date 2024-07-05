import { BadRequestException, HttpCode, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateContentDto } from './dto/update-content.dto';
import { CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllContent() {
    return await this.prisma.content.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async getById(id: number) {
    try {
      return await this.prisma.content.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException('Content not found');
    }
  }

  async updateContent(id: number, updateContentDto: UpdateContentDto) {
    return await this.prisma.content.update({
      where: {
        id,
      },
      data: {
        ...updateContentDto,
      },
    });
  }

  async softDeleteContent(id: number) {
    const content = await this.prisma.content.findUnique({
      where: {
        id,
      },
    });
    return {
      Status: HttpCode(200),
      Message: 'Data Succesfully Deleted',
      Data: {
        id: content.id,
        deletedAt: content.deletedAt,
      },
    };
  }

  async createContent(createContent: CreateContentDto) {
    return await this.prisma.content.create({ data: createContent });
  }
}
