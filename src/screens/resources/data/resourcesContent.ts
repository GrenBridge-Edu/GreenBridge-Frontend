import { useMemo } from "react";

import {
	getContentBlock,
	getContentBlockFields,
	mergeSectionFields,
	useContentBlocksQuery,
} from "../../../data/hooks/useContentBlocks";

export type ResourcesSectionName = "hero" | "introduction";

export type ResourcesFields = Record<string, unknown>;

export const useResourcesSection = <T extends ResourcesFields>(
	section: ResourcesSectionName,
	defaults: T,
) => {
	const query = useContentBlocksQuery("resources");

	const fields = useMemo(
		() =>
			mergeSectionFields(
				defaults,
				getContentBlockFields(query.data, section),
			) as T,
		[defaults, query.data, section],
	);

	return {
		...query,
		fields,
		block: getContentBlock(query.data, section),
	};
};
