import Router from "@koa/router";
import { getOpenings } from "./get-openings.js";

const router = new Router({ prefix: "/openings" });

router.get("/", getOpenings);

export { router as openingsRouter };
