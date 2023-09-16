import { Injectable } from "@nestjs/common"
import { JwtService as JWTService } from "@nestjs/jwt"
import { User } from "../entities/user.entity"

@Injectable()
export class JwtService {
  constructor(private jwtService: JWTService) {}

  async generateToken(user: User) {
    const payload = { username: user.username, id: user.id }
    return {
      token: this.jwtService.sign(payload),
    }
  }
}
