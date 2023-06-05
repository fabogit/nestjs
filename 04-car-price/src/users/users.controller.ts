import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { SignUpUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/signup')
  signUpUser(@Body() body: SignUpUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('/signin')
  signInUser(@Body() body: SignUpUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/:id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    console.log('Handler is running');

    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
