export function getQueryParam(param: string): string | null {
  // eslint-disable-next-line no-undef
  const params = new URLSearchParams(window.location.search);

  return params.get(param);
}
