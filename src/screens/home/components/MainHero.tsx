import { useMemo, useRef } from "react";
import Hero, {
	type HeroVisibility,
	type HeroAnimations,
} from "../../../components/shared/Hero";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import {
	asItems,
	asRecord,
	asText,
	getImageForViewport,
	getResponsiveImages,
	useHomeSection,
} from "../data/homeContent";

interface HeroSlide {
	title?: string;
	subtitle?: string;
	imageUrl?: string;
	images?: unknown;
	imageVariants?: unknown;
	visibility?: {
		title?: unknown;
		subtitle?: unknown;
	};
}

const fallbackImages = [
	"/images/homeBG1.jpg",
	"/images/homeBG2.jpg",
	"/images/homeBG3.jpg",
];

const defaultSlides: HeroSlide[] = [
	{
		title: "Building Sustainable Futures Through Education",
		subtitle:
			"Join Green Bridge in our mission to promote sustainable development and quality education as the foundation for growth. Together, we can create lasting change in communities worldwide.",
	},
	{
		title: "Building Sustainable Futures Through Education",
		subtitle:
			"Join Green Bridge in our mission to promote sustainable development and quality education as the foundation for growth. Together, we can create lasting change in communities worldwide.",
	},
	{
		title: "Building Sustainable Futures Through Education",
		subtitle:
			"Join Green Bridge in our mission to promote sustainable development and quality education as the foundation for growth. Together, we can create lasting change in communities worldwide.",
	},
];

const homepageHeroAnimations: HeroAnimations = {
	background: true,
	typewriter: true,
	content: true,
};

const MainHero = () => {
	const swiperRef = useRef<SwiperInstance | null>(null);

	const defaults = useMemo(() => ({ slides: defaultSlides }), []);

	const { fields, block } = useHomeSection("hero", defaults);

	const slides = asItems<HeroSlide>(fields.slides);
	const displayedSlides = slides.length > 0 ? slides : defaultSlides;

	return (
		<section className="relative">
			<Swiper
				onSwiper={swiper => {
					swiperRef.current = swiper;
				}}
				modules={[Autoplay, Pagination, EffectFade]}
				effect="fade"
				fadeEffect={{
					crossFade: true,
				}}
				speed={1200}
				loop={displayedSlides.length > 1}
				autoplay={{
					delay: 9000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
					waitForTransition: true,
				}}
				pagination={{
					clickable: true,
				}}
				className="[&_.swiper-slide]:!ease-in-out [&_.swiper-pagination-bullet]:!h-2 [&_.swiper-pagination-bullet]:!w-2 [&_.swiper-pagination-bullet]:!bg-white [&_.swiper-pagination-bullet]:!opacity-50 [&_.swiper-pagination-bullet-active]:!w-7 [&_.swiper-pagination-bullet-active]:!rounded-full [&_.swiper-pagination-bullet-active]:!opacity-100">
				{displayedSlides.map((slide, index) => {
					const images = getResponsiveImages(slide, block, index);
					const fallback = fallbackImages[index % fallbackImages.length];
					const backgroundImage = getImageForViewport(images) || fallback;

					const visibility = asRecord(slide.visibility);

					return (
						<SwiperSlide key={`home-hero-${index}`}>
							{({ isActive }) => (
								<Hero
									backgroundImage={backgroundImage}
									backgroundImages={images}
									heading={asText(slide.title)}
									subtext={asText(slide.subtitle)}
									headingVisibility={
										asRecord(visibility.title) as HeroVisibility
									}
									subtextVisibility={
										asRecord(visibility.subtitle) as HeroVisibility
									}
									isButtons
									animations={homepageHeroAnimations}
									isActive={isActive}
								/>
							)}
						</SwiperSlide>
					);
				})}
			</Swiper>

			{/* Hero navigation */}
			<div className="pointer-events-none absolute inset-x-0 top-1/2 z-30 flex -translate-y-1/2 justify-between px-4 sm:px-6 md:px-10">
				<button
					type="button"
					aria-label="Previous hero slide"
					onClick={() => swiperRef.current?.slidePrev()}
					className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/20 text-xl text-white shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-110 hover:bg-white hover:text-[#174D37] sm:h-12 sm:w-12">
					<span aria-hidden="true">←</span>
				</button>

				<button
					type="button"
					aria-label="Next hero slide"
					onClick={() => swiperRef.current?.slideNext()}
					className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/20 text-xl text-white shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-110 hover:bg-white hover:text-[#174D37] sm:h-12 sm:w-12">
					<span aria-hidden="true">→</span>
				</button>
			</div>
		</section>
	);
};

export default MainHero;
