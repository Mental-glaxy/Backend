import { Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import * as dotenv from "dotenv";

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const result = dotenv.config();
    if (
      req.headers.login == result.parsed.ADMIN_LOGIN &&
      req.headers.password == result.parsed.ADMIN_PASSWORD
    ) {
      console.log("Admin location");
      try {
        verify(req.headers.token, result.parsed.ADMIN_SECRET);
      } catch (e) {
        res.send({ status: "Нет доступа к аккаунту" });
      }
      next();
    } else {
      res.send({ status: "Ошибка авторизации" });
    }
  }
}
