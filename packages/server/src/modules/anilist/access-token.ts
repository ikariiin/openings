import fetch from "node-fetch";

export async function getAccessToken(code: string): Promise<string> {
  const response = await fetch(`https://anilist.co/api/v2/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      client_id: process.env.ANILIST_CLIENT_ID,
      client_secret: process.env.ANILIST_CLIENT_SECRET,
      redirect_uri: process.env.ANILIST_REDIRECT_URI,
    }),
  });

  // eslint-disable-next-line no-magic-numbers
  if (response.status !== 200) {
    throw await response.json();
    // throw new Error(`Anilist API returned status ${response.status}`);
  }

  const json = (await response.json()) as { access_token: string };

  return json.access_token;
}
