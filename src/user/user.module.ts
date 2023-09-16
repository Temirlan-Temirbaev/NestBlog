import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Role } from "../entities/role.entity"
import { User } from "../entities/user.entity"
import { JwtModule } from "../jwt/jwt.module"
import { RoleModule } from "../role/role.module"
import { UserService } from "./user.service"
import { UserController } from "./user.controller"

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), RoleModule, JwtModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
