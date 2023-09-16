import { Body, Controller, Post, Put } from "@nestjs/common"
import { BanUserDto } from "./dto/ban-user.dto"
import { CreateUserDto } from "./dto/create-user.dto"
import { UnbanUserDto } from "./dto/unban-user.dto"
import { UserService } from "./user.service"

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto)
  }

  @Put()
  banUser(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto)
  }

  @Put()
  unBanUser(@Body() dto: UnbanUserDto) {
    return this.userService.unBanUser(dto)
  }
}
