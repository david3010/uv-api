import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ConsultaUV } from './consulta.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(type => ConsultaUV, consulta => consulta.user_id)
  consultas: ConsultaUV[];
}