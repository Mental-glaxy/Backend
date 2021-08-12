import {
  Body,
  Controller,
  Post,
  ConflictException,
  UnauthorizedException,
  Headers,
} from "@nestjs/common";
import { secret } from "src/app.secret";
import { AuthService } from "./auth.service";
import { RegisterUserDto, RegisterUserResponse } from "./dto/register-user.dto";
import { sign } from "jsonwebtoken";
import { LoginUserDto, LoginUserResponse } from "./dto/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body() createUserDto: RegisterUserDto
  ): Promise<RegisterUserResponse> {
    try {
      const user = await this.authService.createUser(createUserDto);
      const token = sign({ _id: user.id }, secret, { expiresIn: "90d" });
      await this.authService.setToken(
        { login: user.login, password: user.password },
        token
      );
      return {
        token,
        login: user.login,
        email: user.email,
      };
    } catch (e) {
      if (e.code == 11000) {
        throw new ConflictException("Email, phone or login is already used");
      } else {
        return e;
      }
    }
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserResponse> {
    const user = await this.authService.findUser(loginUserDto);
    if (user) {
      const token = sign({ _id: user.id }, secret, { expiresIn: "90d" });
      await this.authService.setToken(loginUserDto, token);
      return {
        token,
      };
    } else {
      throw new UnauthorizedException("Incorrect login or password");
    }
  }

  @Post("logout")
  async logout(@Headers("Auth-Token") token: string) {
    await this.authService.deleteToken(token);
  }
}