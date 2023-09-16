import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Observable } from "rxjs"
import { JwtService } from "../jwt/jwt.service"
import { Reflector } from "@nestjs/core"
import { ROLES_KEY } from "./role-auth.decorator"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest()

      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()])

      if (!requiredRoles) {
        return true
      }

      const authHeader = request.headers.authorization
      const bearer = authHeader.split(" ")[0]
      const token = authHeader.split(" ")[1]

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "User didn't authorize" })
      }
      const user = this.jwtService.verify(token)
      request.user = user
      console.log(requiredRoles.includes(user.role.value))
      return requiredRoles.includes(user.role.value)
    } catch (e) {
      throw new UnauthorizedException({ message: "User didn't authorize" })
    }
  }
}