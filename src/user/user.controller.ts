import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/UpdateUserDto';
import {
  Controller,
  Put,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Get } from '@nestjs/common/decorators';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(@Query('searchTerm') searchTerm: string) {
    return await this.userService.allUsers(searchTerm);
  }

  @Get('profile')
  async getProfile(@User('_id') _id: string) {
    return await this.userService.byId(_id);
  }

  @UsePipes(new ValidationPipe())
  @Put('profile')
  @HttpCode(200)
  @Auth()
  async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.updateProfile(_id, dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth()
  async updateUser(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.userService.updateProfile(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth()
  async deleteUser(@Param('id', IdValidationPipe) id: string) {
    return await this.userService.delete(id);
  }
}
