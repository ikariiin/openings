import { IsString } from "class-validator";
import { ProfileDto } from "./profile.dto";

export class AuthResponseDto {
  @IsString()
  public accessToken!: string;

  public profile!: ProfileDto;
}
