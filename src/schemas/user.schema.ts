import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  login: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  telephone: number;

  @Prop({ required: true })
  password: string;

  @Prop()
  token: string;

  @Prop({ required: true, default: [] })
  other_info: Array<any>;
  @Prop({ required: true, default: new Date() })
  date: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
