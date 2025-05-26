import { IsNotEmpty, IsString } from 'class-validator';

export class CrudUrlParamsDto {
  @IsString()
  @IsNotEmpty()
  id!: string;
}
