import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import {
	asItems,
	asText,
	getImageForViewport,
	getResponsiveImages,
	useHomeSection,
} from "../data/homeContent";

import Reveal from "../../../components/shared/Reveal";

interface StoryItem {
	title?: string;
	description?: string;
	imageUrl?: string;
	images?: unknown;
	imageVariants?: unknown;
}

const fallbackImages = [
	"/images/homeStory1.png",
	"/images/homeStory2.png",
	"/images/homeStory3.png",
	"/images/homeStory4.png",
	"/images/homeStory5.png",
	"/images/homeStory6.png",
];

const DEFAULTS = {
	title: "Lives we've touched",
	description:
		"Every project begins with hope — and every success carries a story. Meet the individuals and communities whose lives have been transformed through our programs and your support.",
	items: [
		{
			title: "Aisha’s Journey: From Dropout to STEM Advocate",
			description:
				"Aisha grew up in a rural village where girls rarely finished school. Through Green Bridge’s Students to School program, she received a scholarship and mentorship that helped her return to class. Today, she teaches young girls how to code and dreams of starting a solar tech company in her community.",
			imageUrl: "",
		},
		{
			title: "The Classroom That Found Light",
			description:
				"In a small community school, lessons once stopped by noon because of darkness. After Green Bridge’s Electrify a Neighborhood project installed solar panels, evening classes began. Students can now study longer, and teachers hold after-school workshops — a simple change that ignited hope and progress.",
			imageUrl: "",
		},
		{
			title: "Lighting Up Hope in Oke-Ira Village",
			description:
				"For years, the small Oke-Ira community lived in darkness once the sun set. Through the Electrify a Neighborhood initiative, Green Bridge installed solar-powered streetlights and rechargeable lanterns for households. The result extended study hours for children, safety, and a revived evening market. The village now calls the lights “our stars of hope.”",
			imageUrl: "",
		},
		{
			title: "From Waste to Wonders: The Green Youth Initiative",
			description:
				"In collaboration with local schools, Green Bridge launched the GroundUp Sustainability Club, where students learn to recycle plastics into creative art and usable items. Over 500 students have participated, turning waste into wealth while spreading awareness on environmental conservation.",
			imageUrl: "",
		},
		{
			title: "Empowering Teachers for a Greener Future",
			description:
				"Green Bridge organized a sustainability workshop for rural educators, training over 100 teachers on how to incorporate climate education and STEM projects into their classrooms. One participant, Mr. Bamidele, said, “It changed how I teach. Now my students build solar-powered models instead of just reading about them.”",
			imageUrl: "",
		},
		{
			title: "Aisha’s Journey Back to School",
			description:
				"Aisha, a 10-year-old girl from northern Nigeria, had to stop schooling after her parents couldn’t afford uniforms and books. Through the Send a Child to School program, Green Bridge provided her with school supplies and tuition support. Today, Aisha dreams of becoming a science teacher — inspiring other girls in her community.",
			imageUrl: "",
		},
	],
};

