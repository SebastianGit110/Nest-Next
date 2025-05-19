import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    // const userCreated = await this.userRepository.save(newUser); // Asi yo ponga await va a retornar una Promise porque la funcion es async
    return this.userRepository.save(newUser); // Esto retorna algo asincrono y se puede poner aqui el async await o podria retornar la peticion a la bd y el controlador o funcion que lo use maneja lo async
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUser(id: number): Promise<User | null> {
    // this.userRepository.findBy(id); // Este busca por la columna identificador
    return this.userRepository.findOne({ where: { id } }); // Este busca por una columna
  }

  getUserByUser(user: {
    id?: number;
    username?: string;
    password?: string;
  }): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: user.id, username: user.username, password: user.password },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  deleteById(id: number) {
    // Elimina por una columna en este caso por id
    return this.userRepository.delete({ id }); // Retorna cuantas filas fueron afectadas
  }

  deleteByUser(user: { id: number; username: string; password: string }) {
    // Elimina segun las props del user
    return this.userRepository.delete({
      id: user.id,
      username: user.username,
      password: user.password,
    });
  }
}

// update con dos campos para validar
