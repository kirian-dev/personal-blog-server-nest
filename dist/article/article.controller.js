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
exports.ArticleController = void 0;
const update_article_dto_1 = require("./dto/update-article.dto");
const create_article_dto_1 = require("./dto/create-article.dto");
const roles_enum_1 = require("./../common/enums/roles.enum");
const decorators_1 = require("@nestjs/common/decorators");
const common_1 = require("@nestjs/common");
const article_service_1 = require("./article.service");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const id_validation_pipe_1 = require("../common/pipes/id-validation.pipe");
const create_comment_dto_1 = require("./dto/create-comment.dto");
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    async getArticles(page = 1, limit = 5, searchTerm = '') {
        return this.articleService.allArticles(page, limit, searchTerm);
    }
    async getArticle(id) {
        return this.articleService.byId(id);
    }
    async createArticle(dto) {
        return this.articleService.createArticle(dto);
    }
    async updateArticle(dto, id) {
        return this.articleService.updateArticle(dto, id);
    }
    async deleteArticle(id) {
        return this.articleService.deleteArticle(id);
    }
    async getComments(id) {
        return this.articleService.getComments(id);
    }
    async createComment(id, dto) {
        return this.articleService.createComment(id, dto);
    }
    async deleteComment(id, commentId) {
        return this.articleService.deleteComment(id, commentId);
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, decorators_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('searchTerm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticles", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, decorators_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticle", null);
__decorate([
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.Admin),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "createArticle", null);
__decorate([
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.Admin),
    (0, common_1.Put)(':id'),
    (0, decorators_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_article_dto_1.UpdateArticleDto, String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "updateArticle", null);
__decorate([
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.Admin),
    (0, common_1.Delete)(':id'),
    (0, decorators_1.HttpCode)(204),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "deleteArticle", null);
__decorate([
    (0, decorators_1.Get)(':id/comments'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getComments", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)(':id/comments'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "createComment", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Delete)(':id/comments/:commentId'),
    (0, decorators_1.HttpCode)(204),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Param)('commentId', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "deleteComment", null);
ArticleController = __decorate([
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.controller.js.map