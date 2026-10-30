import { api } from "../apiClient";

export interface ResourceAsset {
	url: string;
	publicId: string;
	resourceType?: string;
	format?: string;
	bytes?: number;
}

export interface Resource {
	_id?: string;
	id?: string;
	title: string;
	category?: string;
	description?: string;
	serialNo?: number;
	statusText?: string;
	uploadType?: string;
	uploadURL?: string;
	uploadFile?: ResourceAsset;
	thumbnailFile?: ResourceAsset;
	createdAt?: string;
}

export interface ResourceListParams {
	page?: number;
	limit?: number;
	category?: string;
	[key: string]: unknown;
}

export interface ResourcesResponse {
	success: boolean;
	data: Resource[];
	meta: {
		page?: number;
		limit?: number;
		total?: number;
		totalItems?: number;
		totalPages?: number;
		hasNextPage?: boolean;
		hasPreviousPage?: boolean;
		[key: string]: unknown;
	};
}

export interface ResourceCategoriesResponse {
	success: boolean;
	message: string;
	data: string[];
}

export const resourcesApi = {
	listPublic: (params: ResourceListParams = {}) =>
		api.get<ResourcesResponse>("/v1/resources/public", {
			params,
			showErrorToast: false,
		}),
	getCategories() {
		return api.get<ResourceCategoriesResponse>(`v1/resources/categories`);
	},
};
