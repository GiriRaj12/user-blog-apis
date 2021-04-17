import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { BlogService } from './BlogService';

@Controller('api')
export class BlogController {

    constructor(private readonly blogService: BlogService) { }

    @Post('/blog/add')
    async signUpUser(@Req() request: Request): Promise<string> {
        return this.blogService.addBlog(request.body);
    }

    @Get('/blog')
    getUsers(@Query() query) {
        return this.blogService.getBlogs(query);
    }

}

