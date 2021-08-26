import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { join } from "path";
import { PreRegUser } from "src/schemas/pre-register-user.entity";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([PreRegUser]),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: join(__dirname, "..", "..", "data", "db.sqlite"),
      entities: [PreRegUser],
      synchronize: true,
      logging: true,
    }),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
