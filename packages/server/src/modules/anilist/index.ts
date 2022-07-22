import Router from "@koa/router";
import { getUserList } from "./user-list.js";

const router = new Router({ prefix: "/anilist" });

router.get("/user-list", getUserList);

export { router as anilistRouter };
