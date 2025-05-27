import { IsNotEmpty, IsString } from 'class-validator';

export class CrudUrlParamsDto {
  // TODO: Validate this is a mongodb ID.
  @IsString()
  @IsNotEmpty()
  id!: string;
}
