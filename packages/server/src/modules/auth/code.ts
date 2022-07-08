import { Context } from "koa";
import { AppDataSource } from "../../data-source.js";
import { AnilistProfile } from "../../entity/anilist-profile.js";
import { User } from "../../entity/user.js";
import { getAccessToken } from "../anilist/access-token.js";
import { getUserDetails } from "../anilist/user-details.js";
import { IAnilistUser } from "../gql/types.js";

async function saveUserDetails(
  userDetails: IAnilistUser,
  accessToken: string,
): Promise<User> {
  const profileRepository = await AppDataSource.getRepository(AnilistProfile);
  const userRepository = await AppDataSource.getRepository(User);

  const preExistingUser = await userRepository.findOne({
    where: {
      anilistUser: {
        name: userDetails.name,
      },
    },
    relations: {
      anilistUser: true,
    },
  });

  if (preExistingUser) {
    return preExistingUser;
  }

  const profile = new AnilistProfile();
  profile.name = userDetails.name;
  profile.largeAvatar = userDetails.avatar?.large ?? "";
  profile.mediumAvatar = userDetails.avatar?.medium ?? "";

  await profileRepository.save(profile);

  const user = new User();
  user.accessToken = accessToken;
  user.anilistUser = profile;

  await userRepository.save(user);

  return user;
}

export async function handleCode(ctx: Context): Promise<void> {
  try {
    const accessToken = await getAccessToken(ctx.query.code as string);
    const userDetails = await getUserDetails(accessToken);
    ctx.body = { userDetails };
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
}
