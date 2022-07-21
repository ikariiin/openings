import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { AnilistProfile } from "./anilist-profile";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public accessToken!: string;

  @OneToOne(() => AnilistProfile, (profile) => profile.user)
  @JoinColumn()
  public anilistUser!: Relation<AnilistProfile>;
}
