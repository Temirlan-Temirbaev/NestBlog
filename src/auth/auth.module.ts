import { Module } from "@nestjs/common"
import { JwtModule } from "../jwt/jwt.module"
import { UserModule } from "../user/user.module"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"

@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
