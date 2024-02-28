import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//CreateDateColumn
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column('timestamp')
  date: string;
}
