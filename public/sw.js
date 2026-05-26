/**
 * PWA SERVICE WORKER — Q102
 * Low-bandwidth / offline mode
 * Saves the source-backed Egyptian crisis routes on the device for offline access.
 * Available even without internet
 * 
 * Framework: §23.1 #8 — Low-bandwidth / offline mode
 */

const CACHE_NAME = "eal-offline-v2";
const CRISIS_DATA = {
  contacts: [
    { name: "Egypt Mental Health Hotline", number: "16328", available: "24/7", free: true, source: "MOHP hotline notice" },
    { name: "Egypt Mental Health Toll-Free Backup", number: "08008880700", available: "24/7", free: true, source: "MOHP hotline notice" },
    { name: "GSMHAT Cairo backup line", number: "0220816831", available: "Official support line", free: false, source: "MOHP hotline notice" },
    { name: "Emergency Services", number: "123", available: "24/7", free: true, source: "Egypt emergency services" },
    { name: "Dar al-Ifta", number: "107", available: "Business hours", free: true, source: "Dar al-Ifta official contacts" },
  ],
  lastUpdated: "2026-04-20",
  disclaimer: "This is educational content only. For emergencies, call 123. For Egyptian mental-health crisis support, use 16328 first and 08008880700 as the published toll-free backup.",
};

// URLs to cache for offline access
const OFFLINE_URLS = [
  "/",
  "/assessment",
  "/dashboard",
  "/sources",
  "/manifest.json",
  "/icon.svg",
  "/offline.html",
];

async function warmOfflineCache() {
  const cache = await caches.open(CACHE_NAME);

  await Promise.all(
    OFFLINE_URLS.map(async (url) => {
      try {
        await cache.add(url);
      } catch (error) {
        console.warn("[EAL SW] Failed to cache offline asset:", url, error);
      }
    }),
  );

  const crisisResponse = new Response(JSON.stringify(CRISIS_DATA), {
    headers: { "Content-Type": "application/json" },
  });
  await cache.put("/api/crisis-contacts", crisisResponse);
}

// Install: cache crisis data and offline page
self.addEventListener('install', (event) => {
  event.waitUntil(warmOfflineCache());
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve crisis data from cache when offline
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET") {
    return;
  }
  
  // Always serve crisis contacts from cache (offline-first)
  if (url.pathname === '/api/crisis-contacts') {
    event.respondWith(
      caches.match('/api/crisis-contacts').then((cached) => {
        return cached || fetch(event.request);
      })
    );
    return;
  }

  // Never cache Next.js internal assets (Turbopack chunks, HMR, etc.)
  if (url.pathname.startsWith('/_next/')) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          return cached || caches.match("/offline.html");
        }),
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) {
          return cached;
        }

        return fetch(event.request).then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          return response;
        });
      }),
    );
  }
});
