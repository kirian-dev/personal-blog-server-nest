/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleService } from './article.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    getArticles(page?: number, limit?: number, searchTerm?: string): Promise<{
        articles: import("./schemas/article.schema").ArticleDocument[];
        meta: {
            total: number;
            pageCount: number;
            prevPage: number;
            currPage: number;
        };
    }>;
    getArticle(id: number): Promise<import("./schemas/article.schema").Article & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createArticle(dto: CreateArticleDto): Promise<import("./schemas/article.schema").Article & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateArticle(dto: UpdateArticleDto, id: string): Promise<import("./schemas/article.schema").Article & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteArticle(id: string): Promise<import("./schemas/article.schema").Article & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getComments(id: string): Promise<import("./schemas/article.schema").Article & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createComment(id: string, dto: CreateCommentDto): Promise<import("./schemas/comment.schema").Comment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteComment(id: string, commentId: string): Promise<import("./schemas/comment.schema").Comment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
