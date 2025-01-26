import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
  imports: [HttpModule], // Explicitly import HttpModule
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [] // Optional export if needed
})
export class BlogsModule {}