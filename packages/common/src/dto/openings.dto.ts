import { IsNumber, IsString } from "class-validator";

export class SongEntry {
  @IsString()
  title!: string;

  @IsNumber()
  gid!: number;

  @IsString()
  type!: string;
}

export class OpeningsDto {
  openings!: SongEntry[];
  endings!: SongEntry[];
  inserts!: SongEntry[];
}
