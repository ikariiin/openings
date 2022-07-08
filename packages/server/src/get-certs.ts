import { promises as fs } from "node:fs";
import config from "../config.json" assert { type: "json" };

export async function getCerts() {
  const cert = await fs.readFile(config.defaults.HTTPS_CERT);
  const key = await fs.readFile(config.defaults.HTTPS_KEY);
  return { cert, key };
}
