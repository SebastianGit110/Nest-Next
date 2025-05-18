import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ValidateUserPipe } from './pipes/validate-user/validate-user.pipe';
import { AuthGuard } from './guards/auth/auth.guard';
import { createTask } from 'src/tasks/dto/create-task.dto';

@Controller()
export class HelloController {
  @Get()
  sayHello() {
    return 'hello';
  }

  @Get('new')
  @HttpCode(201)
  somethingNew() {
    return 'Something new';
  }

  @Get('notFound')
  @HttpCode(404)
  notFoundPage() {
    return '404 not found';
  }

  @Get('error')
  @HttpCode(500)
  errorPage() {
    return 'error page';
  }

  // Pipe es una funcion que recibe algo y lo retorna alterado
  // Aqui el num del param llega como string y si lo quiero como int usar ParseIntPipe
  @Get('ticket/:num')
  getNum(@Param('num', ParseIntPipe) num: number) {
    console.log(typeof num);
    return num + 10;
  }

  @UseGuards(AuthGuard)
  @Get('active/:status')
  isUserActive(@Param('status', ParseBoolPipe) status: boolean) {
    console.log(typeof status);
    return status;
  }

  @Get('greet')
  @UseGuards(AuthGuard)
  greet(@Query(ValidateUserPipe) query: { name: string; age: number }) {
    console.log(typeof query.name);
    console.log(typeof query.age); // .ageNumber si en el pipe retornoreturn { ...value, ageNumber };
    return `Hola ${query.name} tienes ${query.age} años`;
  }

  // @Get('greet')
  // greet(@Query() query: createTask) {
  //   console.log(typeof query.title);
  //   console.log(typeof query.done);
  //   return `Hola ${query.title} tienes ${query.done} años`;
  // }
}
