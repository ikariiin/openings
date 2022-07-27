import { IsNumber, IsString } from "class-validator";

export class UserListMedia {
  @IsNumber()
  public id!: number;

  @IsString()
  public bannerImage!: string;

  public title!: { romaji: string; english: string };

  public coverImage!: { large: string; extraLarge: string };

  @IsString()
  public format!: string;
}

export class UserListEntry {
  @IsNumber()
  public id!: number;

  @IsNumber()
  public priority!: number;

  @IsString()
  public status!: string;

  public media!: UserListMedia;
}

export class UserListDto {
  @IsString()
  public name!: string;

  public entries!: Array<UserListEntry>;
}
