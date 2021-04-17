import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../Models/BlogModel';

@Injectable()
export class BlogService {
    constructor(@InjectRepository(Blog) private blogRepo: Repository<Blog>) { }


    async addBlog(blogModel): Promise<string> {
        try {
            checkBlogConditions(blogModel);
            const blog = getBlogModelAfterSettingVariables(blogModel);
            return JSON.stringify(await this.blogRepo.save(blog));
        } catch (err) {
            return JSON.stringify(getErrorObjecg(err.message));
        }
    }

    async getBlogs(query): Promise<string> {
        let page = 0;
        if (query.page && query.page > 0) {
            page = query.page;
        }
        const blogs = await this.blogRepo.query(formBlogQuery(page));
        return JSON.stringify({ 'page': page, 'blogs': blogs });
    }
}

function getBlogModelAfterSettingVariables(blog): Blog {
    const blogModel = new Blog();
    blogModel.setArticleBody(blog.body);
    blogModel.setArticleTitle(blog.title);
    blogModel.setDate(new Date().toLocaleString());
    return blogModel;
}


function getErrorObjecg(err: string): object {
    return {
        'response': false,
        'message': err
    }
}

function formBlogQuery(page) {
    const offset = page ? page : 0;
    return `SELECT * FROM blog ORDER BY "title" LIMIT 10 OFFSET ${offset}`;
}

function checkBlogConditions(blog) {
    if (!blog.title) {
        throw new Error('Title of the blog cannot be null');
    }

    if (!blog.body) {
        throw new Error('Body of the blog cannot be null or empty');
    }
}