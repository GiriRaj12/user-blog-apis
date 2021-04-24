import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from '../Models/BlogModel';
import firebase from 'firebase';
import { APIResponse } from '../Common/APIResponse';
import { v4 } from 'uuid';

@Injectable()
export class BlogService {
    constructor(@InjectRepository(Blog) private blogRepo: Repository<Blog>) { }


    async addBlog(blogModel): Promise<object> {
        try {
            checkBlogConditions(blogModel);
            const blog: Blog = getBlogModelAfterSettingVariables(blogModel);
            console.log(blog);
            const savedBlog: Blog = await this.blogRepo.save(blog);
            await createBlogInFirestore(savedBlog);
            return APIResponse(true, savedBlog);
        } catch (err) {
            return APIResponse(false, err.message);
        }
    }

    async getBlogs(query): Promise<object> {
        let page = 0;
        if (query.page && query.page > 0) {
            page = query.page;
        }
        let totalPages = await this.blogRepo.query('SELECT COUNT(*) FROM blog');
        totalPages = Math.floor(totalPages[0].count / 10);
        const blogs = await this.blogRepo.query(formBlogQuery(page));
        const response = { 'page': page, 'blogs': blogs, totalpages: totalPages, pageLimit: 10 };
        return APIResponse(true, response);
    }
}

async function createBlogInFirestore(blog: Blog) {
    const db = firebase.database();
    await db.ref(`blogs/Blog_${blog.getId()}`).set(JSON.parse(JSON.stringify(blog)));
}

function getBlogModelAfterSettingVariables(blog): Blog {
    const blogModel = new Blog();
    blogModel.setArticleBody(blog.body);
    blogModel.setArticleTitle(blog.title);
    blogModel.setDate(new Date().toLocaleString());
    blogModel.setId(v4());
    return blogModel;
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