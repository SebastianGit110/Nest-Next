import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { createTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): Promise<Todo[]> {
    return this.todoService.getTodos();
  }

  @Post()
  createTodo(@Body() todo: createTodoDto): Promise<Todo> {
    return this.todoService.createTodo(todo);
  }
}
