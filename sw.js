// Réseau d'abord (les mises à jour arrivent dès que le joueur est en ligne), cache en secours hors-ligne.
const C = 'pdl-v1.1';
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(["./", "index.html", "lib/three.min.js", "manifest.webmanifest", "assets/apple-touch-icon.png", "assets/favicon.png", "assets/icon-192.png", "assets/icon-512.png", "assets/icon.svg", "assets/keyart.svg", "assets/logo-mark.svg", "assets/logo-stack-dark.svg", "assets/logo-stack.svg", "assets/logo.svg", "assets/og.svg"]))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { const k = r.clone(); caches.open(C).then(c => c.put(e.request, k)); return r; }).catch(() => caches.match(e.request)));
});
