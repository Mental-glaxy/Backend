import { Post, Body, ConflictException, Get } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { PreRegUser } from "../schemas/pre-register-user.entity";
import { AdminService } from "./admin.service";
import { AuthService } from "src/auth/auth.service";
import { secret } from "src/app.secret";
import { sign } from "jsonwebtoken";

@Controller("admin")
export class AdminController {
  constructor(
    private _adminService: AdminService,
    private _authService: AuthService
  ) {}
  @Post("send-invitation")
  async create(@Body() userData: PreRegUser): Promise<any> {
    return await this._adminService.create(userData);
  }
  @Get("prereg-users")
  async getInfo(): Promise<PreRegUser[]> {
    return await this._adminService.findAll();
  }
  @Post("accept-user")
  async accept(@Body() id: number): Promise<any> {
    const user = await this._adminService.findById(id);
    console.log(user);
    const data = {
      login: null,
      email: user.Email,
      telephone: user.Telephone,
      password: user.Password,
    };
    console.log(data);
    try {
      const result = await this._authService.createUser(data);
      const token = sign({ _id: result.id }, secret, { expiresIn: "90d" });
      await this._adminService.delete(id);
      await this._authService.setToken(
        { login: result.login, password: result.password },
        token
      );
      return {
        status: "Пользователь зарегистрирован",
      };
    } catch (e) {
      if (e.code == 11000) {
        throw new ConflictException("Dublicte user error");
      } else {
        return e;
      }
    }
  }
}
