import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './UserService';

@Controller('api')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('/user/signup')
    async signUpUser(@Req() request: Request): Promise<string> {
        return this.userService.addUser(request.body);
    }

    @Get('/user/login')
    loginUser(@Req() request: Request) {
        return this.userService.loginUser(request.body);
    }

}

