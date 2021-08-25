import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  login: string;

  @Prop()
  email: string;

  @Prop({ required: true, unique: true })
  telephone: number;

  @Prop({ required: true })
  password: string;

  @Prop()
  token: string;

  @Prop({ required: true, default: [] })
  other_info: Array<any>;
}
export const UserSchema = SchemaFactory.createForClass(User);
