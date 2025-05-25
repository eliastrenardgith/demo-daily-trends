import { IsNotEmpty, IsString, IsUrl, MinLength } from "class-validator";

export class CreateFeedDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name!: string;

    @IsUrl()
    url!: string;
}
