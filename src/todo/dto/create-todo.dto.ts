import { IsString, IsNumber } from 'class-validator';

export class createTodoDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;
}
