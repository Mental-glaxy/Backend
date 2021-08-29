import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Headers,
} from "@nestjs/common";
// import * as dotenv from "dotenv";
import * as env from "../../config";
import { AuthService } from "./auth.service";
import { sign } from "jsonwebtoken";
import { LoginUserDto, LoginUserResponse } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserResponse> {
    const user_find = await this.authService.findUserByLogin(
      loginUserDto.login
    );
    const ispassword = bcrypt.compareSync(
      loginUserDto.password,
      user_find.password
    );
    if (ispassword === true) {
      const data: LoginUserDto = {
        login: user_find.login,
        password: user_find.password,
      };
      const user = await this.authService.findUser(data);
      if (user) {
        const token = sign({ _id: user.id }, env.vars[0].USERS_SECRET, {
          expiresIn: "90d",
        });
        await this.authService.setToken(data, token);
        return {
          token,
        };
      } else {
        throw new UnauthorizedException("Incorrect login or password");
      }
    } else {
      throw new UnauthorizedException("Invalid data");
    }
  }

  @Post("logout")
  async logout(@Headers("Auth-Token") token: string) {
    await this.authService.deleteToken(token);
    return {
      status: "Logout done",
    };
  }
}
