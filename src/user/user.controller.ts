import { Body, Controller, Post, Put, UseGuards } from "@nestjs/common"
import { Roles } from "../role/role-auth.decorator"
import { RolesGuard } from "../role/role.guard"
import { BanUserDto } from "./dto/ban-user.dto"
import { CreateUserDto } from "./dto/create-user.dto"
import { UnbanUserDto } from "./dto/unban-user.dto"
import { UserService } from "./user.service"

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Roles("admin")
  @UseGuards(RolesGuard)
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto)
  }

  @Put("ban")
  banUser(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto)
  }

  @Put("unban")
  unBanUser(@Body() dto: UnbanUserDto) {
    return this.userService.unBanUser(dto)
  }
}
