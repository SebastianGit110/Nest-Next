import { IsString, IsBoolean, MinLength, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class createTask {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  description: string;

  @ApiProperty()
  @Type(() => Boolean) // El transform debe estar en true
  @IsBoolean()
  done: boolean;
}
