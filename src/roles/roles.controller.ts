import { Body, Controller, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";

@Controller('roles')
export class RolesController {

    constructor(private rolesService:RolesService){}

    @Post('new')
    async createRole(@Body() role:{name:string}){
        return this.rolesService.createRole(role)
    }

}