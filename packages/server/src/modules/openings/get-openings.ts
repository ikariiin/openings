import { Context } from "koa";
import { searchAnn } from "./search-ann.js";

export async function getOpenings(ctx: Context): Promise<void> {
  try {
    // Get title from query params
    const title = ctx.query.title;

    // Search for openings in ANN
    const openings = await searchAnn(title as string);

    ctx.body = openings;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = { err };
  }
}
