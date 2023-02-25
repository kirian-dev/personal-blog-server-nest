import { User as UserModel } from '../schemas/user.schema';
export type TypeData = keyof UserModel;
export declare const User: (...dataOrPipes: (keyof UserModel | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
