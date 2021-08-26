import { Post, Body } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { PreRegUser } from "../schemas/pre-register-user.entity";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private _adminService: AdminService) {}
  @Post("create")
  async create(@Body() userData: PreRegUser): Promise<any> {
    return this._adminService.create(userData);
  }
}
