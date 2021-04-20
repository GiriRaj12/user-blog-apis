import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './UserService';

@Controller('auth')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('/user/adduser')
    async signUpUser(@Req() request: Request): Promise<string> {
        return this.userService.addUser(request.body);
    }

    @Post('/user/login')
    loginUser(@Req() request: Request) {
        return this.userService.loginUser(request.body);
    }

}

