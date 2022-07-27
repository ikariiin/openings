import ytdl from "ytdl-core";
import yt from "youtube-search-without-api-key";
import internal from "stream";

export async function streamFromYt(
  searchTerm: string,
): Promise<internal.Readable> {
  const results = await yt.search(searchTerm);

  // eslint-disable-next-line no-magic-numbers
  return ytdl(results[0].url, { filter: "audioonly", quality: "highestaudio" });
}
