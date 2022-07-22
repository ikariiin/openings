export function apiUrl(path: string): string {
  return `${process.env.API_BASE}${path}`;
}
