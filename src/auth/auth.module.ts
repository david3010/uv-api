import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { UsuariosService } from '../usuarios/usuarios.service';

@Module({
  imports: [UsuariosModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),],
  providers: [AuthService, UsuariosService],
  exports: [AuthService, JwtModule],
  controllers: [AuthController]
})
export class AuthModule { }
