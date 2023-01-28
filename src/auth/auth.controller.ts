import { CreateUserDto } from './dto/create-user.dto';
import {
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('/signin')
  @HttpCode(200)
  async signin(@Body() dto: LoginUserDto) {
    return this.authService.signin(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('/signin/access-token')
  @HttpCode(200)
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto);
  }

  // @Post('/logout')
  // signin() {
  //   this.authService.logout();
  // }
}
