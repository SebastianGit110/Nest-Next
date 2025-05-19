import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User | HttpException> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User | HttpException | null> {
    console.log(typeof +id); // +id lo convierte a number automaticamente o usar ParseIntPipe o @Type(()=>number) de class-transform y tener transform en true
    return this.usersService.getUser(id);
  }

  @Post('byUser')
  getUserByUser(
    @Body() user: { id?: number; username?: string; password?: string },
  ) {
    console.log(user);
    return this.usersService.getUserByUser(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('user/:id')
  updateByUsername(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateByUsername(+id, updateUserDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.usersService.deleteById(+id);
  }

  @Delete()
  deleteByUser(@Body() user) {
    console.log(user);
    return this.usersService.deleteByUser(user);
  }
}
