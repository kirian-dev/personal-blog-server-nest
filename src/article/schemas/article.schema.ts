import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ArticleDocument = Article & Document;
@Schema()
export class Article {
  @Prop({
    type: Types.ObjectId,
    required: true,
    default: () => new Types.ObjectId(),
  })
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image: string;

  @Prop({ ref: 'Comment' })
  comments: Comment[];

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
