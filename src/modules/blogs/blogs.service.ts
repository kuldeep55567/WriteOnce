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
  ) {
    // Add interceptor to automatically include API key
    this.httpService.axiosRef.interceptors.request.use(config => {
      const devToApiKey = this.configService.get<string>('DEV_TO_API_KEY');
      config.headers['api-key'] = devToApiKey;
      config.headers['Content-Type'] = 'application/json';
      return config;
    });
  }

  getBlogsFromDev(username: string): Observable<any> {
    return this.httpService
      .get(`https://dev.to/api/articles?username=${username}`)
      .pipe(
        map(response => response.data)
      );
  }

  postBlogsToDev(articleData: any): Observable<any> {
    return this.httpService
      .post(`https://dev.to/api/articles`, articleData)
      .pipe(
        map(response => response.data)
      );
  }

  updateBlogsToDev(articleData: any, articleId: number): Observable<any> {
    return this.httpService
      .put(`https://dev.to/api/articles/${articleId}`, articleData)
      .pipe(
        map(response => response.data)
      );
  }
}