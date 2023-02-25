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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    signup(dto: CreateUserDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: {
            _id: string | import("mongoose").Types.ObjectId;
            email: string;
            roles: string[];
            username: string;
        };
    }>;
    signin(dto: LoginUserDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: {
            _id: string | import("mongoose").Types.ObjectId;
            email: string;
            roles: string[];
            username: string;
        };
    }>;
    validateUser(dto: LoginUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createTokens(userId: string): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
    getNewTokens(refreshToken: RefreshTokenDto): Promise<{
        refreshToken: string;
        accessToken: string;
        user: {
            _id: string | import("mongoose").Types.ObjectId;
            email: string;
            roles: string[];
            username: string;
        };
    }>;
    returnUserFields(user: Omit<User, 'password'>): {
        _id: string | import("mongoose").Types.ObjectId;
        email: string;
        roles: string[];
        username: string;
    };
}
