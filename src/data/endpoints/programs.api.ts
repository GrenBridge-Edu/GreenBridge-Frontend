import { api } from "../apiClient";

export interface ProgramThumbnail {
	url: string;
	publicId: string;
}

export interface Program {
	_id?: string;
	id?: string;
	title: string;
	caption?: string;
	description?: string;
	target?: number;
	serialNo?: number;
	statusText?: string;
	startDuration?: string;
	endDuration?: string;
	thumbnail?: ProgramThumbnail;
	enableGeneralDonation?: boolean;
	isTargetReached?: boolean;
	totalRaised?: number;
	numberOfDonors?: number;
	progress?: number;
	createdAt?: string;
}

export interface PaginationMeta {
	page?: number;
	limit?: number;
	total?: number;
	totalItems?: number;
	totalPages?: number;
	hasNextPage?: boolean;
	hasPreviousPage?: boolean;
	[key: string]: unknown;
}

export interface PaginatedResponse<T> {
	success: boolean;
	data: T[];
	meta: PaginationMeta;
}

export interface ProgramListParams {
	page?: number;
	limit?: number;
	programType?: "ONGOING" | "PAST" | string;
	[key: string]: unknown;
}

export const programsApi = {
	listPublic: (params: ProgramListParams = {}) =>
		api.get<PaginatedResponse<Program>>("/v1/programs/public", {
			params,
			showErrorToast: false,
		}),
};
