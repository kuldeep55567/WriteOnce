import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { loggerConfig } from './config/logger.config';
import { BlogsModule } from './modules/blogs/blogs.module';

@Module({
  imports: [
    WinstonModule.forRoot(loggerConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule,
    BlogsModule,
  ],
})
export class AppModule {}