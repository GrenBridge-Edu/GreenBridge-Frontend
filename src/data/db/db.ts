import Dexie, { type Table } from "dexie";

export interface OutboxRequest {
	id?: number;
	endpoint: string;
	method: "POST" | "PATCH" | "PUT" | "DELETE";
	body?: unknown;
	headers?: Record<string, string>;
	retries: number;
	maxRetries: number;
	createdAt: number;
	tag?: string;
	meta?: Record<string, unknown>;
}

class GreenBridgeDB extends Dexie {
	outbox!: Table<OutboxRequest, number>;

	constructor() {
		super("GreenBridgeDB");

		this.version(2).stores({
			outbox: "++id, endpoint, method, tag, createdAt, retries",
		});
	}
}

export const db = new GreenBridgeDB();

// ─── Outbox ─────────────────────────────────────────────────────────────────

export const enqueueRequest = (
	req: Omit<OutboxRequest, "id" | "retries" | "createdAt">,
) =>
	db.outbox.add({
		...req,
		retries: 0,
		maxRetries: req.maxRetries ?? 3,
		createdAt: Date.now(),
	});

export const getPendingOutbox = () => db.outbox.orderBy("createdAt").toArray();

export const removeOutboxItem = (id: number) => db.outbox.delete(id);
