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
exports.AuthService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("../user/schemas/user.schema");
const errors_constants_1 = require("../common/constants/errors.constants");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signup(dto) {
        const existingUser = await this.userModel.findOne({
            email: dto.email,
        });
        if (existingUser) {
            throw new common_1.BadRequestException(errors_constants_1.USER_ALREADY_EXISTS_ERROR);
        }
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const hashedPassword = await (0, bcryptjs_1.hash)(dto.password, salt);
        const newUser = new this.userModel({
            username: dto.username,
            email: dto.email,
            password: hashedPassword,
        });
        await newUser.save();
        const tokens = await this.createTokens(String(newUser._id));
        return Object.assign({ user: this.returnUserFields(newUser) }, tokens);
    }
    async signin(dto) {
        const user = await this.validateUser(dto);
        const tokens = await this.createTokens(String(user._id));
        return Object.assign({ user: this.returnUserFields(user) }, tokens);
    }
    async validateUser(dto) {
        const equalPasswords = dto.password === dto.confirm_password;
        if (!equalPasswords) {
            throw new common_1.BadRequestException(errors_constants_1.PASSWORD_NOT_EQUAL_ERROR);
        }
        const user = await this.userModel.findOne({ email: dto.email }).exec();
        if (!user) {
            throw new common_1.BadRequestException(errors_constants_1.WRONG_PASSWORDS_ERROR);
        }
        const isValidPassword = await (0, bcryptjs_1.compare)(dto.password, user.password);
        if (!isValidPassword) {
            throw new common_1.BadRequestException(errors_constants_1.WRONG_PASSWORDS_ERROR);
        }
        return user;
    }
    async createTokens(userId) {
        const data = { _id: userId };
        const refreshToken = await this.jwtService.signAsync(data, {
            expiresIn: '30d',
        });
        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: '15m',
        });
        return { refreshToken, accessToken };
    }
    async getNewTokens(refreshToken) {
        if (!refreshToken)
            throw new common_1.UnauthorizedException();
        const token = refreshToken.refreshToken;
        const result = await this.jwtService.verifyAsync(token);
        if (!result)
            throw new common_1.UnauthorizedException(errors_constants_1.INVALID_TOKEN_ERROR);
        const user = await this.userModel.findById(result._id).exec();
        const tokens = await this.createTokens(String(user._id));
        return Object.assign({ user: this.returnUserFields(user) }, tokens);
    }
    returnUserFields(user) {
        return {
            _id: user._id,
            email: user.email,
            roles: user.roles,
            username: user.username,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map