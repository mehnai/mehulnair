const CACHE_NAME = "minimal-editor-v87";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=87",
  "./graph-engine.js?v=87",
  "./app.js?v=87",
  "./manifest.webmanifest?v=87",
  "./icon.png?v=87"
];

const APP_SHELL_PATHS = new Set(
  APP_SHELL.map((entry) => {
    const normalizedEntry = String(entry || "").split("?")[0] || "./";
    if (normalizedEntry === "./" || normalizedEntry === ".") return "/";
    return normalizedEntry.replace(/^\.\//, "/");
  })
);

const isAppShellRequest = (request) => {
  if (request.mode === "navigate") return true;
  try {
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return false;
    const pathname = url.pathname || "/";
    return APP_SHELL_PATHS.has(pathname === "" ? "/" : pathname);
  } catch {
    return false;
  }
};

const cacheResponse = async (request, response) => {
  if (!(response instanceof Response)) return response;
  if (!response.ok && response.type !== "opaque") return response;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
  return response;
};

const fetchAndCache = async (request) => {
  const response = await fetch(request);
  return cacheResponse(request, response);
};

const respondNetworkFirst = async (request) => {
  try {
    return await fetchAndCache(request);
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
};

const respondCacheFirst = async (request) => {
  const cached = await caches.match(request);
  if (cached) return cached;
  return fetchAndCache(request);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (isAppShellRequest(event.request)) {
    event.respondWith(respondNetworkFirst(event.request));
    return;
  }

  event.respondWith(respondCacheFirst(event.request));
});
