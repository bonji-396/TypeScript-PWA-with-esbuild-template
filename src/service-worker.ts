/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */
// install event
addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service Worker installed', event);
});

// activate event
addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service Worker activated', event);
});

// fetch event
addEventListener('fetch', (event: FetchEvent) => {
  console.log('Fetching:', event.request.url);
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
});
