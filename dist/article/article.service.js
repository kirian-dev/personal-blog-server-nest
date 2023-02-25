"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const mongoose_1 = require("mongoose");
const errors_constants_1 = require("./../common/constants/errors.constants");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const article_schema_1 = require("./schemas/article.schema");
const comment_schema_1 = require("./schemas/comment.schema");
let ArticleService = class ArticleService {
    constructor(articleModel, commentModel) {
        this.articleModel = articleModel;
        this.commentModel = commentModel;
    }
    async allArticles(page, limit, searchTerm) {
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
    async byId(id) {
        const article = await this.articleModel
            .findOne({ _id: new mongoose_1.default.Types.ObjectId(id) })
            .exec();
        if (!article) {
            throw new common_1.BadRequestException(errors_constants_1.ARTICLE_NOT_FOUND_ERROR);
        }
        return article;
    }
    async createArticle(dto) {
        const newArticle = await new this.articleModel({
            title: dto.title,
            description: dto.description,
            image: dto.image,
        });
        newArticle.save();
        return newArticle;
    }
    async updateArticle(dto, id) {
        const article = await this.articleModel
            .findOne({ _id: new mongoose_1.default.Types.ObjectId(id) })
            .exec();
        if (!article) {
            throw new common_1.BadRequestException(errors_constants_1.ARTICLE_NOT_FOUND_ERROR);
        }
        article.title = dto.title;
        article.description = dto.description;
        article.image = dto.image;
        await article.save();
        return article;
    }
    async deleteArticle(id) {
        return this.articleModel
            .findOneAndDelete({ _id: new mongoose_1.default.Types.ObjectId(id) })
            .exec();
    }
    async getComments(id) {
        return this.articleModel
            .findOne({ _id: new mongoose_1.default.Types.ObjectId(id) })
            .populate('comments')
            .select('comments')
            .exec();
    }
    async createComment(id, dto) {
        const article = await this.articleModel.findOne({
            _id: new mongoose_1.default.Types.ObjectId(id),
        });
        if (!article) {
            throw new common_1.BadRequestException(errors_constants_1.ARTICLE_NOT_FOUND_ERROR);
        }
        const newComment = await new this.commentModel(dto);
        article.comments.push(newComment._id);
        await Promise.all([newComment.save(), article.save()]);
        return newComment;
    }
    async deleteComment(id, commentId) {
        return this.commentModel.findOneAndRemove({
            _id: new mongoose_1.default.Types.ObjectId(commentId),
        });
    }
};
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(article_schema_1.Article.name)),
    __param(1, (0, mongoose_2.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map