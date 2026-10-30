import { api } from "../apiClient";

export type ContentPageValue =
	| "home"
	| "about"
	| "programs"
	| "resources"
	| "get-involved"
	| "contact"
	| "global";

export type ContentBlockImageVariant =
	| "default"
	| "desktop"
	| "tablet"
	| "mobile";

export type ContentBlockFields = Record<string, unknown>;

export interface ContentBlockImage {
	url: string;
	publicId: string;
}

export interface ContentBlock {
	_id?: string;
	id?: string;
	page: ContentPageValue;
	section: string;
	label: string;
	fields: ContentBlockFields;
	imageUrl?: string;
	imagePublicId?: string;
	images?: Partial<
		Record<Exclude<ContentBlockImageVariant, "default">, ContentBlockImage>
	>;
	order?: number;
	updatedAt?: string;
}

export interface ContentBlocksResponse {
	success: boolean;
	data: ContentBlock[];
}

export const contentBlocksApi = {
	listByPage: (page: ContentPageValue) =>
		api.get<ContentBlocksResponse>("/v1/content-blocks", {
			params: { page },
		}),
};
