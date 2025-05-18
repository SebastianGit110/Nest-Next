import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // sin { whitelist: true } estaria en false por defecto y aun asi valida los tipos con base a los dto pero si uno manda una prop de mas, la admite y la idea del dto es que lo que uno envie sea igual a lo del dto ya que uno quiere solo esos datos, entonces con { whitelist: true } lo que hace es que ignora los datos extras que no estan en el dto
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })); // a nivel global

  // Swwager config
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization', // Header key
        in: 'header',
        description: 'Ingresa "contrasena" como valor',
      },
      'ApiKeyAuth', // Referencia para @ApiSecurity
    ) // Para agregar el header Authorization
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/swagger', app, documentFactory);

  // enable cors {origin: 'http://google.com'} para permitir acceso solo a un sitio web
  app.enableCors(); // fetch('http://localhost:3000/api/tasks/getTask/1').then(res => res.json()).then(console.log)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
