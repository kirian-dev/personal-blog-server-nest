import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { MFile } from './mfile';
import { FileResponseDto } from './dto/file-response.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { FILE_REQUIRED_ERROR } from './../common/constants/errors.constants';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Auth(Role.Admin)
  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File | undefined,
  ): Promise<FileResponseDto[]> {
    if (!file) {
      throw new BadRequestException(FILE_REQUIRED_ERROR);
    }
    const saveArray: MFile[] = [new MFile(file)];
    if (file.mimetype.includes('image')) {
      const buffer = await this.filesService.convertToWebP(file.buffer);
      saveArray.push(
        new MFile({
          originalname: `${file.originalname.split('.')[0]}.webp`,
          buffer,
        }),
      );
    }
    return this.filesService.saveFiles(saveArray);
  }
}
