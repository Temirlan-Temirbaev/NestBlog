import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { CreateRoleDto } from "./dto/create-role.dto"
import { RoleService } from "./role.service"

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto)
  }

  @Get(":value")
  getByValue(@Param("value") value: string) {
    return this.roleService.findByValue(value)
  }
}
