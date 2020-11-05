import { Grado } from 'src/entities/consulta.entity';
import { User } from 'src/entities/user.entity';

export class ConsultaUVDto {
    id: number;
    uv_index: number;
    role: Grado;
    date: Date;
    user_id:number;
    user:User;
}