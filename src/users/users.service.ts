import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(user: CreateUserDto): Promise<User | HttpException> {
    // Tiene que ser await para que espere a traer el user (si existe) de lo contrarioo siempre va a entrar al if porque userFound sin await es un obj de promesa entonces es algo, seria true
    const userFound = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (userFound)
      return new HttpException('User already exists', HttpStatus.CONFLICT);

    const newUser = this.userRepository.create(user);
    // const userCreated = await this.userRepository.save(newUser); // Asi yo ponga await va a retornar una Promise porque la funcion es async
    return this.userRepository.save(newUser); // Esto retorna algo asincrono y se puede poner aqui el async await o podria retornar la peticion a la bd y el controlador o funcion que lo use maneja lo async
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(id: number): Promise<User | HttpException | null> {
    const userFound = await this.userRepository.findOne({ where: { id } });

    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);

    // this.userRepository.findBy(id); // Este busca por la columna identificador
    return userFound; // Este busca por una columna
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

  async update(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({ where: { id } });

    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);

    // Con assign
    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);

    // return this.userRepository.update({ id }, user);
  }

  updateByUsername(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(
      { id, username: updateUserDto.username },
      updateUserDto,
    );
  }

  async deleteById(id: number) {
    // Una forma
    // const userFound = await this.userRepository.findOne({ where: { id } });

    // if (!userFound)
    //   return new HttpException('User not found', HttpStatus.NOT_FOUND);
    // // Elimina por una columna en este caso por id
    // return this.userRepository.delete({ id }); // Retorna cuantas filas fueron afectadas

    // Como delete retorna las filas afectadas, lo vamos a usar
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
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
