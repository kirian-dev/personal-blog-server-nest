import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
export declare class MongooseConfig implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions;
}
