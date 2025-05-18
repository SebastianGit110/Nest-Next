import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';

// Si yo hago solo el import de un modulo y ese no tiene exports de servicios va a crear las rutas de ese modulo pero desde el que lo importo no voy a poder usar sus servicios, tocaria exportarlos desde el modulo importado

// @Module({
//   imports: [TasksModule],
//   controllers: [AppController, TasksController],
//   providers: [AppService, TasksService],
// })
@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
