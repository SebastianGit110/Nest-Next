import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

// Los guards sirven para proteger metodos de controllers y ejecutarlos si el guard cumple ciertas condiciones segun los parametros del controller
// Se puede reutilizar la logica y ponerlo en diferentes controllers a nivel de metodo o controller(clase)

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    console.log(request.url);

    // if (request.url === '/api/greet') return false;
    if (!request.headers['authorization']) return false; // Si en hearder no tiene uno con Authorization no puede ejecutar logica del controlador

    return true;
  }
}
