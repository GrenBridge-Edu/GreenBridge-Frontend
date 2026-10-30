import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
	contentBlocksApi,
	type ContentBlock,
	type ContentBlockFields,
	type ContentPageValue,
} from "../endpoints/contentBlocks.api";

export const contentBlockQueryKeys = {
	all: ["content-blocks"] as const,
	page: (page: ContentPageValue) => ["content-blocks", page] as const,
};

export const useContentBlocksQuery = (page: ContentPageValue) =>
	useQuery({
		queryKey: contentBlockQueryKeys.page(page),
		queryFn: async () => {
			const response = await contentBlocksApi.listByPage(page);
			return response.data;
		},
		staleTime: 0,
		gcTime: Infinity,
		refetchOnMount: "always",
		refetchOnWindowFocus: true,
		refetchInterval: 60_000,
		refetchIntervalInBackground: false,
	});

export const useContentBlocksCache = () => {
	const queryClient = useQueryClient();

	return {
		invalidatePage: (page: ContentPageValue) =>
			queryClient.invalidateQueries({
				queryKey: contentBlockQueryKeys.page(page),
			}),
		invalidateAll: () =>
			queryClient.invalidateQueries({
				queryKey: contentBlockQueryKeys.all,
			}),
	};
};

export const getContentBlock = (
	blocks: ContentBlock[] | undefined,
	section: string,
): ContentBlock | undefined => blocks?.find(block => block.section === section);

export const getContentBlockFields = (
	blocks: ContentBlock[] | undefined,
	section: string,
): ContentBlockFields => getContentBlock(blocks, section)?.fields ?? {};

export const mergeSectionFields = <T extends Record<string, unknown>>(
	defaults: T,
	overrides: ContentBlockFields | undefined,
): T => {
	if (!overrides) {
		return defaults;
	}

	const merged = { ...defaults };

	for (const key of Object.keys(defaults) as (keyof T)[]) {
		const override = overrides[String(key)];
		const defaultValue = defaults[key];

		if (typeof defaultValue === "string" && typeof override === "string") {
			if (override.trim()) {
				merged[key] = override as T[keyof T];
			}

			continue;
		}

		if (Array.isArray(defaultValue) && Array.isArray(override)) {
			merged[key] = override as T[keyof T];
			continue;
		}

		if (
			defaultValue !== null &&
			typeof defaultValue === "object" &&
			!Array.isArray(defaultValue) &&
			override !== null &&
			typeof override === "object" &&
			!Array.isArray(override)
		) {
			merged[key] = {
				...(defaultValue as Record<string, unknown>),
				...(override as Record<string, unknown>),
			} as T[keyof T];

			continue;
		}

		if (typeof defaultValue === "boolean" && typeof override === "boolean") {
			merged[key] = override as T[keyof T];
		}

		if (typeof defaultValue === "number" && typeof override === "number") {
			merged[key] = override as T[keyof T];
		}
	}

	return merged;
};
