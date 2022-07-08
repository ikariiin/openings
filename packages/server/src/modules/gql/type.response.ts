export function castResponse<T>(response: Record<string, unknown>): {
  data: T;
} {
  return response as {
    data: T;
  };
}
