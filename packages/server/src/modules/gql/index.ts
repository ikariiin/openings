import fetch from "node-fetch";
import statusCodes from "../misc/status-codes.js";

export async function gqlRequest(
  query: string,
  variables: Record<string, string> = {},
  authToken?: string,
): Promise<Record<string, unknown>> {
  const response = await fetch(`https://graphql.anilist.co`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status.toString() !== statusCodes["OK"]) {
    throw await response.json();
  }

  return (await response.json()) as Record<string, unknown>;
}
