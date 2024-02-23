import { Controller } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDTO, EditArticleDTO } from './article.dto';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';


@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  async findAll(): Promise<object> {
    return {
      code: 200,
      data: await this.articleService.findAll(),
      message: 'Success',
    };
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<object> {
    let res = await this.articleService.findOne(id);
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
  async deleteData(@Param('id') id: number): Promise<object> {
    let res = await this.articleService.deleteData(id);
    if (res.affected) {
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

  @Post('create')
  async createdArticle(@Body() body: CreateArticleDTO): Promise<object> {
    let res = await this.articleService.createdArticle(body);
    if (res) {
      return {
        code: 200,
        message: '发布成功',
      };
    } else {
      return {
        code: 500,
        message: '发布失败',
      };
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
