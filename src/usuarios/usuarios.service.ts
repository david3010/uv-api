import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { ConsultaUV } from 'src/entities/consulta.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async findOneWithDetails(id: number):Promise<User> {
    return await this.usersRepository.createQueryBuilder("user")
    .leftJoinAndSelect("user.consultas","consulta_uv")
    .where("user.id = :id", { id: id })
    .getOne();
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async create(user: User) {
    return await this.usersRepository.save(user);
  }

  async update(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}