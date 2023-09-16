import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Role } from "../entities/role.entity"
import { CreateRoleDto } from "./dto/create-role.dto"

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleModel: Repository<Role>) {}

  async create(dto: CreateRoleDto) {
    const role = await this.roleModel.create(dto)
    await this.roleModel.save(role)
    return role
  }

  async findByValue(value: string) {
    console.log(value)
    return await this.roleModel.findOneBy({ value: value })
  }
}
