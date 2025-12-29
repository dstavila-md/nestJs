import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }
}
