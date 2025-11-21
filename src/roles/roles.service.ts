import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { IRole } from "./interfaces/rol.interface";

@Injectable()
export class RolesService {

    constructor(private prismaService: PrismaService) { }

    async createRole(input: { name: string }) : Promise<IRole> {
        try {
            const role = await this.prismaService.role.create({ data: input })

            return role
        } catch (err) {
            if (err?.code == "P2002") {
                throw new ConflictException(`The ${err.meta?.target} is taken, try another different`)
            }
            throw new InternalServerErrorException('Create role Error')
        }
    }
}