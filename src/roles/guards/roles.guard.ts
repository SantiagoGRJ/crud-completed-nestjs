import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators/roles.decotator";
import { IRole } from "../interfaces/rol.interface";


@Injectable()
export class RolesAuth implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): Promise<boolean> | boolean {
        const roles = this.reflector.get(Roles, context.getHandler())
        if (!roles) {
            return false
        }
        const request = context.switchToHttp().getRequest()
        const user = request.user
        return this.matchRoles(roles, user.roles)
    }
    private matchRoles(roles: string[], userRoles: string[]) {
        return roles.some(role => userRoles.includes(role))
    }


}