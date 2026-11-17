import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { useHomeResourcesQuery } from "../../../data/queries/homeContent.queries";

import { asText, useHomeSection } from "../data/homeContent";

import Reveal from "../../../components/shared/Reveal";
import ResourceComponent from "./ResourceComponent";
import SafeHtml from "../../../components/SafeHtml";

const fallbackImages = [
	"/images/homeResources1.png",
	"/images/homeResources2.png",
	"/images/homeResources3.png",
	"/images/homeBG3.jpg",
	"/images/homeResources1.png",
	"/images/homeResources4.png",
	"/images/homeResources5.png",
	"/images/homeBG3.jpg",
	"/images/homeResources4.png",
];

const DEFAULTS = {
	title: "Learn. Grow. Take Action.",
	description:
		"Discover stories, guides, and updates from our work and partners — from classroom innovations to community impact projects and environmental solutions.",
	buttonText: "See all Resources",
	buttonLink: "/resources",
};

// eslint-disable-next-line react-refresh/only-export-components
export const fallbackResources = [
	{
		thumbnailFile: { secure_url: fallbackImages[0] },
		title: "Bridging Sustainability Through Education",
		description:
			"Education remains the most powerful tool for sustainable growth. Here’s how Green Bridge’s school outreach programs are shaping brighter futures.",
		category: "BLOG",
		btnText: "read more",
	},
	{
		thumbnailFile: { secure_url: fallbackImages[1] },
		title: "Green Energy Fair 2025 in Pictures",
		description:
			"A glimpse into our recent Green Energy Fair — bringing together innovators, students, and community leaders to discuss eco-solutions.",
		category: "NEWS",
	},
	{
		thumbnailFile: { secure_url: fallbackImages[2] },
		title: "Water for All: A Short Documentary",
		description:
			"Watch how local partnerships helped us provide clean water to three underserved communities across Lagos.",
		category: "Educational video",
		btnText: "watch now",
	},
	{
		thumbnailFile: { secure_url: fallbackImages[3] },
		title: "Water for All: A Short Documentary",
		description:
			"Watch how local partnerships helped us provide clean water to three underserved communities across Lagos.",
		category: "INFOGRAPHICS",
		btnText: "download",
	},
	{
		thumbnailFile: { secure_url: fallbackImages[4] },
		title: "Renewable Energy at the Community Level",
		description:
			"It covers cost models, sustainability metrics, and local empowerment strategies that make renewable energy accessible to all.",
		category: "INFOGRAPHICS",
		btnText: "download",
	},
	{
		thumbnailFile: { secure_url: fallbackImages[5] },
		title: "Renewable Energy at the Community Level",
		description:
			"It covers cost models, sustainability metrics, and local empowerment strategies that make renewable energy accessible to all.",
		category: "Blogs",
	},
	{
		thumbnailFile: { secure_url: fallbackImages[6] },
		title: "The Power of Quality Education in Sustainable",
		description:
			"This article explores how investing in learning opportunities helps communities innovate, adapt to climate change, and build lasting social progress.",
		category: "BLOG",
	},
	{
		thumbnailFile: { secure_url: fallbackImages[7] },
		title: "Building a Sustainable Future Together",
		description:
			"A short documentary capturing Green Bridge’s outreach programs, showcasing children and volunteers.",
		category: "video",
		btnText: "watch",
	},
	{
		thumbnailFile: { secure_url: fallbackImages[8] },
		title: "Renewable Energy at the Community Level",
		description:
			"It covers cost models, sustainability metrics, and local empowerment strategies that make renewable energy accessible to all.",
		category: "INFOGRAPHICS",
		btnText: "download",
	},
];

