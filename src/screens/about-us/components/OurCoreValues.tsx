import { useEffect, useState } from "react";

import {
	asItems,
	asText,
	getImageForViewport,
	getResponsiveImages,
} from "../../home/data/homeContent";

import Reveal from "../../../components/shared/Reveal";
import { useAboutSection } from "../data/aboutContent";
import SafeHtml from "../../../components/SafeHtml";

interface CoreValue {
	title?: string;
	description?: string;
}

interface TeamImage {
	imageUrl?: string;
	alt?: string;
}

interface GalleryImage extends TeamImage {
	src: string;
}

const TEAM_IMAGES_PER_PAGE = 4;
const TEAM_IMAGE_INTERVAL = 4000;
const TEAM_IMAGE_FADE_DURATION = 350;

const DEFAULTS = {
	title: "Our Core Value",
	description:
		"The principles that guide our work and define our commitment to communities",
	items: [
		{
			title: "Service",
			description:
				"We are committed to serving communities with compassion and purpose, ensuring our actions create real, lasting impact.",
		},
		{
			title: "Integrity",
			description:
				"We uphold transparency, honesty, and accountability in everything we do.",
		},
		{
			title: "Loyalty",
			description:
				"We remain steadfast in our mission, standing by communities and causes that drive meaningful change.",
		},
		{
			title: "Excellence",
			description:
				"We pursue excellence through innovation, dedication, and continuous learning.",
		},
	],
};

const TEAM_DEFAULTS = {
	eyebrow: "our team",
	title: "Meet the People Behind the Mission",
	description:
		"Behind Green Bridge is a passionate group of individuals united by one goal — creating sustainable change through education, empowerment, and action. Each team member brings unique expertise, creativity, and compassion to drive our mission forward. Together, we work hand-in-hand with communities, partners, and volunteers to make lasting impact where it matters most.",
	images: [
		{ alt: "", imageUrl: "/images/aboutTeam.jpg" },
		{ alt: "", imageUrl: "/images/aboutTeam.jpg" },
		{ alt: "", imageUrl: "/images/aboutTeam.jpg" },
		{ alt: "", imageUrl: "/images/aboutTeam.jpg" },
		{ alt: "", imageUrl: "/images/aboutTeam.jpg" },
		{ alt: "", imageUrl: "/images/aboutTeam.jpg" },
	] as TeamImage[],
};

