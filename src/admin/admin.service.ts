import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PreRegUser } from "src/schemas/pre-register-user.entity";
import { Repository, DeleteResult, UpdateResult } from "typeorm";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(PreRegUser)
    private readonly _userRepository: Repository<PreRegUser>
  ) {}
  async create(data: PreRegUser): Promise<PreRegUser> {
    return await this._userRepository.save(data);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this._userRepository.delete(id);
  }
  async findAll(): Promise<PreRegUser[]> {
    return await this._userRepository.find();
  }
  async findById(id: number): Promise<PreRegUser> {
    return await this._userRepository.findOne(id);
  }
  async update(user: PreRegUser): Promise<UpdateResult> {
    return await this._userRepository.update(user.Id, user);
  }
}
