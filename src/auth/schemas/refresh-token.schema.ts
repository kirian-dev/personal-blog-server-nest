import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  _id: mongoose.Types.ObjectId | string;
  refreshToken: string;

  @Prop({ ref: 'User' })
  user: mongoose.Types.ObjectId | string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
