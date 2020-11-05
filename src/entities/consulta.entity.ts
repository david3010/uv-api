import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Grado {
    BAJO = "bajo",
    MODERADO = "moderado",
    ALTO = "alto",
    MUY_ALTO = "muy alto"
}

@Entity()
export class ConsultaUV {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uv_index: number;

    @Column({
        type: "enum",
        enum: Grado,
        default: Grado.BAJO
    })
    role: Grado;

    @Column()
    date: Date;

    @Column()
    user_id:number
}