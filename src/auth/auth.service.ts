import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser(registerUserDto: RegisterUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(registerUserDto);
    return newUser.save();
  }
  findUser(loginUserDto: LoginUserDto): Promise<UserDocument> {
    return this.userModel.findOne(loginUserDto).exec();
  }
  setToken(loginUserDto: LoginUserDto, token: string) {
    return this.userModel.findOneAndUpdate(loginUserDto, { token });
  }
  deleteToken(token: string) {
    return this.userModel.findOneAndUpdate({ token }, { token: null });
  }
}
