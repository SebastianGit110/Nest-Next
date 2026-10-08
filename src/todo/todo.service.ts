import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { createTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todosRepository: Repository<Todo>,
  ) {}

  getTodos(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  createTodo(user: createTodoDto): Promise<Todo> {
    return this.todosRepository.save(this.todosRepository.create(user));
  }
}
