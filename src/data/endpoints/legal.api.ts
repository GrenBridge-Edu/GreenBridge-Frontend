import { api } from "../apiClient";

export type LegalSlugValue =
	| "terms"
	| "privacy-policy"
	| "donation-policy"
	| "volunteer-policy";

export interface LegalDoc {
	slug: LegalSlugValue;
	title: string;
	content: string;
	updatedAt: string;
}

export const legalApi = {
	listAll: () => api.get<{ success: boolean; data: LegalDoc[] }>("/v1/legal"),
	getBySlug: (slug: LegalSlugValue) =>
		api.get<{ success: boolean; data: LegalDoc }>(`/v1/legal/${slug}`),
};
