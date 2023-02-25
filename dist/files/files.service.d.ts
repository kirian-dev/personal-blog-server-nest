/// <reference types="node" />
import { MFile } from './mfile';
import { FileResponseDto } from './dto/file-response.dto';
export declare class FilesService {
    saveFiles(files: MFile[]): Promise<FileResponseDto[]>;
    convertToWebP(file: Buffer): Promise<Buffer>;
}
