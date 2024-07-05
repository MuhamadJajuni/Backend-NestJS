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
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  @HttpCode(200)
  async getAllContent() {
    return await this.contentService.getAllContent();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: number) {
    return await this.contentService.getById(+id);
  }

  @Post()
  @HttpCode(201)
  async createContent(@Body() createContent: CreateContentDto) {
    return await this.contentService.createContent(createContent);
  }

  @Put(':id')
  @HttpCode(200)
  async updateContent(@Param('id') id: number, @Body() updateContentDto) {
    return await this.contentService.updateContent(+id, updateContentDto);
  }

  @Delete(':id')
  @HttpCode(200)
  async softDeleteContent(@Param('id') id: number) {
    return await this.contentService.softDeleteContent(+id);
  }
}
