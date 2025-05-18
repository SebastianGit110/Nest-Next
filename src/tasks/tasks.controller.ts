import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createTask } from './dto/create-task.dto';
import { Request, Response } from 'express';
import { Task } from './interfaces/Task';
import { TasksService } from './tasks.service';
import {
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

// Con nest generate co tasks se crea el contronller y se agrega a los controllers del module
//  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned (undefined para volver a lo normal)

// @UsePipes(new ValidationPipe()) // A nivel de método
@ApiTags('Tareas')
@Controller('tasks') // Este 'Tasks' se pone automatico en swagger
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // interface solo para tipado en tiempo de desarrollo, para validación con class-validator una clase dto

  @ApiTags('Tareas/Hello')
  @ApiOperation({ summary: 'Retorna objeto hello: world' })
  @ApiResponse({ status: 200, description: 'Retorno correcto' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiSecurity('ApiKeyAuth')
  @Get()
  getTasks(): { hello: string } {
    return { hello: 'world' };
  }
  //   Alternativa a hacerlo como express (por detras corre express entonces se puede) pero es preferible hacerlo como dice nest
  //   getTask(@Req() req: Request, @Res() res: Response): Response {
  //     return res.send('Hola Mundo'); // Sin el return se puede pero en el tipo de regrese tocaria quitarlo porque no esta regresando nada solo haciendo un res.send
  //   }

  @Get('getTask/:id')
  getTask(@Param('id', ParseIntPipe) id: number): Task | undefined {
    return this.tasksService.getTask(id); // o sin usar ParseIntPipe seria @Param('id') id: string porque naturalmente viene como string y despues hacer .getTask(parseInt(id));
  }

  @Get('getTasks')
  getAllTasks(): Task[] {
    return this.tasksService.getTasks();
  }

  // @UsePipes(new ValidationPipe()) // Asi tambien funciona a nivel de metodo
  // Headers: Content-Type - application/json
  @Post('postTask')
  createTask(@Body() task: createTask): Task {
    // @Body(new ValidationPipe()) le dice que verifique las validaciones especificadas en la clase dto createTask a nivel de campo
    // El ValidationPipe se puede hacer a nivel de campo, de metodo, de controlador y global en el main
    // task es dto porque es un obj que transporta datos entre client y server, es util tambien poner el dto porque ayuda en desarrollo a ver sus props
    console.log(task, task.title, task.description, task.done);
    return this.tasksService.createTask(task);
  }

  // El id llega como string y para convertirlo a number hay dos opciones
  // 1. usar @Param('id', ParseIntPipe) donde ParseIntPipe lo convierete a int y si no se puede lanza error. Con el validate con transform en true le dice como cambiar el tipo de dato segun aqui como uno le diga id: number
  // 2. convirtiendo el id a int manualmente con parseInt(id)
  @Put(':id')
  updatindTask(@Param('id') id: number, @Body() task: createTask): string {
    console.log(task);
    console.log(typeof id, id);
    return `Updating a task number ${id}`;
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): string {
    console.log(id);
    return `Deleting a task number ${id}`;
  }
}
