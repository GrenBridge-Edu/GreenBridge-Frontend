import { useMemo } from "react";

import {
	getContentBlock,
	getContentBlockFields,
	mergeSectionFields,
	useContentBlocksQuery,
} from "../../../data/hooks/useContentBlocks";

export type ContactSectionName =
	| "hero"
	| "contact-details"
	| "contact-form"
	| "social-links"
	| "faqs";

export type ContactFields = Record<string, unknown>;

export const useContactSection = <T extends object>(
	section: ContactSectionName,
	defaults: T,
) => {
	const query = useContentBlocksQuery("contact");

	const fields = useMemo(
		() =>
			mergeSectionFields(
				defaults as ContactFields,
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
