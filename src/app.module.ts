import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { UsuariosService } from './usuarios/usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConsultaUV } from './entities/consulta.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '45.13.135.205',
    port: 3306,
    username: 'u739213988_nestjs',
    password: 'Nestjsapi1',
    database: 'u739213988_nestjs',
    entities: [User, ConsultaUV],
    synchronize: true,
  }), UsuariosModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [UsuariosService, AuthService],
})
export class AppModule { }
