import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { join } from "path";
import { PreRegUser } from "src/schemas/pre-register-user.entity";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";

@Module({
  imports: [
    TypeOrmModule.forFeature([PreRegUser]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: join(__dirname, "..", "..", "data", "db.sqlite"),
      entities: [PreRegUser],
      synchronize: true,
      logging: false,
    }),
  ],
  providers: [AdminService, AuthService],
  controllers: [AdminController],
})
export class AdminModule {}
