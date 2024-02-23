export class CreateArticleDTO {
  readonly title: string;
  readonly content: string;
  readonly date: string;
}

export class EditArticleDTO {
  readonly id: number;
  readonly title: string;
  readonly content: string;
  readonly date: string;
}
