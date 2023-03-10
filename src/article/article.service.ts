import mongoose, { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { ARTICLE_NOT_FOUND_ERROR } from './../common/constants/errors.constants';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Article, ArticleDocument } from './schemas/article.schema';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async allArticles(
    page: number,
    limit: number,
    searchTerm?: string,
  ): Promise<{
    articles: ArticleDocument[];
    meta: {
      total: number;
      pageCount: number;
      prevPage: number;
      currPage: number;
    };
  }> {
    const skip = (page - 1) * limit;
    let query = {};

    if (searchTerm) {
      query = {
        title: new RegExp(searchTerm, 'i'),
      };
    }
    const [total, articles] = await Promise.all([
      this.articleModel.countDocuments(query).exec(),
      this.articleModel.find(query).limit(limit).skip(skip).exec(),
    ]);
    const pageCount = Math.ceil(total / limit);
    return {
      articles,
      meta: {
        total,
        pageCount,
        prevPage: page - 1,
        currPage: Number(page),
      },
    };
  }

  async byId(id: number) {
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
    const article = await this.articleModel
      .findOne({ _id: new mongoose.Types.ObjectId(id) })
      .exec();

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
    return this.articleModel
      .findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) })
      .exec();
  }

  async getComments(id: string) {
    return this.articleModel
      .findOne({ _id: new mongoose.Types.ObjectId(id) })
      .populate('comments')
      .select('comments')
      .exec();
  }

  async createComment(id: string, dto: CreateCommentDto) {
    const article = await this.articleModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (!article) {
      throw new BadRequestException(ARTICLE_NOT_FOUND_ERROR);
    }

    const newComment = await new this.commentModel(dto);
    article.comments.push(newComment._id);

    await Promise.all([newComment.save(), article.save()]);

    return newComment;
  }

  async deleteComment(id: string, commentId: string) {
    return this.commentModel.findOneAndRemove({
      _id: new mongoose.Types.ObjectId(commentId),
    });
  }
}
