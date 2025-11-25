import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";


@Injectable()
export class RolesAuth implements CanActivate {
    canActivate(context:ExecutionContext) : Promise<boolean> | boolean {
        return false
    }
}