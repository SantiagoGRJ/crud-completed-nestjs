import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { IUser } from "./interfaces/user.interface";

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async createUser(data:IUser) {
        try {
            const user = await this.prisma.user.create({data})
            return user
        } catch (err) {
            if(err?.code ==="P2002"){
                throw new ConflictException(`The ${err.meta?.target} is taken, try another different`)
            }
            throw new InternalServerErrorException('Create User Error')
        }
    }

    async getUserByEmail(email: string) {
        try {

            const user = await this.prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            return user
        } catch (err) {
            if (err?.code === "P2025") {
                throw new NotFoundException(`User not found, try again`)
            }
            throw new InternalServerErrorException('Searching method Error', err)
        }
    }

}