import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Res() res, @Body() user: CreateUserDto) {
        const { email, password } = user;
        const userdb = await this.authService.validateUser(email, password);
        const accestoken =  (await this.authService.login(user)).access_token;
        if (userdb) {
            return res.status(404).json({
                ok: true,
                userid: userdb.id,
                token: accestoken,
                msg: 'Ok!'
            });
        }

        return res.status(404).json({
            ok: false,
            token: null,
            msg: 'El usuario o la contraseña no son validos'
        });
    }
}
