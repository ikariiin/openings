import { User } from "common";
import { Context } from "koa";
import { AppDataSource } from "../../data-source.js";
import { getUserMediaCollection } from "./get-user-anime.js";

export async function getUserList(ctx: Context): Promise<void> {
  try {
    // Get auth token from query params
    const token = ctx.query.access_token as string;
    // Get user from database with this access_token
    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        accessToken: token,
      },
      relations: {
        anilistUser: true,
      },
    });
    // If user is not found, return error
    if (!user) {
      ctx.status = 404;
      ctx.body = "User not found";
      return;
    }

    const userId = user.anilistUser.anilistId;
    const mediaList = await getUserMediaCollection(userId);
    ctx.body = mediaList;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
}
