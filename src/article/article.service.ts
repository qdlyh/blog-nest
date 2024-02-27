import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
  ) { }

  // 查找所有数据
  // findAll() {
  //   return this.articleModel.find();
  // }
  async findAll(search: string, pageNumber: number = 1, pageSize: number = 10) {
    const totalSize = await this.articleModel.count()
    // if (totalSize === 0 || pageNumber > Math.ceil(totalSize / pageSize)) {
    //   return null;
    // }

    const res = await this.articleModel.findAndCount({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      where: { title: Like(`%${search}%`) }
    });

    return {
      data: res.length ? res[0] : [],
      pageInfo: {
        currentPage: pageNumber,
        pageSize: pageSize,
        totalSize: totalSize,
        totalPages: Math.ceil(totalSize / pageSize),
      },
    };
  }
  //找一个
  findOne(id: number): Promise<CreateArticleDTO | object> {
    return this.articleModel.find({ where: { id: id } });
  }
  //创建数据
  createdArticle(body: CreateArticleDTO) {
    const res = this.articleModel.create({ ...body });
    return this.articleModel.save(res);
  }

  //修改数据
  editArticle(body: EditArticleDTO) {
    const res = this.articleModel.update(+body.id, body);
    return res;
  }

  //删除数据
  deleteData(id: number) {
    return this.articleModel.delete({ id: id });
  }
}
