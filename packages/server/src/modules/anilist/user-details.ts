import { gqlRequest } from "../gql/index.js";
import { castResponse } from "../gql/type.response.js";
import { IAnilistUser } from "../gql/types.js";

export async function getUserDetails(token: string): Promise<IAnilistUser> {
  const query = `
    query {
      Viewer {
        id,
        name,
        avatar {
          large,
          medium
        }
      }
    }
  `;

  const response = castResponse<{ Viewer: IAnilistUser }>(
    await gqlRequest(query, {}, token),
  );
  return response.data.Viewer;
}
