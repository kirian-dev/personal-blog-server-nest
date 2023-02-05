import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { Role } from './../common/enums/roles.enum';
import { Get, HttpCode } from '@nestjs/common/decorators';
import {
  Controller,
  Query,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getArticles(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('searchTerm') searchTerm = '',
  ) {
    return this.articleService.allArticles(page, limit, searchTerm);
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  async getArticle(@Param('id') id: number) {
    return this.articleService.byId(id);
  }

  @Auth(Role.Admin)
  @UsePipes(new ValidationPipe())
  @Post()
  async createArticle(@Body() dto: CreateArticleDto) {
    return this.articleService.createArticle(dto);
  }

  @Auth(Role.Admin)
  @Put(':id')
  @HttpCode(200)
  async updateArticle(
    @Body() dto: UpdateArticleDto,
    @Param('id', IdValidationPipe) id: string,
  ) {
    return this.articleService.updateArticle(dto, id);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  async deleteArticle(@Param('id', IdValidationPipe) id: string) {
    return this.articleService.deleteArticle(id);
  }
}
