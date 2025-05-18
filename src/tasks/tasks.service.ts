import { Injectable } from '@nestjs/common';
import { Task } from './interfaces/Task';
import { createTask } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  // Usamos interface porque no estamos usando data transfer objet solo es para decir que tipo es tasks
  tasks: Task[] = [
    {
      id: 1,
      title: 'Tarea 1',
      description: 'Descripcion tarea 1',
      done: false,
    },
    {
      id: 2,
      title: 'Tarea 2',
      description: 'Descripcion tarea 2',
      done: false,
    },
    {
      id: 3,
      title: 'Tarea 3',
      description: 'Descripcion tarea 3',
      done: false,
    },
  ];

  getTask(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  createTask(task: createTask): Task {
    const newTask = { ...task, id: this.tasks.length + 1 };
    this.tasks.push(newTask);
    return newTask;
  }
}
