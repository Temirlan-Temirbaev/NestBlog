import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../entities/user.entity"
import { JwtModule } from "../jwt/jwt.module"
import { UserModule } from "../user/user.module"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"

@Module({
  imports: [UserModule, JwtModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
