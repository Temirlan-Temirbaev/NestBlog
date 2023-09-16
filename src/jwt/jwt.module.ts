import { Module } from "@nestjs/common"
import { JwtService } from "./jwt.service"
import { JwtModule as JWTModule } from "@nestjs/jwt"

@Module({
  imports: [
    JWTModule.register({
      secret: process.env.JWT_SECRET || "SECRET",
      signOptions: {
        expiresIn: "1d",
      },
    }),
  ],
  providers: [JwtService],
})
export class JwtModule {}
