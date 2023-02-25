import mongoose, { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    _id: mongoose.Types.ObjectId | string;
    username: string;
    email: string;
    password: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const UsersSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
