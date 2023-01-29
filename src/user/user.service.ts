import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UpdateUserDto } from './dto/UpdateUserDto';
import {
  EMAIL_BUSY_ERROR,
  PASSWORD_NOT_EQUAL_ERROR,
} from 'src/common/constants/errors.constants';
import { genSalt, hash } from 'bcryptjs';
import { Role } from 'src/common/enums/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  async byId(_id: string) {
    const user = await this.usersModel
      .findById({ _id })
      .select('createdAt _id username email roles')
      .exec();

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async allUsers(searchTerm?: string): Promise<User[]> {
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
    } catch (err) {
      console.log(err);
    }
  }

  async updateProfile(_id: string, dto: UpdateUserDto) {
    const user = await this.byId(_id);
    const isSameUser = await this.usersModel
      .findOne({ email: dto.email })
      .exec();

    if (isSameUser && String(_id) !== String(isSameUser._id)) {
      throw new NotFoundException(EMAIL_BUSY_ERROR);
    }

    if (dto.password !== dto.confirm_password) {
      throw new NotFoundException(PASSWORD_NOT_EQUAL_ERROR);
    }

    if (dto.password) {
      const salt = await genSalt(10);
      const hashPassword = await hash(dto.password, salt);
      user.password = hashPassword;
    }

    user.email = dto.email;
    user.username = dto.username;
    if (dto.roles.includes(Role.Admin)) {
      user.roles = dto.roles;
    }

    await user.save();

    return;
  }

  async delete(id: string) {
    return this.usersModel.findByIdAndDelete(id).exec();
  }
}
