const ICON_PROPS = {
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2.5,
	strokeLinecap: "round" as const,
	strokeLinejoin: "round" as const,
};

export const EmptyProductsIcon = () => (
	<svg
		viewBox="0 0 80 80"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="h-full w-full"
		aria-hidden="true">
		<rect x="14" y="26" width="52" height="40" rx="4" {...ICON_PROPS} />
		<path d="M14 38h52M28 26v-6a12 12 0 0 1 24 0v6" {...ICON_PROPS} />
		<circle cx="40" cy="50" r="6" {...ICON_PROPS} />
	</svg>
);

export const EmptyOrdersIcon = () => (
	<svg
		viewBox="0 0 80 80"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="h-full w-full"
		aria-hidden="true">
		<path
			d="M16 22h48l-4 34a4 4 0 0 1-4 3.6H24a4 4 0 0 1-4-3.6L16 22Z"
			{...ICON_PROPS}
		/>
		<path d="M28 22v-4a12 12 0 0 1 24 0v4" {...ICON_PROPS} />
		<path d="M30 34v14M50 34v14" {...ICON_PROPS} />
	</svg>
);

export const EmptyReviewsIcon = () => (
	<svg
		viewBox="0 0 80 80"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="h-full w-full"
		aria-hidden="true">
		<path
			d="M40 16 47 33l18 2-14 12 4 18-15-9-15 9 4-18-14-12 18-2 7-17Z"
			{...ICON_PROPS}
		/>
	</svg>
);

export const EmptyBlogIcon = () => (
	<svg
		viewBox="0 0 80 80"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="h-full w-full"
		aria-hidden="true">
		<rect x="18" y="14" width="44" height="52" rx="3" {...ICON_PROPS} />
		<path d="M28 28h24M28 38h24M28 48h16" {...ICON_PROPS} />
	</svg>
);

export const EmptyNewsletterIcon = () => (
	<svg
		viewBox="0 0 80 80"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="h-full w-full"
		aria-hidden="true">
		<rect x="12" y="22" width="56" height="38" rx="4" {...ICON_PROPS} />
		<path d="M12 26l28 20 28-20" {...ICON_PROPS} />
	</svg>
);

export const EmptySearchIcon = () => (
	<svg
		viewBox="0 0 80 80"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="h-full w-full"
		aria-hidden="true">
		<circle cx="34" cy="34" r="18" {...ICON_PROPS} />
		<path d="M47 47l14 14" {...ICON_PROPS} />
	</svg>
);
