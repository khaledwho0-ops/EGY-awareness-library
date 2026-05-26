/**
 * DEBOUNCE & THROTTLE UTILITIES — Q73/Q74
 * 
 * Used for:
 * - Q73: Crossref/Nominatim API calls — backoff debounce
 * - Q74: Search input — 300ms debounce to prevent API spam
 * - Evidence search — 500ms debounce for real-time results
 * 
 * Framework: §23.1 — Polite API access patterns
 */

/**
 * Debounce: delays execution until `delayMs` ms of silence.
 * Used for search inputs and API calls.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  };
}

/**
 * Throttle: executes at most once per `intervalMs`.
 * Used for scroll handlers and resize events.
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  intervalMs: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= intervalMs) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Exponential backoff for failed API requests.
 * Used for Crossref/OpenAlex/Nominatim to respect rate limits.
 * 
 * @param fn - async function to retry
 * @param maxRetries - maximum number of retries (default 3)
 * @param baseDelayMs - initial delay in ms (default 1000)
 */
export async function withBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelayMs = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * 500;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/**
 * Rate-limited fetch: adds polite User-Agent and respects Retry-After headers.
 * Used for Q73 Crossref Polite Pool and Q74 Nominatim compliance.
 */
export async function politeFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(options.headers);

  // Crossref Polite Pool requires mailto header
  if (url.includes("api.crossref.org")) {
    headers.set("User-Agent", "EgyptianAwarenessLibrary/1.0 (mailto:research@eal.edu.eg)");
  }

  // Nominatim requires User-Agent identification
  if (url.includes("nominatim.openstreetmap.org")) {
    headers.set("User-Agent", "EgyptianAwarenessLibrary/1.0");
  }

  const response = await fetch(url, { ...options, headers });

  // Respect Retry-After header
  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    const waitMs = retryAfter ? parseInt(retryAfter) * 1000 : 5000;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
    return politeFetch(url, options);
  }

  return response;
}
