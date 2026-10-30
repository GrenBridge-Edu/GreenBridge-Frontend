import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
	programsApi,
	type PaginatedResponse,
	type Program,
	type ProgramListParams,
} from "../endpoints/programs.api";

import {
	resourcesApi,
	type Resource,
	type ResourceCategoriesResponse,
	type ResourceListParams,
	type ResourcesResponse,
} from "../endpoints/resources.api";

const HOME_PREVIEW_LIMIT = 4;
const LIST_PAGE_LIMIT = 12;

export const homeContentKeys = {
	programs: ["programs", "public"] as const,
	resources: ["resources", "public"] as const,
};

export const useHomeProgramsQuery = (limit = HOME_PREVIEW_LIMIT) =>
	useQuery({
		queryKey: [...homeContentKeys.programs, "home", limit],
		queryFn: async () => {
			const response = await programsApi.listPublic({
				page: 1,
				limit,
			});

			return response.data;
		},
		staleTime: 0,
		gcTime: Infinity,
		refetchOnMount: "always",
		refetchOnWindowFocus: true,
		refetchInterval: 60_000,
		refetchIntervalInBackground: false,
	});

export const useHomeResourcesQuery = (limit = HOME_PREVIEW_LIMIT) =>
	useQuery({
		queryKey: [...homeContentKeys.resources, "home", limit],
		queryFn: async () => {
			const response = await resourcesApi.listPublic({
				page: 1,
				limit,
			});

			return response.data;
		},
		staleTime: 0,
		gcTime: Infinity,
		refetchOnMount: "always",
		refetchOnWindowFocus: true,
		refetchInterval: 60_000,
		refetchIntervalInBackground: false,
	});

type PageResponse<T> = {
	success: boolean;
	data: T[];
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
};

function getNextPage<T>(
	lastPage: PageResponse<T>,
	allPages: PageResponse<T>[],
	pageSize: number,
): number | undefined {
	const meta = lastPage.meta;
	const currentPage =
		typeof meta.page === "number" ? meta.page : allPages.length;

	if (meta.hasNextPage === true) {
		return currentPage + 1;
	}

	if (meta.hasNextPage === false) {
		return undefined;
	}

	if (typeof meta.totalPages === "number") {
		return currentPage < meta.totalPages ? currentPage + 1 : undefined;
	}

	const total =
		typeof meta.total === "number"
			? meta.total
			: typeof meta.totalItems === "number"
				? meta.totalItems
				: undefined;

	if (total !== undefined) {
		const loadedCount = allPages.reduce(
			(count, page) => count + page.data.length,
			0,
		);

		return loadedCount < total ? currentPage + 1 : undefined;
	}

	return lastPage.data.length === pageSize ? currentPage + 1 : undefined;
}

export const useInfiniteProgramsQuery = (
	filters: Omit<ProgramListParams, "page" | "limit"> = {},
) =>
	useInfiniteQuery<
		PaginatedResponse<Program>,
		Error,
		{
			pages: PaginatedResponse<Program>[];
			pageParams: number[];
		},
		readonly unknown[],
		number
	>({
		queryKey: [...homeContentKeys.programs, "infinite", filters],
		initialPageParam: 1,
		queryFn: ({ pageParam }) =>
			programsApi.listPublic({
				...filters,
				page: pageParam,
				limit: LIST_PAGE_LIMIT,
			}),
		getNextPageParam: (lastPage, allPages) =>
			getNextPage<Program>(lastPage, allPages, LIST_PAGE_LIMIT),
		staleTime: 0,
		gcTime: Infinity,
		refetchOnMount: "always",
		refetchOnWindowFocus: true,
		refetchInterval: 60_000,
		refetchIntervalInBackground: false,
	});

export const useInfiniteResourcesQuery = (
	filters: Omit<ResourceListParams, "page" | "limit"> = {},
) =>
	useInfiniteQuery<
		ResourcesResponse,
		Error,
		{
			pages: ResourcesResponse[];
			pageParams: number[];
		},
		readonly unknown[],
		number
	>({
		queryKey: [...homeContentKeys.resources, "infinite", filters],
		initialPageParam: 1,
		queryFn: ({ pageParam }) =>
			resourcesApi.listPublic({
				...filters,
				page: pageParam,
				limit: LIST_PAGE_LIMIT,
			}),
		getNextPageParam: (lastPage, allPages) =>
			getNextPage<Resource>(lastPage, allPages, LIST_PAGE_LIMIT),
		staleTime: 0,
		gcTime: Infinity,
		refetchOnMount: "always",
		refetchOnWindowFocus: true,
		refetchInterval: 60_000,
		refetchIntervalInBackground: false,
	});

export const useInfiniteResourcesCategoryQuery = () =>
	useInfiniteQuery<
		ResourceCategoriesResponse,
		Error,
		{
			pages: ResourceCategoriesResponse[];
			pageParams: number[];
		},
		readonly unknown[],
		number
	>({
		queryKey: [...homeContentKeys.resources, "infinite", "category"],
		initialPageParam: 1,
		queryFn: () => resourcesApi.getCategories(),
		getNextPageParam: () => {},
		staleTime: 0,
		gcTime: Infinity,
		refetchOnMount: "always",
		refetchOnWindowFocus: true,
		refetchInterval: 60_000,
		refetchIntervalInBackground: false,
	});
