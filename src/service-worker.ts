/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// declare type ExtendableEvent = Event & { waitUntil(fn: Promise<any>): void };
// declare type FetchEvent = Event & {
//   request: Request;
//   respondWith(response: Promise<Response> | Response): void;
// };

// install event
addEventListener('install', ((event: ExtendableEvent) => {
  console.log('Service Worker installed', event);
}) as EventListener);

// activate event
addEventListener('activate', ((event: ExtendableEvent) => {
  console.log('Service Worker activated', event);
}) as EventListener);

// fetch event
addEventListener('fetch', ((event: FetchEvent) => {
  console.log('Fetching:', event.request.url);
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
}) as EventListener);

// export {};
