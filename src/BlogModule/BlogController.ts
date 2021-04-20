import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { BlogService } from './BlogService';

@Controller('blog')
export class BlogController {

    constructor(private readonly blogService: BlogService) { }

    @Post('/addblog')
    async signUpUser(@Req() request: Request): Promise<object> {
        return this.blogService.addBlog(request.body);
    }

    @Get('/getblogs')
    getUsers(@Query() query) {
        return this.blogService.getBlogs(query);
    }

}

