import { Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { User, UserDocument } from "../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser(registerUserDto: RegisterUserDto): Promise<UserDocument> {
    const password = bcrypt.hashSync(registerUserDto.password, 10);
    const data = {
      login: registerUserDto.login,
      email: registerUserDto.email,
      password: password,
    };
    const newUser = new this.userModel(data);
    return newUser.save();
  }
  findUser(loginUserDto: LoginUserDto): Promise<UserDocument> {
    return this.userModel.findOne(loginUserDto).exec();
  }
  findUserByLogin(login: string): Promise<UserDocument> {
    return this.userModel.findOne({ login: login }).exec();
  }
  setToken(loginUserDto: LoginUserDto, token: string) {
    return this.userModel.findOneAndUpdate(loginUserDto, { token: token });
  }
  deleteToken(token: string) {
    return this.userModel.findOneAndUpdate({ token }, { token: null });
  }
}