const OurStories = () => {
	const swiperRef = useRef<SwiperInstance | null>(null);

	const { fields, block } = useHomeSection("stories", DEFAULTS);

	const configuredStories = asItems<StoryItem>(fields.items);

	const stories =
		configuredStories.length > 0
			? configuredStories.filter(
					story =>
						Boolean(story.title?.trim()) ||
						Boolean(story.description?.trim()) ||
						Boolean(story.imageUrl?.trim()),
				)
			: DEFAULTS.items;

	const displayedStories = stories.length > 0 ? stories : DEFAULTS.items;

	const pairs: StoryItem[][] = [];

	for (let index = 0; index < displayedStories.length; index += 2) {
		pairs.push(displayedStories.slice(index, index + 2));
	}

	return (
		<section className="relative overflow-hidden bg-[#D8EAE0] px-6 py-16 sm:px-10 md:px-16 md:py-24 md:pb-72 lg:px-40">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-white/40 blur-3xl"
			/>

			<div
				aria-hidden="true"
				className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-[#BBDCC8]/40 blur-3xl"
			/>

			<div className="relative">
				<div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-2">
					<div className="max-w-2xl">
						<Reveal>
							<h2 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#2A8C56]">
								<span className="h-0.5 w-8 rounded-full bg-[#2A8C56]" />
								Our Stories
							</h2>
						</Reveal>

						<Reveal delay={100}>
							<h1 className="py-3 text-3xl font-bold leading-tight text-[#1A1A1A] sm:text-4xl md:text-[42px]">
								{asText(fields.title, DEFAULTS.title)}
							</h1>
						</Reveal>

						<Reveal delay={200}>
							<p className="max-w-xl text-sm leading-7 text-[#46554B] sm:text-base">
								{asText(fields.description, DEFAULTS.description)}
							</p>
						</Reveal>
					</div>
				</div>

				{pairs.length > 0 ? (
					<>
						<Swiper
							modules={[Autoplay]}
							spaceBetween={0}
							autoplay={{
								delay: 9000,
								disableOnInteraction: false,
								pauseOnMouseEnter: true,
							}}
							loop={pairs.length > 1}
							onSwiper={swiper => {
								swiperRef.current = swiper;
							}}
							className="!overflow-visible">
							{pairs.map((pair, pairIndex) => (
								<SwiperSlide key={`stories-${pairIndex}`} className="px-3">
									<div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
										{pair.map((story, pairItemIndex) => {
											const index = pairIndex * 2 + pairItemIndex;

											const images = getResponsiveImages(story, block, index);

											const image =
												getImageForViewport(images) ||
												fallbackImages[index % fallbackImages.length];

											return (
												<article
													key={`${story.title ?? "story"}-${index}`}
													className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_8px_28px_rgba(23,77,55,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,77,55,0.13)] sm:flex-row">
													<div className="relative h-64 shrink-0 overflow-hidden sm:h-auto sm:min-h-[340px] sm:w-[44%]">
														<img
															src={image}
															alt={asText(story.title, "Green Bridge story")}
															className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
															loading="lazy"
														/>

														<div
															aria-hidden="true"
															className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/5"
														/>

														<span className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2A8C56] backdrop-blur-sm">
															Story {String(index + 1).padStart(2, "0")}
														</span>
													</div>

													<div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-6 lg:p-7">
														<div className="mb-4 h-1 w-10 rounded-full bg-[#2A8C56] transition-all duration-500 group-hover:w-16" />

														<h3 className="text-xl font-bold leading-snug text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#2A8C56] lg:text-2xl">
															{asText(story.title)}
														</h3>

														<p className="mt-4 text-sm leading-7 text-[#59645D]">
															{asText(story.description)}
														</p>
													</div>
												</article>
											);
										})}
									</div>
								</SwiperSlide>
							))}
						</Swiper>

						<Reveal delay={200}>
							<div className="mt-8 flex items-center justify-between">
								<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#557261]">
									Real stories. Lasting impact.
								</p>

								<div className="flex gap-3">
									<button
										type="button"
										aria-label="Previous stories"
										onClick={() => swiperRef.current?.slidePrev()}
										className="flex h-11 w-11 items-center justify-center rounded-full border border-[#26734D] text-lg text-[#174D37] transition-all duration-300 hover:-translate-x-1 hover:bg-white">
										←
									</button>

									<button
										type="button"
										aria-label="Next stories"
										onClick={() => swiperRef.current?.slideNext()}
										className="flex h-11 w-11 items-center justify-center rounded-full border border-[#26734D] text-lg text-[#174D37] transition-all duration-300 hover:translate-x-1 hover:bg-white">
										→
									</button>
								</div>
							</div>
						</Reveal>
					</>
				) : (
					<p className="py-8 text-sm text-gray-600">
						Stories will be featured here soon.
					</p>
				)}
			</div>
		</section>
	);
};

export default OurStories;
