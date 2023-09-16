import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import * as bcrypt from "bcrypt"
import { User } from "../entities/user.entity"
import { JwtService } from "../jwt/jwt.service"
import { UserService } from "../user/user.service"
import { LoginDto } from "./dto/login.dto"
import { RegisterDto } from "./dto/register.dto"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userModel: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const candidate = await this.userModel.findOneBy({ username: dto.username })

    if (candidate) {
      throw new HttpException("User already registered", 421)
    }

    const user = await this.userService.createUser(dto)
    return this.jwtService.generateToken(user)
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOneBy({ username: dto.username })

    if (!user) {
      throw new HttpException("Wrong username or password", HttpStatus.NOT_FOUND)
    }
    const isValidPassword = await bcrypt.compare(dto.password, user.password)

    if (!isValidPassword) {
      throw new HttpException("Wrong password", HttpStatus.BAD_REQUEST)
    }

    return this.jwtService.generateToken(user)
  }
}
