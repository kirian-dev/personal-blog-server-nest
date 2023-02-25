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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const errors_constants_1 = require("../common/constants/errors.constants");
const bcryptjs_1 = require("bcryptjs");
const roles_enum_1 = require("../common/enums/roles.enum");
let UserService = class UserService {
    constructor(usersModel) {
        this.usersModel = usersModel;
    }
    async byId(_id) {
        const user = await this.usersModel
            .findOne({ _id: new mongoose_2.default.Types.ObjectId(_id) })
            .select('createdAt _id username email roles')
            .exec();
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user;
    }
    async allUsers(searchTerm) {
        try {
            let options = {};
            if (searchTerm) {
                options = {
                    $or: [
                        {
                            email: new RegExp(searchTerm, 'i'),
                        },
                    ],
                };
            }
            const users = await this.usersModel
                .find(options)
                .sort({
                createdAt: 'desc',
            })
                .exec();
            return users;
        }
        catch (err) {
            console.log(err);
        }
    }
    async updateProfile(_id, dto) {
        const user = await this.byId(_id);
        const isSameUser = await this.usersModel
            .findOne({ email: dto.email })
            .exec();
        if (isSameUser && String(_id) !== String(isSameUser._id)) {
            throw new common_1.NotFoundException(errors_constants_1.EMAIL_BUSY_ERROR);
        }
        if (dto.password) {
            console.log(dto.password, dto.confirm_password);
            if (dto.password !== dto.confirm_password) {
                throw new common_1.NotFoundException(errors_constants_1.PASSWORD_NOT_EQUAL_ERROR);
            }
            if (dto.password) {
                const salt = await (0, bcryptjs_1.genSalt)(10);
                const hashPassword = await (0, bcryptjs_1.hash)(dto.password, salt);
                user.password = hashPassword;
            }
        }
        user.email = dto.email;
        user.username = dto.username;
        if (dto.roles.includes(roles_enum_1.Role.Admin)) {
            user.roles = dto.roles;
        }
        await user.save();
        return user;
    }
    async delete(id) {
        return this.usersModel.findByIdAndDelete(id).exec();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map