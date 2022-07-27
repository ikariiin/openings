import Router from "@koa/router";
import { getFromYt } from "./get-from-yt.js";

const router = new Router({ prefix: "/audio" });

router.get("/", getFromYt);

export { router as audioRouter };
