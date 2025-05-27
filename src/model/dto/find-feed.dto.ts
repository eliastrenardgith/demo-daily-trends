import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class FindFeedDto {
  @IsOptional()
  @IsString()
  searchTerm?: string;
}
