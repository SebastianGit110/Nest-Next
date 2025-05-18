import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { HelloController } from 'src/hello/hello.controller';
import { LoggerMiddleware } from 'src/hello/logger/logger.middleware';
import { AuthMiddleware } from 'src/hello/auth/auth.middleware';

@Module({
  imports: [],
  providers: [TasksService],
  controllers: [TasksController, HelloController],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('tasks/getTasks') // Para todas las rutas que este modulo soporte en los controllers con 'tasks/getTasks'
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes(
    //     { path: 'tasks/getTasks', method: RequestMethod.GET },
    //     { path: 'tasks/getTasks', method: RequestMethod.POST },
    //   );
    consumer.apply(LoggerMiddleware).forRoutes(TasksController) // a nivel de controlador
    .apply(AuthMiddleware).forRoutes(TasksController) // Si hay rutas que coinciden entre los middlewares, se ejecutan ambos middlewares
  }
}
