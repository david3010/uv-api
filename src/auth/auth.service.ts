import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/user.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    // Validar el password
    const validPassword = bcrypt.compareSync( pass, user.password );

    if (user && validPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: CreateUserDto) {
    const payload = { username: user.name, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}