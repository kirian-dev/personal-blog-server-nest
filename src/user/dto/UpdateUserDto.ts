import { IsString } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  username: string;
  @IsString()
  email: string;
  password?: string;
  confirm_password: string;
  roles?: string[];
}
