import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateFeedDto {
  @IsUrl()
  url!: string;

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  summary!: string;
}
