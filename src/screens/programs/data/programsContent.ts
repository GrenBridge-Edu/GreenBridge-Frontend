import { useMemo } from "react";

import {
	getContentBlock,
	getContentBlockFields,
	mergeSectionFields,
	useContentBlocksQuery,
} from "../../../data/hooks/useContentBlocks";

export type ProgramsSectionName = "hero" | "introduction";

export type ProgramsFields = Record<string, unknown>;

export const useProgramsSection = <T extends ProgramsFields>(
	section: ProgramsSectionName,
	defaults: T,
) => {
	const query = useContentBlocksQuery("programs");

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
