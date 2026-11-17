import { useEffect, useMemo, useRef, useState } from "react";
import { LoaderCircle, ListFilter } from "lucide-react";
import {
	useInfiniteResourcesCategoryQuery,
	useInfiniteResourcesQuery,
} from "../../../data/queries/homeContent.queries";
import type { Resource } from "../../../data/endpoints/resources.api";

import { asText } from "../../home/data/homeContent";
import { useResourcesSection } from "../data/resourcesContent";
import { fallbackResources as resources } from "../../home/components/Resources";
import ResourceComponent from "../../home/components/ResourceComponent";
import Reveal from "../../../components/shared/Reveal";
import SafeHtml from "../../../components/SafeHtml";

const DEFAULTS = {
	title: "Resources",
	subtitle:
		"Explore inspiring stories, visual insights, and updates from our journey toward sustainability and quality education for all.",
	description:
		"Quickly find specific resources to learn more about our impact or support your own initiatives.",
};

const AllResources = () => {
	const { fields } = useResourcesSection("introduction", DEFAULTS);

	const [category, setCategory] = useState("");

	const sentinelRef = useRef<HTMLDivElement | null>(null);

	const filters = useMemo(
		() => ({
			category: category || undefined,
		}),
		[category],
	);

	const {
		data,
		isLoading,
		isError,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useInfiniteResourcesQuery(filters);

	const { data: categories, isLoading: categoriesLoading } =
		useInfiniteResourcesCategoryQuery();

	const fetchedResources = useMemo<Resource[]>(
		() =>
			data?.pages.flatMap(page =>
				Array.isArray(page.data) ? page.data : [],
			) ?? [],
		[data],
	);

	const displayResources = useMemo<Resource[]>(() => {
		if (fetchedResources.length > 0) {
			return fetchedResources;
		}

		const fallbackResources = resources as unknown as Resource[];

		if (!category) {
			return fallbackResources;
		}

		return fallbackResources.filter(
			resource => resource.category?.toLowerCase() === category.toLowerCase(),
		);
	}, [category, fetchedResources]);

	useEffect(() => {
		const sentinel = sentinelRef.current;

		if (
			!sentinel ||
			!hasNextPage ||
			isFetchingNextPage ||
			isLoading ||
			isError
		) {
			return;
		}

		const observer = new IntersectionObserver(
			entries => {
				if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
					void fetchNextPage();
				}
			},
			{
				root: null,
				rootMargin: "300px",
				threshold: 0,
			},
		);

		observer.observe(sentinel);

		return () => observer.disconnect();
	}, [fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading]);

	const fetchedCategoryResources = useMemo<string[]>(
		() =>
			categories?.pages.flatMap(page =>
				Array.isArray(page.data) ? page.data : [],
			) ?? [],
		[categories],
	);

	return (
		<section className="relative overflow-hidden px-6 py-12 md:px-40 md:py-24">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-[#D8EAE0]/40 blur-3xl"
			/>

			<div className="relative grid items-end gap-8 md:grid-cols-2">
				<div className="flex flex-col">
					<Reveal>
						<h1 className="py-1 text-[32px] font-bold capitalize tracking-tight text-[#1A1A1A] md:text-4xl">
							{asText(fields.title, DEFAULTS.title)}
						</h1>
					</Reveal>

					<Reveal delay={100}>
						<p className="max-w-2xl text-[16px] leading-relaxed text-[#3A3A3A]">
							{asText(fields.subtitle, DEFAULTS.subtitle)}
						</p>
					</Reveal>
				</div>

				<Reveal
					delay={160}
					distance={20}
					className="md:absolute md:right-5 md:-top-20 md:z-30 md:w-full md:max-w-lg">
					<div className="min-h-48 w-full rounded-2xl border border-[#236B45]/5 bg-[#D8EAE0] p-5 shadow-sm md:p-8">
						<p className="pb-5 text-[15px] leading-relaxed text-[#3A3A3A]">
							<SafeHtml
								html={asText(fields.description, DEFAULTS.description)}
							/>
						</p>

						<div className="relative">
							<ListFilter
								size={20}
								aria-hidden="true"
								className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#3A3A3A]"
							/>

							<select
								name="category"
								aria-label="Filter resources by category"
								className="w-full cursor-pointer appearance-none rounded-xl border border-gray-300 bg-[#f7f7f7] p-4 pl-12 capitalize text-[#3A3A3A] transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#236B45]/30"
								value={category}
								onChange={event => setCategory(event.target.value)}
								disabled={categoriesLoading}>
								<option value="">
									{categoriesLoading
										? "Loading categories..."
										: "Filter by Category"}
								</option>

								{fetchedCategoryResources?.map(item => (
									<option value={item} key={item}>
										{item}
									</option>
								))}
							</select>
						</div>
					</div>
				</Reveal>
			</div>

			<div className="relative">
				{isLoading && fetchedResources.length === 0 ? (
					<div className="flex min-h-48 items-center justify-center">
						<LoaderCircle
							className="animate-spin text-[#236B45]"
							size={32}
							aria-label="Loading resources"
						/>
					</div>
				) : (
					<>
						{displayResources.length === 0 ? (
							<Reveal>
								<p className="py-10 text-[#3A3A3A]">
									No resources are available for this category right now.
								</p>
							</Reveal>
						) : (
							<div className="grid gap-7 pt-12 md:grid-cols-3">
								{displayResources.map((resource, index) => (
									<Reveal
										key={
											resource._id ??
											resource.id ??
											`${String(resource.title ?? "resource")}-${index}`
										}
										delay={(index % 3) * 100}
										distance={24}>
										<ResourceComponent
											resource={resource as unknown as Record<string, string>}
										/>
									</Reveal>
								))}
							</div>
						)}

						{!isError && (
							<>
								<div ref={sentinelRef} className="h-2 w-full" />

								{isFetchingNextPage && (
									<div className="flex justify-center py-8 text-sm text-[#3A3A3A]">
										<LoaderCircle
											className="animate-spin"
											size={24}
											aria-label="Loading more resources"
										/>
									</div>
								)}

								{!hasNextPage &&
									fetchedResources.length > 0 &&
									!isFetchingNextPage && (
										<hr className="mt-8 border-gray-100" />
									)}
							</>
						)}
					</>
				)}
			</div>
		</section>
	);
};

export default AllResources;
