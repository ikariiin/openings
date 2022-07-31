import { gqlRequest } from "../gql/index.js";
import { castResponse } from "../gql/type.response.js";
import {
  IAnilistMediaListCollection,
  IAnilistMediaListGroup,
  Maybe,
} from "../gql/types";

export async function getUserMediaCollection(
  userId: number,
): Promise<Maybe<Array<IAnilistMediaListGroup>>> {
  console.log("userid> ", userId);
  const query = `
    query($userId: Int) {
      MediaListCollection (userId: $userId, type: ANIME) {
        lists {
          name,
          entries {
            id,
            priority,
            media {
              id,
              title {
                romaji,
                english
              },
              coverImage {
                large,
                extraLarge
              },
              bannerImage,
              format
            },
            status
          }
        }
      }
    }
  `;

  const response = castResponse<{
    MediaListCollection: IAnilistMediaListCollection;
  }>(await gqlRequest(query, { userId: userId }));

  return response.data.MediaListCollection.lists;
}
