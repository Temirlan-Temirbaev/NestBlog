import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Role } from "../entities/role.entity"
import { User } from "../entities/user.entity"
import { BanUserDto } from "./dto/ban-user.dto"
import { CreateUserDto } from "./dto/create-user.dto"
import * as bcrypt from "bcrypt"
import { UnbanUserDto } from "./dto/unban-user.dto"

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userModel: Repository<User>, @InjectRepository(Role) private roleModel: Repository<Role>) {}

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 4)
    const user = await this.userModel.create({
      username: dto.username,
      password: hashedPassword,
    })
    const role = await this.roleModel.findOneBy({ value: "user" })
    user.role = role
    return await this.userModel.save(user)
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userModel.findOneBy({ id: dto.id })
    user.isBanned = true
    user.banReason = dto.banReason
    return await this.userModel.save(user)
  }

  async unBanUser(dto: UnbanUserDto) {
    const user = await this.userModel.findOneBy({ id: dto.id })
    user.isBanned = false
    user.banReason = ""
    return await this.userModel.save(user)
  }
}
