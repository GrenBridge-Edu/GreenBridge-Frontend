import { useMemo } from "react";

import {
	getContentBlock,
	getContentBlockFields,
	mergeSectionFields,
	useContentBlocksQuery,
} from "../../../data/hooks/useContentBlocks";

export type GetInvolvedSectionName = "hero" | "team" | "donate" | "partner";

export type GetInvolvedFields = Record<string, unknown>;

export const useGetInvolvedSection = <T extends GetInvolvedFields>(
	section: GetInvolvedSectionName,
	defaults: T,
) => {
	const query = useContentBlocksQuery("get-involved");

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
