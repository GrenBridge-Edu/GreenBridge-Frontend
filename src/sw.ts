/// <reference lib="webworker" />

import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();

self.addEventListener("activate", event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event: PushEvent) => {
	const data = event.data?.json() ?? {};
	event.waitUntil(
		self.registration.showNotification(data.title ?? "Green Bridge", {
			body: data.body,
			icon: "favicon.ico",
			data: {
				url: data.url,
			},
		}),
	);
});

self.addEventListener("notificationclick", (event: NotificationEvent) => {
	event.notification.close();
	event.waitUntil(self.clients.openWindow(event.notification.data?.url ?? "/"));
});
