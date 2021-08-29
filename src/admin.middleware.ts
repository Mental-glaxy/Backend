import { Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";
// import * as dotenv from "dotenv";
import * as env from "../config";
@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (
      req.headers.login == env.vars[3].ADMIN_LOGIN &&
      req.headers.password == env.vars[4].ADMIN_PASSWORD
    ) {
      console.log("Admin location");
      try {
        verify(req.headers.token, env.vars[4].ADMIN_SECRET);
      } catch (e) {
        res.send({ status: "Нет доступа к аккаунту" });
      }
      next();
    } else {
      res.send({ status: "Ошибка авторизации" });
    }
  }
}
