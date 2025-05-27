import { IsNotEmpty, IsString, IsUrl, MinLength } from 'class-validator';

export class UpdateFeedDto {
  @IsUrl()
  url!: string;
}