const OurCoreValues = () => {
	const { fields } = useAboutSection("values", DEFAULTS);

	const { fields: teamFields, block: teamBlock } = useAboutSection(
		"team",
		TEAM_DEFAULTS,
	);

	const coreValues = asItems<CoreValue>(fields.items);
	const teamImages = asItems<TeamImage>(teamFields.images);

	const [teamImagePage, setTeamImagePage] = useState(0);
	const [isTeamTransitioning, setIsTeamTransitioning] = useState(false);
	const [isGalleryHovered, setIsGalleryHovered] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
		null,
	);

	const galleryImages: GalleryImage[] = (
		teamImages.length > 0
			? teamImages
			: [{ alt: "Our Team", imageUrl: "/images/aboutTeam.jpg" }]
	).map((item, index) => {
		const images = getResponsiveImages(item, teamBlock, index);

		return {
			...item,
			src: getImageForViewport(images) || "/images/aboutTeam.jpg",
		};
	});

	const teamImagePages = Math.ceil(galleryImages.length / TEAM_IMAGES_PER_PAGE);

	useEffect(() => {
		if (
			teamImagePages <= 1 ||
			isGalleryHovered ||
			selectedImageIndex !== null
		) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setIsTeamTransitioning(false);
			return;
		}

		let swapTimeout: number | undefined;
		let revealTimeout: number | undefined;

		const interval = window.setInterval(() => {
			setIsTeamTransitioning(true);

			swapTimeout = window.setTimeout(() => {
				setTeamImagePage(currentPage => (currentPage + 1) % teamImagePages);

				revealTimeout = window.setTimeout(() => {
					setIsTeamTransitioning(false);
				}, 50);
			}, TEAM_IMAGE_FADE_DURATION);
		}, TEAM_IMAGE_INTERVAL);

		return () => {
			window.clearInterval(interval);

			if (swapTimeout !== undefined) {
				window.clearTimeout(swapTimeout);
			}

			if (revealTimeout !== undefined) {
				window.clearTimeout(revealTimeout);
			}
		};
	}, [teamImagePages, isGalleryHovered, selectedImageIndex]);

	useEffect(() => {
		if (selectedImageIndex === null) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setSelectedImageIndex(null);
			}

			if (event.key === "ArrowRight") {
				setSelectedImageIndex(current =>
					current === null ? 0 : (current + 1) % galleryImages.length,
				);
			}

			if (event.key === "ArrowLeft") {
				setSelectedImageIndex(current =>
					current === null
						? 0
						: (current - 1 + galleryImages.length) % galleryImages.length,
				);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedImageIndex, galleryImages.length]);

	const visibleTeamImages = galleryImages.slice(
		teamImagePage * TEAM_IMAGES_PER_PAGE,
		teamImagePage * TEAM_IMAGES_PER_PAGE + TEAM_IMAGES_PER_PAGE,
	);

	const selectedImage =
		selectedImageIndex === null ? null : galleryImages[selectedImageIndex];

	const showPreviousImage = () => {
		setSelectedImageIndex(current =>
			current === null
				? 0
				: (current - 1 + galleryImages.length) % galleryImages.length,
		);
	};

	const showNextImage = () => {
		setSelectedImageIndex(current =>
			current === null ? 0 : (current + 1) % galleryImages.length,
		);
	};

	return (
		<>
			<section className="relative overflow-hidden px-6 py-16 sm:px-10 md:px-16 md:py-28 lg:px-40">
				<div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#D4E8DD]/40 blur-3xl" />

				<div className="relative">
					<div className="max-w-2xl">
						<Reveal distance={20}>
							<p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#2A8C56]">
								our principles
							</p>
						</Reveal>

						<Reveal distance={24} delay={80}>
							<h2 className="py-1 text-3xl font-bold capitalize leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl">
								{asText(fields.title, DEFAULTS.title)}
							</h2>
						</Reveal>

						<Reveal distance={24} delay={160}>
							<p className="mt-3 text-base leading-8 text-[#3A3A3A]">
								<SafeHtml
									html={asText(fields.description, DEFAULTS.description)}
								/>
							</p>
						</Reveal>
					</div>

					<div className="grid grid-cols-1 gap-5 py-10 sm:grid-cols-2 md:grid-cols-4 md:gap-6 md:py-14">
						{coreValues.map((core, index) => (
							<Reveal
								key={`${core.title ?? "value"}-${index}`}
								distance={28}
								delay={index * 100}>
								<article className="group relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl md:p-6">
									<div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#EAF4ED] opacity-80 transition-transform duration-700 group-hover:scale-150" />

									<div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#2A8C56] shadow-md shadow-[#2A8C56]/20">
										<span className="text-2xl font-bold text-white">
											{index + 1}
										</span>
									</div>

									<div className="relative">
										<h3 className="py-5 text-xl font-bold capitalize tracking-tight text-[#1A1A1A] md:text-2xl">
											{asText(core.title, "Core value")}
										</h3>

										<p className="text-sm leading-7 text-[#3A3A3A]">
											{asText(core.description)}
										</p>
									</div>

									<div className="relative mt-6 h-1 w-10 rounded-full bg-[#2A8C56] transition-all duration-500 group-hover:w-16" />
								</article>
							</Reveal>
						))}
					</div>
				</div>

				<div className="relative grid items-center gap-12 pt-12 md:grid-cols-2 md:gap-16 md:pt-20">
					<div
						className="relative"
						onMouseEnter={() => setIsGalleryHovered(true)}
						onMouseLeave={() => setIsGalleryHovered(false)}>
						<Reveal distance={28}>
							<div className="absolute -left-3 -top-3 z-0 h-[90%] w-[85%] rounded-2xl bg-[#2A8C56] md:-left-4 md:-top-4" />

							<div
								className={`relative z-10 grid grid-cols-2 gap-3 transition-opacity duration-300 ease-in-out ${
									isTeamTransitioning ? "opacity-0" : "opacity-100"
								}`}>
								{visibleTeamImages.map((item, index) => {
									const actualIndex =
										teamImagePage * TEAM_IMAGES_PER_PAGE + index;

									return (
										<button
											key={`${item.imageUrl ?? "team"}-${actualIndex}`}
											type="button"
											onClick={() => setSelectedImageIndex(actualIndex)}
											className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2A8C56]"
											aria-label={`View team image ${actualIndex + 1} of ${galleryImages.length}`}>
											<img
												src={item.src}
												alt={asText(item.alt, "Green Bridge team")}
												className="h-36 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105 sm:h-40 md:h-44"
												loading="lazy"
											/>

											<span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
												View image
											</span>
										</button>
									);
								})}
							</div>

							{galleryImages.length > TEAM_IMAGES_PER_PAGE && (
								<div className="relative z-10 mt-4 flex items-center justify-between gap-3">
									<p className="text-xs font-medium text-[#3A3A3A]">
										{isGalleryHovered
											? "Gallery paused"
											: "Hover to pause · Click to explore"}
									</p>

									<p className="text-xs font-semibold tabular-nums text-[#2A8C56]">
										{String(teamImagePage + 1).padStart(2, "0")} /{" "}
										{String(teamImagePages).padStart(2, "0")}
									</p>
								</div>
							)}
						</Reveal>
					</div>

					<div className="max-w-xl">
						<Reveal distance={20}>
							<p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#2A8C56]">
								{asText(teamFields.eyebrow, TEAM_DEFAULTS.eyebrow)}
							</p>
						</Reveal>

						<Reveal distance={24} delay={80}>
							<h2 className="py-1 text-3xl font-bold leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl">
								{asText(teamFields.title, TEAM_DEFAULTS.title)}
							</h2>
						</Reveal>

						<Reveal distance={24} delay={160}>
							<p className="mt-4 text-base leading-8 text-[#3A3A3A]">
								<SafeHtml
									html={asText(
										teamFields.description,
										TEAM_DEFAULTS.description,
									)}
								/>
							</p>
						</Reveal>

						<div className="py-4" />
					</div>
				</div>
			</section>

			{selectedImage && (
				<div
					className="fixed inset-0 z-[100] flex flex-col bg-black/95 text-white"
					role="dialog"
					aria-modal="true"
					aria-label="Team photo gallery"
					onClick={() => setSelectedImageIndex(null)}>
					<div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
						<div>
							<p className="text-sm text-white/70">Green Bridge</p>
							<p className="text-sm font-medium">
								Image {selectedImageIndex! + 1} of {galleryImages.length}
							</p>
						</div>

						<button
							type="button"
							onClick={() => setSelectedImageIndex(null)}
							className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-3xl transition hover:bg-white/20"
							aria-label="Close gallery">
							&times;
						</button>
					</div>

					<div
						className="relative flex min-h-0 flex-1 items-center justify-center gap-2 px-2 md:gap-6 md:px-8"
						onClick={event => event.stopPropagation()}>
						{galleryImages.length > 1 && (
							<button
								type="button"
								onClick={showPreviousImage}
								className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-3xl transition hover:bg-white/20 md:h-12 md:w-12"
								aria-label="Previous image">
								&#8249;
							</button>
						)}

						<div className="flex min-h-0 flex-1 items-center justify-center">
							<img
								src={selectedImage.src}
								alt={asText(selectedImage.alt, "Green Bridge team")}
								className="max-h-[65vh] max-w-full rounded-lg object-contain md:max-h-[72vh]"
							/>
						</div>

						{galleryImages.length > 1 && (
							<button
								type="button"
								onClick={showNextImage}
								className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-3xl transition hover:bg-white/20 md:h-12 md:w-12"
								aria-label="Next image">
								&#8250;
							</button>
						)}
					</div>

					<div
						className="px-4 pb-4 pt-3 md:px-8"
						onClick={event => event.stopPropagation()}>
						<p className="mb-3 text-center text-sm text-white/70">
							Select a thumbnail to view another image
						</p>

						<div className="flex justify-start gap-2 overflow-x-auto pb-2">
							{galleryImages.map((item, index) => (
								<button
									key={`${item.imageUrl ?? "team-thumb"}-${index}`}
									type="button"
									onClick={() => setSelectedImageIndex(index)}
									aria-label={`View image ${index + 1}`}
									aria-current={
										index === selectedImageIndex ? "true" : undefined
									}
									className={`shrink-0 overflow-hidden rounded-md border-2 transition ${
										index === selectedImageIndex
											? "border-[#2A8C56] opacity-100"
											: "border-transparent opacity-55 hover:opacity-100"
									}`}>
									<img
										src={item.src}
										alt=""
										className="h-12 w-16 object-cover md:h-16 md:w-24"
										loading="lazy"
									/>
								</button>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default OurCoreValues;
