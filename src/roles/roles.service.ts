import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { IRole } from "./interfaces/rol.interface";

@Injectable()
export class RolesService {

    constructor(private prismaService: PrismaService) { }

    async getRoleById(id: number) {
        try {
            const roles = await this.prismaService.role.findUnique({
                where: {
                    id: id
                }
            })
            return roles
        } catch (err) {
            if (err?.code == "P2025") {
                throw new NotFoundException(`Role not found, try again`)
            }
            throw new InternalServerErrorException()
        }
    }

    async createRole(input: { name: string }): Promise<IRole> {
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