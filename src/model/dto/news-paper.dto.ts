import { IsUrl } from 'class-validator';

export class NewsPaperDto {
  @IsUrl()
  url!: string;
}
