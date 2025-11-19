import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { IUser } from "../users/interfaces/user.interface";
import { hashPassword } from "../utils/hash-password";


@Injectable()
export class AuthService {

    constructor(private usersService:UsersService) {}

    async register(user:IUser) : Promise<IUser | undefined> {

        const hashedPassword = await hashPassword(user.password)

        const createdUser = await this.usersService.createUser({
            ...user,
            password:hashedPassword
        })

       return createdUser
    }

}