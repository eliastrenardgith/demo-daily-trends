import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive()
  @IsOptional()
  limit?: number;

  @IsPositive()
  @IsOptional()
  page?: number;
}

export const defaultPaginationQueryDto: PaginationQueryDto = { limit: 5, page: 1 };
