import { IsString, MaxLength, MinLength } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  @MaxLength(5000)
  description: string;
  image?: string;
}
