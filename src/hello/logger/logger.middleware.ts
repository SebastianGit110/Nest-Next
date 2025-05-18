import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

// Un middleware es una funcion que es como un intermediario que no deja continuar con la url si no se cumple cierta logica o permite hacer otra tarea como registrar la peticion o hacer consulta

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(req.originalUrl);
    console.log(req.baseUrl);

    next();
  }
}
