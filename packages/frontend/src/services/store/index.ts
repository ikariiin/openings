export function saveStore<T>(key: string, data: T): void {
  localStorage.setItem(`store.${key}`, JSON.stringify(data));
}

export function loadStore<T>(key: string): T | undefined {
  const data = localStorage.getItem(`store.${key}`);
  if (data) {
    return JSON.parse(data);
  }
}
