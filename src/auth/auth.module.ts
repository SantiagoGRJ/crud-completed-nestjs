import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JWT_CONSTANTS } from "../config/constants";

@Module({
    imports: [UsersModule,
        JwtModule.register({
            global: true,
            secret: JWT_CONSTANTS.secret,
            signOptions: { expiresIn: '1h' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }