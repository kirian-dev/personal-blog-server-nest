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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const files_service_1 = require("./files.service");
const mfile_1 = require("./mfile");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const roles_enum_1 = require("../common/enums/roles.enum");
const errors_constants_1 = require("./../common/constants/errors.constants");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async uploadFile(file) {
        if (!file) {
            throw new common_1.BadRequestException(errors_constants_1.FILE_REQUIRED_ERROR);
        }
        const saveArray = [new mfile_1.MFile(file)];
        if (file.mimetype.includes('image')) {
            const buffer = await this.filesService.convertToWebP(file.buffer);
            saveArray.push(new mfile_1.MFile({
                originalname: `${file.originalname.split('.')[0]}.webp`,
                buffer,
            }));
        }
        return this.filesService.saveFiles(saveArray);
    }
};
__decorate([
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.Admin),
    (0, common_1.Post)('upload'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadFile", null);
FilesController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map