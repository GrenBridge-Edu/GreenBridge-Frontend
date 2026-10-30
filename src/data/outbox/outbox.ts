import axios from "axios";
import { getPendingOutbox, removeOutboxItem, db } from "../db/db";

let isDraining = false;

export const drainOutbox = async () => {
	if (isDraining) return;
	isDraining = true;
	try {
		const pending = await getPendingOutbox();
		if (!pending.length) return;
		for (const item of pending) {
			try {
				await axios({
					method: item.method,
					url: item.endpoint,
					data: item.body,
					headers: item.headers,
				});
				await removeOutboxItem(item.id!);
			} catch {
				const newRetries = item.retries + 1;
				if (newRetries >= item.maxRetries) {
					await removeOutboxItem(item.id!);
				} else {
					await db.outbox.update(item.id!, { retries: newRetries });
				}
			}
		}
	} finally {
		isDraining = false;
	}
};

let listenerRegistered = false;

export const registerOutboxSyncListener = () => {
	if (listenerRegistered) return;
	listenerRegistered = true;
	if ("serviceWorker" in navigator && "SyncManager" in window) {
		navigator.serviceWorker.ready.then(reg => {
			// @ts-expect-error SyncManager types
			reg.sync
				.register("outbox-sync")
				.catch(() => window.addEventListener("online", drainOutbox));
		});
	} else {
		window.addEventListener("online", drainOutbox);
	}
	if (navigator.onLine) drainOutbox();
};
