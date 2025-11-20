import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { IUser } from "../users/interfaces/user.interface";
import { hashPassword } from "../utils/hash-password";
import { JwtService } from "@nestjs/jwt";
import { isMatch } from "../utils/compare-password";

type AuthInput = { email: string, password: string }
type SignInData = { userId: number, username: string }
type AuthResult = { accessToken: string, userId: number, username: string }

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async register(user: IUser): Promise<IUser | undefined> {

        const hashedPassword = await hashPassword(user.password)

        const createdUser = await this.usersService.createUser({
            ...user,
            password: hashedPassword
        })

        return createdUser
    }

    async authenticate(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateUser(input)

        if (!user) {
            throw new UnauthorizedException()
        }
        return this.signIn(user)
    }

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.usersService.getUserByEmail(input.email);
        if (!user) return null;

        const isMatched = await isMatch(input.password, user.password);
        if (!isMatched) return null;

        return {
            userId: user.id,
            username: user.username,
        };
    }

    async signIn(user: SignInData): Promise<AuthResult> {

        const payLoad = {
            sub: user.userId,
            username: user.username
        }

        const accessToken = await this.jwtService.signAsync(payLoad)

        return { accessToken: accessToken, userId: user.userId, username: user.username }

    }




}