import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, Search } from "lucide-react";

export interface HeroVisibility {
	global?: boolean;
	desktop?: boolean;
	tablet?: boolean;
	mobile?: boolean;
}

export interface HeroBackgroundImages {
	default?: string;
	desktop?: string;
	tablet?: string;
	mobile?: string;
}

export interface HeroAnimations {
	background?: boolean;
	typewriter?: boolean;
	content?: boolean;
}

type HeroProps = {
	backgroundImage: string;
	backgroundImages?: HeroBackgroundImages;
	heading: string;
	subtext: string;
	headingVisibility?: HeroVisibility;
	subtextVisibility?: HeroVisibility;
	isSearch?: string;
	isButtons?: boolean;
	animations?: HeroAnimations;
	isActive?: boolean;
	height?: string;
};

const visibilityClasses = (visibility?: HeroVisibility): string => {
	if (!visibility) return "";

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

const Hero = ({
	isButtons = false,
	backgroundImage,
	backgroundImages,
	heading,
	subtext,
	headingVisibility,
	subtextVisibility,
	isSearch,
	animations,
	isActive = true,
	height = "100vh",
}: HeroProps) => {
	const [typedCharacters, setTypedCharacters] = useState(0);
	const [reduceMotion, setReduceMotion] = useState(false);
	const [animationsStarted, setAnimationsStarted] = useState(false);

	const animateBackground = animations?.background ?? false;
	const animateTypewriter = animations?.typewriter ?? false;
	const animateContent = animations?.content ?? false;

	const hasResponsiveImages = Boolean(
		backgroundImages?.desktop ||
		backgroundImages?.tablet ||
		backgroundImages?.mobile,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

		const updatePreference = () => setReduceMotion(mediaQuery.matches);

		updatePreference();
		mediaQuery.addEventListener("change", updatePreference);

		return () => {
			mediaQuery.removeEventListener("change", updatePreference);
		};
	}, []);

	useEffect(() => {
		if (!isActive) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setAnimationsStarted(false);
			return;
		}

		if (reduceMotion) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setAnimationsStarted(true);
			return;
		}

		const frame = window.requestAnimationFrame(() => {
			setAnimationsStarted(true);
		});

		return () => window.cancelAnimationFrame(frame);
	}, [isActive, reduceMotion]);

	useEffect(() => {
		if (!animateTypewriter || reduceMotion) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setTypedCharacters(heading.length);
			return;
		}

		if (!isActive) {
			setTypedCharacters(0);
			return;
		}

		setTypedCharacters(0);

		let currentCharacter = 0;

		const interval = window.setInterval(() => {
			currentCharacter += 1;
			setTypedCharacters(currentCharacter);

			if (currentCharacter >= heading.length) {
				window.clearInterval(interval);
			}
		}, 45);

		return () => window.clearInterval(interval);
	}, [heading, isActive, animateTypewriter, reduceMotion]);

	const displayedHeading =
		animateTypewriter && !reduceMotion
			? heading.slice(0, typedCharacters)
			: heading;

	const showCursor =
		animateTypewriter &&
		!reduceMotion &&
		isActive &&
		typedCharacters < heading.length;

	const backgroundStyle: CSSProperties = {
		transform:
			animateBackground && animationsStarted && !reduceMotion
				? "scale(1.08)"
				: "scale(1)",
		transformOrigin: "center",
		transition:
			animateBackground && !reduceMotion
				? "transform 9000ms cubic-bezier(0.22, 1, 0.36, 1)"
				: "none",
	};

	const contentStyle: CSSProperties = {
		opacity: animateContent && !reduceMotion && !animationsStarted ? 0 : 1,
		transform:
			animateContent && !reduceMotion && !animationsStarted
				? "translateY(24px)"
				: "translateY(0)",
		transition:
			animateContent && !reduceMotion
				? "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)"
				: "none",
	};

	const staggeredContentStyle = (delay: number): CSSProperties | undefined => {
		if (!animateContent) return undefined;

		return {
			opacity: reduceMotion || animationsStarted ? 1 : 0,
			transform:
				reduceMotion || animationsStarted
					? "translateY(0)"
					: "translateY(16px)",
			transition: reduceMotion
				? "none"
				: "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
			transitionDelay:
				reduceMotion || !animationsStarted ? "0ms" : `${delay}ms`,
		};
	};

	return (
		<section
			className="relative flex min-h-0 items-center overflow-hidden bg-[#173C2B] px-6 py-24 text-white sm:px-10 md:px-20 lg:px-40"
			style={{ minHeight: height }}
			id="hero">
			{/* Background image */}
			{hasResponsiveImages ? (
				<picture
					className="absolute inset-0 block h-full w-full overflow-hidden"
					style={backgroundStyle}>
					{backgroundImages?.desktop && (
						<source
							media="(min-width: 1024px)"
							srcSet={backgroundImages.desktop}
						/>
					)}

					{backgroundImages?.tablet && (
						<source
							media="(min-width: 768px) and (max-width: 1023px)"
							srcSet={backgroundImages.tablet}
						/>
					)}

					{backgroundImages?.mobile && (
						<source
							media="(max-width: 767px)"
							srcSet={backgroundImages.mobile}
						/>
					)}

					<img
						src={backgroundImages?.default || backgroundImage}
						alt=""
						aria-hidden="true"
						className="h-full w-full object-cover object-center"
					/>
				</picture>
			) : backgroundImage ? (
				<div
					aria-hidden="true"
					className="absolute inset-0 bg-cover bg-center bg-no-repeat"
					style={{
						backgroundImage: `url(${backgroundImage})`,
						...backgroundStyle,
					}}
				/>
			) : null}

			{/* Image overlay */}
			<div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/45 to-black/15" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

			{/* Hero content */}
			<div className="relative z-10 w-full max-w-3xl" style={contentStyle}>
				<h1
					aria-label={heading}
					className={`max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl ${visibilityClasses(headingVisibility)}`}>
					<span aria-hidden="true" className="whitespace-pre-wrap">
						{displayedHeading}
						{showCursor && (
							<span className="ml-1 inline-block h-[0.85em] translate-y-1 border-r-[3px] border-white align-baseline opacity-80" />
						)}
					</span>
				</h1>

				<p
					className={`mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl ${visibilityClasses(subtextVisibility)}`}
					style={staggeredContentStyle(180)}>
					{subtext}
				</p>

				{isSearch && (
					<div className="relative mt-8 max-w-xl">
						<div className="absolute left-4 top-1/2 -translate-y-1/2">
							<Search color="#3A3A3A" size={20} />
						</div>

						<input
							type="search"
							className="w-full rounded-xl border border-white/20 bg-white/95 p-4 pl-12 text-[#3A3A3A] placeholder:text-[#777] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white/60"
							placeholder={isSearch || "Type here to search"}
						/>
					</div>
				)}

				{isButtons && (
					<div
						className="mt-9 flex flex-wrap gap-4"
						style={staggeredContentStyle(350)}>
						<button
							type="button"
							className="group flex cursor-pointer items-center gap-3 rounded-xl bg-[#2A8C56] px-7 py-4 font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#237849] hover:shadow-xl">
							Get Started
							<ArrowRight
								size={19}
								className="transition-transform duration-300 group-hover:translate-x-1"
							/>
						</button>

						<button
							type="button"
							className="cursor-pointer rounded-xl border border-white/80 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-white hover:text-[#2A8C56]">
							Learn More
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default Hero;
