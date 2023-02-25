import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UpdateUserDto } from './dto/UpdateUserDto';
export declare class UserService {
    private usersModel;
    constructor(usersModel: Model<UserDocument>);
    byId(_id: string): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    allUsers(searchTerm?: string): Promise<User[]>;
    updateProfile(_id: string, dto: UpdateUserDto): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    delete(id: string): Promise<User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
}
