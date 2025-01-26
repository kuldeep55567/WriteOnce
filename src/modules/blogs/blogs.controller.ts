import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Observable } from 'rxjs';

@Controller('v1/blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }

  @Get(':username')
  getDevToBlogs(@Param('username') username: string): Observable<any> {
    return this.blogsService.getBlogsFromDev(username);
  }
  @Post('')
  createDevToBlog(@Body() articleData: any) {
    return this.blogsService.postBlogsToDev(articleData);
  }
  @Put(':articleId')
  updateDevToBlog(@Body() articleData: any, @Param('articleId') articleId: number) {
    return this.blogsService.updateBlogsToDev(articleData, articleId);
  }
}