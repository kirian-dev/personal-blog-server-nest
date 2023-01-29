import { path } from 'app-root-path';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './mfile';
import { FileResponseDto } from './dto/file-response.dto';
@Injectable()
export class FilesService {
  async saveFiles(files: MFile[]): Promise<FileResponseDto[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;
    await ensureDir(uploadFolder);
    const res: FileResponseDto[] = [];
    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      res.push({
        url: `/uploads/${dateFolder}/${file.originalname}`,
        name: file.originalname,
      });
    }
    return res;
  }

  convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
