import { IsString, Max } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  @Max(255)
  title: string;

  @IsString()
  @Max(5000)
  description: string;
  image?: string;
}
