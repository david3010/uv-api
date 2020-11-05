import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUserDto } from '../dto/user.dto';
import { User } from 'src/entities/user.entity';
import { ConsultasService } from '../consultas/consultas.service';
const bcrypt = require('bcryptjs');

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  async create(@Res() res, @Body() user: CreateUserDto) {

    try {
      const { email, password } = user;

      // verificar que el email no exista
      const existeEmail = await this.usuariosService.findByEmail(email);
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'El correo ya existe'
        });
      }

      const userModel: User = new User();
      userModel.name = user.name;
      userModel.password = user.password;
      userModel.email = user.email;

      // Encriptar contraseña
      const salt = bcrypt.genSaltSync();
      userModel.password = bcrypt.hashSync(password, salt);

      let userdb = await this.usuariosService.create(userModel)

      return res.status(200).json({
        ok: true,
        msg: `El usuario con email: ${userdb.email} se creo correctamente`
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
      });
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Get(':id/details')
  findOneWithDetails(@Param('id') id: number) {
    return this.usuariosService.findOneWithDetails(id);
  }

  @Put(':id')
  async update(@Body() user: CreateUserDto, @Param('id') id): Promise<string> {
    let userdb = await this.usuariosService.findOne(id);
    userdb.name = user.name;
    userdb.password = user.password;
    userdb.email = user.email;
    this.usuariosService.update(userdb);
    return `El usuario con id: ${id} se actualizo correctamente`;
  }

  @Delete(':id')
  delete(@Param() params): string {
    this.usuariosService.remove(params.id).catch(error => {
      console.log(error);
    })
    return `El usuario con id: ${params.id} se elimino correctamente`;
  }
}
