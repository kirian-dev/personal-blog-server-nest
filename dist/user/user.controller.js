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
exports.UserController = void 0;
const UpdateUserDto_1 = require("./dto/UpdateUserDto");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const decorators_1 = require("@nestjs/common/decorators");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const user_decorator_1 = require("./decorators/user.decorator");
const id_validation_pipe_1 = require("../common/pipes/id-validation.pipe");
const roles_enum_1 = require("../common/enums/roles.enum");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAllUsers(searchTerm) {
        return await this.userService.allUsers(searchTerm);
    }
    async getProfile(_id) {
        return await this.userService.byId(_id);
    }
    async updateProfile(_id, dto) {
        return await this.userService.updateProfile(_id, dto);
    }
    async updateUser(id, dto) {
        return await this.userService.updateProfile(id, dto);
    }
    async deleteUser(id) {
        return await this.userService.delete(id);
    }
};
__decorate([
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.Admin),
    (0, decorators_1.Get)(),
    __param(0, (0, common_1.Query)('searchTerm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, decorators_1.Get)('profile/:id'),
    __param(0, (0, user_decorator_1.User)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)('profile/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateUserDto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.Admin),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateUserDto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map