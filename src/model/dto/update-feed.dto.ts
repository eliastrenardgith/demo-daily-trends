import { IsNotEmpty, IsString, IsUrl, MinLength } from "class-validator";

export class UpdateFeedDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name!: string;

    @IsUrl()
    url!: string;
}