const OurResources = () => {
	const { fields } = useHomeSection("resources", DEFAULTS);
	const { data: resources = [], isLoading } = useHomeResourcesQuery(9);

	const displayedResources =
		resources.length > 0 ? resources.slice(0, 9) : fallbackResources;

	const pairs: (typeof fallbackResources)[] = [];

	for (let index = 0; index < displayedResources.length; index += 3) {
		pairs.push(
			displayedResources.slice(index, index + 3) as typeof fallbackResources,
		);
	}

	const resourcesLink =
		asText(fields.buttonLink, DEFAULTS.buttonLink) || DEFAULTS.buttonLink;

	return (
		<section className="relative overflow-hidden bg-white px-6 py-16 sm:px-10 md:px-16 md:py-24 lg:px-40">
			<div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#EAF4ED] opacity-60 blur-3xl" />

			<div className="relative">
				<div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-10">
					<div className="flex flex-col">
						<Reveal distance={16}>
							<span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2A8C56]">
								<span className="h-1.5 w-1.5 rounded-full bg-[#2A8C56]" />
								Resources
							</span>
						</Reveal>

						<Reveal distance={20} delay={80}>
							<h2 className="max-w-xl py-1 text-3xl font-bold leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl">
								{asText(fields.title, DEFAULTS.title)}
							</h2>
						</Reveal>

						<Reveal distance={20} delay={140}>
							<p className="mt-3 max-w-2xl text-sm leading-7 text-[#5A5A5A] sm:text-base">
								<SafeHtml
									html={asText(fields.description, DEFAULTS.description)}
								/>
							</p>
						</Reveal>
					</div>

					<Reveal
						distance={16}
						delay={180}
						className="hidden items-center justify-end md:flex">
						<Link
							to={resourcesLink}
							className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#2A8C56] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#237849] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2A8C56]">
							{asText(fields.buttonText, DEFAULTS.buttonText)}
							<span
								aria-hidden="true"
								className="transition-transform duration-300 group-hover:translate-x-1">
								→
							</span>
						</Link>
					</Reveal>
				</div>

				{isLoading ? (
					<div className="grid gap-6 pt-12 md:grid-cols-3">
						{[0, 1, 2].map(item => (
							<div
								key={item}
								className="h-[440px] animate-pulse rounded-2xl border border-gray-100 bg-gray-50">
								<div className="h-[250px] rounded-t-2xl bg-gray-200" />
								<div className="space-y-4 p-5">
									<div className="h-5 w-3/4 rounded bg-gray-200" />
									<div className="h-3 w-full rounded bg-gray-200" />
									<div className="h-3 w-5/6 rounded bg-gray-200" />
									<div className="mt-6 h-10 w-32 rounded-xl bg-gray-200" />
								</div>
							</div>
						))}
					</div>
				) : pairs.length > 0 ? (
					<div className="resources-carousel pt-10 md:pt-12">
						<Swiper
							modules={[Autoplay, Pagination]}
							autoplay={{
								delay: 9000,
								disableOnInteraction: false,
								pauseOnMouseEnter: true,
							}}
							pagination={{ clickable: true }}
							loop={pairs.length > 1}
							spaceBetween={24}
							className="resources-swiper !overflow-hidden !pb-14">
							{pairs.map((pair, pairIndex) => (
								<SwiperSlide key={`resources-${pairIndex}`}>
									<div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
										{pair.map((resource, index) => (
											<Reveal
												key={`${pairIndex}-${index}`}
												distance={22}
												delay={index * 100}
												className="h-full">
												<ResourceComponent
													resource={
														resource as unknown as Record<string, unknown>
													}
												/>
											</Reveal>
										))}
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				) : (
					<p className="py-12 text-center text-sm text-gray-500">
						Resources will be featured here soon.
					</p>
				)}

				<Reveal distance={16} className="mt-6 flex justify-center md:hidden">
					<Link
						to={resourcesLink}
						className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#2A8C56] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#237849]">
						{asText(fields.buttonText, DEFAULTS.buttonText)}
						<span
							aria-hidden="true"
							className="transition-transform duration-300 group-hover:translate-x-1">
							→
						</span>
					</Link>
				</Reveal>
			</div>
		</section>
	);
};

export default OurResources;
