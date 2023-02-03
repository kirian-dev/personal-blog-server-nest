import { CreateArticleDto } from './dto/create-article.dto';
import { ARTICLE_NOT_FOUND_ERROR } from './../common/constants/errors.constants';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Article, ArticleDocument } from './schemas/article.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async allArticles(
    page: number,
    limit: number,
    searchTerm?: string,
  ): Promise<{
    articles: ArticleDocument[];
    meta: { total: number; pageCount: number };
  }> {
    const skip = (page - 1) * limit;
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            title: new RegExp(searchTerm, 'i'),
          },
        ],
      };
    }
    const totalArticlesPromise = await this.articleModel
      .countDocuments({})
      .exec();
    const articlesPromise = await this.articleModel
      .find(options)
      .limit(limit)
      .skip(skip)
      .exec();

    const [total, articles] = await Promise.all([
      totalArticlesPromise,
      articlesPromise,
    ]);
    const pageCount = total / limit;
    return {
      articles,
      meta: {
        total,
        pageCount,
      },
    };
  }

  async byId(id: string) {
    const article = await this.articleModel
      .findOne({ _id: new mongoose.Types.ObjectId(id) })
      .exec();

    if (!article) {
      throw new BadRequestException(ARTICLE_NOT_FOUND_ERROR);
    }

    return article;
  }

  async createArticle(dto: CreateArticleDto) {
    const newArticle = await new this.articleModel({
      title: dto.title,
      description: dto.description,
      image: dto.image,
    });

    newArticle.save();

    return newArticle;
  }

  async updateArticle(dto: UpdateArticleDto, id: string) {
    const article = await this.articleModel.findById(id).exec();

    if (!article) {
      throw new BadRequestException(ARTICLE_NOT_FOUND_ERROR);
    }

    article.title = dto.title;
    article.description = dto.description;
    article.image = dto.image;

    await article.save();

    return article;
  }

  async deleteArticle(id: string) {
    return this.articleModel.findByIdAndDelete(id).exec();
  }
}
