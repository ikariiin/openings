import { Context } from "koa";
import { streamFromYt } from "./yt-stream.js";

export async function getFromYt(ctx: Context): Promise<void> {
  const regexp = /(?<=\").*?(?=\")/gm;
  const searchTerm = regexp.exec(String(ctx.query.title));
  const artist = String(ctx.query.title)
    .split("by")
    .pop()
    ?.trim()
    .replace(/\(.*?\)/gm, "");

  if (!searchTerm) {
    ctx.status = 400;
    ctx.body = "Invalid search term";
    return;
  }

  // eslint-disable-next-line no-magic-numbers
  ctx.body = await streamFromYt(`${searchTerm[0]} ${artist}`);
}
