import { useMemo } from "react";

import {
	getContentBlock,
	getContentBlockFields,
	mergeSectionFields,
	useContentBlocksQuery,
} from "../../../data/hooks/useContentBlocks";

export type AboutSectionName =
	| "hero"
	| "story"
	| "mission-vision"
	| "values"
	| "team";

export type AboutFields = Record<string, unknown>;

export const useAboutSection = <T extends AboutFields>(
	section: AboutSectionName,
	defaults: T,
) => {
	const query = useContentBlocksQuery("about");

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
