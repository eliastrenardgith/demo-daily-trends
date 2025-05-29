import { IsMongoId, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CrudUrlParamsDto {
  @IsMongoId({ message: 'ID is NOT valid.' })
  @IsString()
  @IsNotEmpty()
  id!: string;
}
