import mongoose, { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article, ArticleDocument } from './schemas/article.schema';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
export declare class ArticleService {
    private articleModel;
    private commentModel;
    constructor(articleModel: Model<ArticleDocument>, commentModel: Model<CommentDocument>);
    allArticles(page: number, limit: number, searchTerm?: string): Promise<{
        articles: ArticleDocument[];
        meta: {
            total: number;
            pageCount: number;
            prevPage: number;
            currPage: number;
        };
    }>;
    byId(id: number): Promise<Article & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    createArticle(dto: CreateArticleDto): Promise<Article & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateArticle(dto: UpdateArticleDto, id: string): Promise<Article & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteArticle(id: string): Promise<Article & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    getComments(id: string): Promise<Article & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    createComment(id: string, dto: CreateCommentDto): Promise<Comment & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteComment(id: string, commentId: string): Promise<Comment & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
}
