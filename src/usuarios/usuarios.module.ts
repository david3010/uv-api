import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UsuariosController } from './usuarios.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule],
    providers: [UsuariosService],
    controllers: [UsuariosController]
})
export class UsuariosModule { }
