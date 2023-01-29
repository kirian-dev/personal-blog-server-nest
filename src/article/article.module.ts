import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article, ArticleSchema } from './schemas/article.schema';
import { ArticleController } from './article.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
