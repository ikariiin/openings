import Koa from "koa";
import { authRouter } from "./modules/auth/index.js";

export function attachRouters(app: Koa): void {
  app.use(authRouter.routes()).use(authRouter.allowedMethods());
}
