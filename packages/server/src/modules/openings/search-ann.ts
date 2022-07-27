import fetch from "node-fetch";
import { XMLParser } from "fast-xml-parser";
import { compareTwoStrings } from "string-similarity";
import { OpeningsDto } from "common";

export type SearchResultItem = {
  id: number;
  gid: number;
  type: string;
  precision: string;
  name: string;
  vintage: string;
};

interface SearchAnnResult {
  report: {
    args: {
      type: string;
      name: string;
      search: string;
    };
    item: Array<SearchResultItem> | SearchResultItem;
  };
}

const ANNSearchEndpoint =
  "https://www.animenewsnetwork.com/encyclopedia/reports.xml?id=155&type=anime&nlist=all&search=";
const ANNInfoEndpoint =
  "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=";

export async function searchAnn(title: string): Promise<OpeningsDto> {
  const url = `${ANNSearchEndpoint}${title}`;
  const response = await fetch(url);
  const xml = await response.text();

  const parser = new XMLParser();
  const json = parser.parse(xml) as SearchAnnResult;

  console.log(json.report.item);

  // Get best match for title from the results
  const bestMatch =
    // eslint-disable-next-line no-magic-numbers
    Array.isArray(json.report.item)
      ? json.report.item.reduce(
          (prev, curr) => {
            const score = compareTwoStrings(title, curr.name);
            if (score > prev.score) {
              return { score, item: curr };
            }
            return prev;
          },
          // eslint-disable-next-line no-magic-numbers
          { score: 0, item: {} as SearchResultItem },
        )
      : // eslint-disable-next-line no-magic-numbers
        { item: json.report.item };

  const item = bestMatch.item;

  const infoUrl = `${ANNInfoEndpoint}${item.id}`;
  const infoResponse = await fetch(infoUrl);
  const infoXml = await infoResponse.text();

  const infoParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    textNodeName: "title",
  });
  const infoJson = infoParser.parse(infoXml);

  const openings = infoJson.ann.anime.info.filter(
    (info: { type: string }) => info.type === "Opening Theme",
  );
  const endings = infoJson.ann.anime.info.filter(
    (info: { type: string }) => info.type === "Ending Theme",
  );
  const inserts = infoJson.ann.anime.info.filter(
    (info: { type: string }) => info.type === "Insert song",
  );

  return {
    openings,
    endings,
    inserts,
  };
}
