import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Role } from "./entities/role.entity"
import { User } from "./entities/user.entity"
import { AuthModule } from "./auth/auth.module"
import { RoleModule } from "./role/role.module"
import { JwtModule } from "./jwt/jwt.module"
import { UserModule } from "./user/user.module"

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Role],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    JwtModule,
    RoleModule,
  ],
})
export class AppModule {}
