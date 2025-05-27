import { IsNotEmpty, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateFeedDto {
  @IsUrl()
  url!: string;
}
