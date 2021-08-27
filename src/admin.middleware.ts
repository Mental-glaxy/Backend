import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log("Admin location", req.headers);
    next();
  }
}