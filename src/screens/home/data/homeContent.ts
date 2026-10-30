import { useMemo } from "react";
import {
	getContentBlock,
	getContentBlockFields,
	mergeSectionFields,
	useContentBlocksQuery,
} from "../../../data/hooks/useContentBlocks";
import type {
	ContentBlock,
	ContentBlockImageVariant,
} from "../../../data/endpoints/contentBlocks.api";

export type HomeSectionName =
	| "hero"
	| "impact"
	| "work"
	| "stories"
	| "make-a-difference"
	| "resources"
	| "partners";

export type HomeFields = Record<string, unknown>;

export interface HomeImageVariants {
	default?: string;
	desktop?: string;
	tablet?: string;
	mobile?: string;
}

export interface HomeVisibility {
	global?: boolean;
	desktop?: boolean;
	tablet?: boolean;
	mobile?: boolean;
}

export const useHomeSection = <T extends HomeFields>(
	section: HomeSectionName,
	defaults: T,
) => {
	const query = useContentBlocksQuery("home");

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

export const asRecord = (value: unknown): Record<string, unknown> => {
	if (value !== null && typeof value === "object" && !Array.isArray(value)) {
		return value as Record<string, unknown>;
	}

	return {};
};

export const asText = (value: unknown, fallback = ""): string =>
	typeof value === "string" && value.trim() ? value : fallback;

export const asItems = <T>(value: unknown): T[] =>
	Array.isArray(value) ? (value as T[]) : [];

export const getImageUrl = (value: unknown): string => {
	if (typeof value === "string") return value;

	const record = asRecord(value);

	return asText(record.url, asText(record.secure_url, asText(record.src)));
};

const readVariants = (value: unknown): HomeImageVariants => {
	const record = asRecord(value);

	return {
		default: getImageUrl(record.default),
		desktop: getImageUrl(record.desktop),
		tablet: getImageUrl(record.tablet),
		mobile: getImageUrl(record.mobile),
	};
};

const firstNonEmpty = (...values: string[]): string =>
	values.find(value => Boolean(value.trim())) ?? "";

export const getResponsiveImages = (
	item?: unknown,
	block?: ContentBlock,
	itemIndex?: number,
): HomeImageVariants => {
	const itemRecord = asRecord(item);
	const blockRecord = asRecord(block);

	const itemImages = readVariants(itemRecord.images);
	const itemVariants = readVariants(itemRecord.imageVariants);
	const blockImages = readVariants(blockRecord.images);

	const rawItemImages = asRecord(
		asRecord(blockRecord.itemImages)[String(itemIndex ?? "")],
	);

	const indexedImages = readVariants(rawItemImages);

	const result: HomeImageVariants = {
		default: firstNonEmpty(
			itemImages.default ?? "",
			itemVariants.default ?? "",
			indexedImages.default ?? "",
			blockImages.default ?? "",
			asText(itemRecord.imageUrl),
			asText(blockRecord.imageUrl),
		),
		desktop: firstNonEmpty(
			itemImages.desktop ?? "",
			itemVariants.desktop ?? "",
			indexedImages.desktop ?? "",
			blockImages.desktop ?? "",
		),
		tablet: firstNonEmpty(
			itemImages.tablet ?? "",
			itemVariants.tablet ?? "",
			indexedImages.tablet ?? "",
			blockImages.tablet ?? "",
		),
		mobile: firstNonEmpty(
			itemImages.mobile ?? "",
			itemVariants.mobile ?? "",
			indexedImages.mobile ?? "",
			blockImages.mobile ?? "",
		),
	};

	return result;
};

export const visibilityClasses = (value: unknown): string => {
	const visibility = asRecord(value) as HomeVisibility;

	const globalVisible = visibility.global !== false;
	const mobileVisible = visibility.mobile ?? globalVisible;
	const tabletVisible = visibility.tablet ?? globalVisible;
	const desktopVisible = visibility.desktop ?? globalVisible;

	if (!globalVisible) {
		return [
			"hidden",
			mobileVisible ? "max-md:!block" : "",
			tabletVisible ? "md:max-lg:!block" : "",
			desktopVisible ? "lg:!block" : "",
		]
			.filter(Boolean)
			.join(" ");
	}

	return [
		!mobileVisible ? "max-md:!hidden" : "",
		!tabletVisible ? "md:max-lg:!hidden" : "",
		!desktopVisible ? "lg:!hidden" : "",
	]
		.filter(Boolean)
		.join(" ");
};

export const getImageForViewport = (images: HomeImageVariants): string =>
	images.default || images.desktop || images.tablet || images.mobile || "";

export const getVariant = (
	images: HomeImageVariants,
	variant: ContentBlockImageVariant,
): string => images[variant] ?? "";

export const formatCurrency = (amount: string | number) => {
	const value = Number(amount);

	if (!Number.isFinite(value)) {
		return `NGN 0`;
	}

	try {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
			maximumFractionDigits: 2,
		}).format(value);
	} catch {
		return `NGN ${value.toLocaleString("en-NG")}`;
	}
};
