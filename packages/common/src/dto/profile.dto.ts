import { IsString } from "class-validator";

export class ProfileDto {
  @IsString()
  public name!: string;

  @IsString()
  public largeAvatar!: string;

  @IsString()
  public mediumAvatar!: string;
}
