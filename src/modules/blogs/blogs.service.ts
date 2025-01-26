// blogs.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BlogsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) { }

  getBlogsFromDev(username: string): Observable<any> {
    return this.httpService
      .get(`https://dev.to/api/articles?username=${username}`)
      .pipe(
        map(response => response.data)
      );
  }
  postBlogsToDev(articleData: any): Observable<any> {
    const devToApiKey = this.configService.get<string>('DEV_TO_API_KEY');

    return this.httpService
      .post(`https://dev.to/api/articles`,
        articleData,
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': devToApiKey
          }
        }
      )
      .pipe(
        map(response => response.data)
      );
  }
}
