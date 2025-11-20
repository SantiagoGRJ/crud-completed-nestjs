import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() user:CreateUserDto) {
        return await this.authService.register(user)
    }

    @Post('login')
    async logIn(@Body() user:{email:string,password:string}){
        return await this.authService.authenticate(user)
    }

}