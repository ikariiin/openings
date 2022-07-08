import "reflect-metadata";
import Koa from "koa";
import { config as dotenv } from "dotenv";
import https from "node:https";
import config from "../config.json" assert { type: "json" };
import { getCerts } from "./get-certs.js";
import { attachRouters } from "./router.js";
import cors from "@koa/cors";
import { AppDataSource } from "./data-source.js";

dotenv();

await AppDataSource.initialize();

const app = new Koa();
app.use(
  cors({
    origin: "http://localhost:9000",
  }),
);
attachRouters(app);

https
  .createServer(await getCerts(), app.callback())
  .listen(process.env.HTTPS_PORT || config.defaults.HTTPS_PORT);
