import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDTO, EditArticleDTO } from './article.dto';
interface activeResponse<T = unknown> {
  generatedMaps: Array<T>;
  raw: Array<T>;
  affected: number;
}

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleModel: Repository<Article>
  ) {}

  // 查找所有数据
  async findAll() {
    return await this.articleModel.find();
  }
  //找一个
  async findOne(id: number): Promise<CreateArticleDTO | object> {
    return await this.articleModel.find({ where: { id: Number(id) } });
  }
  //创建数据
  async createdArticle(body: CreateArticleDTO) {
    const res = this.articleModel.create({ ...body });
    return await this.articleModel.save(res);
  }

  //修改数据
  async editArticle(body: EditArticleDTO){
    const res = await this.articleModel.update({ id: Number(body.id) }, body);
    return res;
  }
  
  //删除数据
  async deleteData(id: number) {
    return await this.articleModel.delete({ id: id });
  }
}
