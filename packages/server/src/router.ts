import Koa from "koa";
import { authRouter } from "./modules/auth/index.js";
import { anilistRouter } from "./modules/anilist/index.js";
import { openingsRouter } from "./modules/openings/index.js";
import { audioRouter } from "./modules/audio/index.js";

export function attachRouters(app: Koa): void {
  app.use(authRouter.routes()).use(authRouter.allowedMethods());
  app.use(anilistRouter.routes()).use(anilistRouter.allowedMethods());
  app.use(openingsRouter.routes()).use(openingsRouter.allowedMethods());
  app.use(audioRouter.routes()).use(audioRouter.allowedMethods());
}
