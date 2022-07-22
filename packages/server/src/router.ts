import Koa from "koa";
import { authRouter } from "./modules/auth/index.js";
import { anilistRouter } from "./modules/anilist/index.js";

export function attachRouters(app: Koa): void {
  app.use(authRouter.routes()).use(authRouter.allowedMethods());
  app.use(anilistRouter.routes()).use(anilistRouter.allowedMethods());
}
