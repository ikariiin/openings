import { Context } from "koa";
import { AppDataSource } from "../../data-source.js";
import { getAccessToken } from "../anilist/access-token.js";
import { getUserDetails } from "../anilist/user-details.js";
import { IAnilistUser } from "../gql/types.js";
import { AnilistProfile, AuthResponseDto, User } from "common";

async function saveUserDetails(
  userDetails: IAnilistUser,
  accessToken: string,
): Promise<User> {
  const profileRepository = await AppDataSource.getRepository(AnilistProfile);
  const userRepository = await AppDataSource.getRepository(User);

  const preExistingUser = await userRepository.findOne({
    where: {
      anilistUser: {
        anilistId: userDetails.id,
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
  profile.anilistId = userDetails.id;

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
    const user = await saveUserDetails(userDetails, accessToken);

    ctx.body = {
      accessToken: accessToken,
      profile: user.anilistUser,
    } as AuthResponseDto;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
}
