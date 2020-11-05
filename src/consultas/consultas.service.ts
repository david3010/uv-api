import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultaUV } from '../entities/consulta.entity';

@Injectable()
export class ConsultasService {
    constructor(
        @InjectRepository(ConsultaUV)
        private consultasRepository: Repository<ConsultaUV>,
    ) { }

    async findAll(): Promise<ConsultaUV[]> {
        return this.consultasRepository.find();
    }

    async findByUserCreator(id): Promise<ConsultaUV[]> {
        return this.consultasRepository.find({ user_id: id });
    }

    async create(consulta: ConsultaUV): Promise<ConsultaUV> {
        return this.consultasRepository.save(consulta);
    }
}
