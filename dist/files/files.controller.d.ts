/// <reference types="multer" />
import { FilesService } from './files.service';
import { FileResponseDto } from './dto/file-response.dto';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File | undefined): Promise<FileResponseDto[]>;
}
