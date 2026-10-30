import axios, { type AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export const apiClient = axios.create({ baseURL: API_BASE_URL });

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export interface FetchOptions extends AxiosRequestConfig {
	showErrorToast?: boolean;
	queueOffline?: boolean;
	offlineTag?: string;
	offlineMeta?: Record<string, unknown>;
}

export async function fetcher<T = unknown>(
	method: HttpMethod,
	url: string,
	data?: unknown,
	options: FetchOptions = {},
): Promise<T> {
	const {
		showErrorToast = true,
		queueOffline = false,
		offlineTag,
		offlineMeta,
		...axiosOptions
	} = options;

	// Offline mutation queuing IS relevant here, unlike admin — a guest placing an order
	// or submitting a review while briefly offline is a real scenario for a storefront PWA.
	if (!navigator.onLine && method !== "GET" && queueOffline) {
		const { enqueueRequest } = await import("./db/db");
		await enqueueRequest({
			endpoint: url,
			method: method as "POST" | "PATCH" | "DELETE" | "PUT",
			body: data,
			maxRetries: 3,
			tag: offlineTag,
			meta: offlineMeta,
		});
		return { queued: true, offline: true } as T;
	}

	try {
		const res = await apiClient({
			method,
			url,
			data,
			...axiosOptions,
		});

		return res.data as T;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		const isNetworkError =
			!err?.response &&
			(err?.code === "ERR_NETWORK" || err?.message === "Network Error");

		// Silent only for GET + network error.
		const shouldShowToast =
			showErrorToast && !(method === "GET" && isNetworkError);

		if (shouldShowToast) {
			const message =
				err?.response?.data?.message ?? err?.message ?? "Something went wrong";

			toast.error(message);
		}

		throw err;
	}
}

export const api = {
	get: <T = unknown>(url: string, opts?: FetchOptions) =>
		fetcher<T>("GET", url, undefined, opts),
	post: <T = unknown>(url: string, data?: unknown, opts?: FetchOptions) =>
		fetcher<T>("POST", url, data, opts),
	patch: <T = unknown>(url: string, data?: unknown, opts?: FetchOptions) =>
		fetcher<T>("PATCH", url, data, opts),
	put: <T = unknown>(url: string, data?: unknown, opts?: FetchOptions) =>
		fetcher<T>("PUT", url, data, opts),
	delete: <T = unknown>(url: string, opts?: FetchOptions) =>
		fetcher<T>("DELETE", url, undefined, opts),
};
