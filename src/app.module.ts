import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfig } from './config/mongo.config';
import config from './config/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ArticleController } from './article/article.controller';
import { ArticleModule } from './article/article.module';
import { FilesModule } from './files/file.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfig,
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    FilesModule,
  ],
  controllers: [ArticleController],
})
export class AppModule {}
