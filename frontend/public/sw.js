self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  const data = event.data?.json?.() || {};
  event.waitUntil(self.registration.showNotification(data.title || 'Kepler Sports', {
    body: data.body || 'New update from Kepler Sports',
    icon: data.icon || '/favicon.svg',
    badge: data.badge || '/favicon.svg',
    tag: data.tag || 'kepler-sports',
    data: { url: data.url || '/' },
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(self.clients.matchAll({ type: 'window' }).then((clients) => {
    const existing = clients.find((client) => client.url.includes(url));
    return existing ? existing.focus() : self.clients.openWindow(url);
  }));
});
