import { IsOptional, Validate } from 'class-validator';
import { PositiveStringNumber } from '../../common/validators';

export class PaginationQueryDto {
  @Validate(PositiveStringNumber)
  @IsOptional()
  limit?: string;

  @Validate(PositiveStringNumber)
  @IsOptional()
  page?: string;
}
