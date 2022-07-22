import { config } from "dotenv";
import { DataSource } from "typeorm";
import { AnilistProfile, User } from "common";

config();

console.log(process.env.DB_HOST);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  // logging: process.env.NODE_ENV === "development",
  logging: false,
  entities: [User, AnilistProfile],
  subscribers: [],
  migrations: [],
});
