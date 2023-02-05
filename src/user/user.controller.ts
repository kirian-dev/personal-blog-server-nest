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
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Get } from '@nestjs/common/decorators';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';
import { Role } from 'src/common/enums/roles.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(Role.Admin)
  @Get()
  async getAllUsers(@Query('searchTerm') searchTerm: string) {
    return await this.userService.allUsers(searchTerm);
  }

  @Auth()
  @Get('profile/:id')
  async getProfile(@User('_id') _id: string) {
    return await this.userService.byId(_id);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Put('profile/:id')
  @HttpCode(200)
  async updateProfile(@User('_id') _id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.updateProfile(_id, dto);
  }

  @Auth(Role.Admin)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  async updateUser(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.userService.updateProfile(id, dto);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', IdValidationPipe) id: string) {
    return await this.userService.delete(id);
  }
}
