import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConsultaUVDto } from 'src/dto/consulta.dto';
import { ConsultaUV, Grado } from 'src/entities/consulta.entity';
import { ConsultasService } from './consultas.service';

@Controller('consultas')
export class ConsultasController {
    constructor(private readonly consultasService: ConsultasService){ }

    @Get()
    async getConsultas(){
        return this.consultasService.findAll();
    }

    @Get(':id')
    async getConsultasByOwner(@Param('id') id){
        return this.consultasService.findByUserCreator(id);
    }

    @Post()
    async createConsulta(@Body() consulta:ConsultaUVDto): Promise<ConsultaUV>{
        return await this.consultasService.create(consulta);
    }
}
