import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { IUser } from "../users/interfaces/user.interface";


@Injectable()
export class AuthService {

    constructor(private usersService:UsersService) {}

    async register(user:IUser) : Promise<IUser | undefined> {
       return await this.usersService.createUser(user)
    }

}