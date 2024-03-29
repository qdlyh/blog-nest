import { Controller, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDTO, EditArticleDTO } from './article.dto';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';


@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) { }

  @Get('list')
  //http://localhost:3000/app/article/list
  // async findAll(): Promise<object> {
  //   return {
  //     code: 200,
  //     data: await this.articleService.findAll(),
  //     message: 'Success',
  //   };
  // }
  async findAll(@Query('search') name: string, @Query('pageNumber') pageNumber: number, @Query('pageSize') pageSize: number): Promise<object> {
    try {
      const res = await this.articleService.findAll(name, +pageNumber, +pageSize);

      if (!res) {
        throw new Error('Invalid page or size');
      }

      return res;
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<object> {
    let res = await this.articleService.findOne(+id);
    if (res[0]) {
      return {
        code: 200,
        data: res[0],
        message: 'Success',
      };
    } else {
      return {
        code: 500,
        data: {},
        message: 'error',
      };
    }
  }

  @Delete(':id')
  async deleteData(@Param('id') id: string): Promise<object> {
    let res = await this.articleService.deleteData(+id);
    if (res) {
      return {
        code: 200,
        message: 'Success',
      };
    } else {
      return {
        code: 500,
        message: 'error',
      };
    }
  }

  // http://localhost:3000/app/article/create
  @Post('create')
  async createdArticle(@Body() createArticleDTO: CreateArticleDTO): Promise<object> {
    try {
      const res = await this.articleService.createdArticle(createArticleDTO);

      if (!res) {
        throw new Error('发布失败');
      }
      return {
        code: 200,
        message: '发布成功',
        // data: res, // 如果需要返回创建的文章数据，可以在这里返回
      };
    } catch (error) {
      // 根据错误类型返回不同的HTTP状态码和信息
      return {
        code: 500,
        message: error,
      }
    }
  }

  @Post('edit')
  async editArticle(@Body() body: EditArticleDTO): Promise<object> {
    let res = await this.articleService.editArticle(body);
    if (res.affected) {
      return {
        code: 200,
        message: '修改成功',
      };
    } else {
      return {
        code: 500,
        message: '修改失败',
      };
    }
  }
}
