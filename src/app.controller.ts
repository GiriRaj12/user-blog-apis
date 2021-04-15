import { Controller, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './app.service';

@Controller('api')
export class Controllers {

  constructor(private readonly userService: UserService) { }

  @Post('/user/signup')
  async signUpUser(@Req() request: Request): Promise<string> {
    return this.userService.addUser(request.body);
  }

  @Get('/user')
  getUser(): string {
    return 'Nothing'
  }

}

