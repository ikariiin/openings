import Router from "@koa/router";
import { handleCode } from "./code.js";

const router = new Router({ prefix: "/auth" });

router.get("/code", handleCode);

export { router as authRouter };
