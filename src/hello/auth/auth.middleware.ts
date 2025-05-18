import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(req.headers['authorization']);

    if (!req.headers['authorization'])
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    if (req.headers['authorization'] != 'contrasena')
      throw new HttpException('forbiden', HttpStatus.FORBIDDEN);
    next();
  }
}
