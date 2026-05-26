const searchCache = new Map<string, { expiresAt: number; value: unknown }>();

export async function withSearchCache<T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>,
): Promise<T> {
  const cached = searchCache.get(key);
  const now = Date.now();

  if (cached && cached.expiresAt > now) {
    return cached.value as T;
  }

  const value = await loader();
  searchCache.set(key, { value, expiresAt: now + ttlMs });
  return value;
}
