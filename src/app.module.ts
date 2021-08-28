import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AdminMiddleware } from "./admin.middleware";
import * as dotenv from "dotenv";
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(dotenv.config().parsed.MONGO_URL),
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .exclude({ path: "admin/send-invitation", method: RequestMethod.POST })
      .forRoutes("/admin");
  }
}
