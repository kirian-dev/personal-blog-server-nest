import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare, genSalt } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import {
  USER_ALREADY_EXISTS_ERROR,
  WRONG_PASSWORDS_ERROR,
  PASSWORD_NOT_EQUAL_ERROR,
  INVALID_TOKEN_ERROR,
} from 'src/common/constants/errors.constants';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: dto.email,
    });

    if (existingUser) {
      throw new BadRequestException(USER_ALREADY_EXISTS_ERROR);
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(dto.password, salt);
    const newUser = new this.userModel({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });
    await newUser.save();

    const tokens = await this.createTokens(String(newUser._id));

    return { user: this.returnUserFields(newUser), ...tokens };
  }

  async signin(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.createTokens(String(user._id));
    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async validateUser(dto: LoginUserDto) {
    const equalPasswords = dto.password === dto.confirm_password;

    if (!equalPasswords) {
      throw new BadRequestException(PASSWORD_NOT_EQUAL_ERROR);
    }

    const user = await this.userModel.findOne({ email: dto.email }).exec();

    if (!user) {
      throw new BadRequestException(WRONG_PASSWORDS_ERROR);
    }

    const isValidPassword = await compare(dto.password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException(WRONG_PASSWORDS_ERROR);
    }
    return user;
  }

  async createTokens(userId: string) {
    const data = { _id: userId };
    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '30d',
    });
    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '15m',
    });

    return { refreshToken, accessToken };
  }

  async getNewTokens(refreshToken: RefreshTokenDto) {
    if (!refreshToken) throw new UnauthorizedException();

    const token = refreshToken.refreshToken;
    const result = await this.jwtService.verifyAsync(token);

    if (!result) throw new UnauthorizedException(INVALID_TOKEN_ERROR);

    const user = await this.userModel.findById(result._id).exec();

    const tokens = await this.createTokens(String(user._id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }
  returnUserFields(user: Omit<User, 'password'>) {
    return {
      _id: user._id,
      email: user.email,
      roles: user.roles,
      username: user.username,
    };
  }

  // async logout() {}

  // async refreshTokens() {}
}
