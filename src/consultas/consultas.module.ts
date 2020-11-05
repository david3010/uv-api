import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultaUV } from '../entities/consulta.entity';
import { ConsultasService } from './consultas.service';

@Module({
    imports: [TypeOrmModule.forFeature([ConsultaUV])],
    exports: [TypeOrmModule],
    providers: [ConsultasService]
})
export class ConsultasModule {}
