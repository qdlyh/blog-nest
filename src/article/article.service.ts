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
  createQueryBuilder: any;
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
    const query = this.articleModel.createQueryBuilder('article');

    // 判断 search 是否为空字符串、null、undefined 等
    if (search && search.trim() !== '') {
      query.where('article.title LIKE :title', { title: `%${search.trim()}%` });
    }
    query.skip((pageNumber - 1) * pageSize)
      .take(pageSize);

    const res = await query.getMany();

    return {
      data: res.length ? res : [],
      pageInfo: {
        pageNumber: pageNumber,
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
