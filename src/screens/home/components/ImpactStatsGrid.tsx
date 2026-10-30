import { useEffect, useRef, useState } from "react";

import {
	HomeOurImpactIcon1,
	HomeOurImpactIcon2,
	HomeOurImpactIcon3,
	HomeOurImpactIcon4,
} from "../../../utils/icons";

import { asItems, asText } from "../data/homeContent";
import Reveal from "../../../components/shared/Reveal";

export interface ImpactItem {
	name?: string;
	value?: number | string;
	isPlus?: boolean;
}

interface ImpactStatsGridProps {
	items: ImpactItem[];
	isHome?: boolean;
}

const icons = [
	HomeOurImpactIcon1,
	HomeOurImpactIcon2,
	HomeOurImpactIcon3,
	HomeOurImpactIcon4,
];

interface AnimatedNumberProps {
	value: number | string;
	isPlus?: boolean;
}

const AnimatedNumber = ({ value, isPlus = false }: AnimatedNumberProps) => {
	const elementRef = useRef<HTMLSpanElement>(null);
	const [count, setCount] = useState(typeof value === "number" ? 0 : value);

	useEffect(() => {
		if (typeof value !== "number") return;

		const element = elementRef.current;
		if (!element) return;

		const duration = 1600;
		let animationFrame = 0;
		let observer: IntersectionObserver | undefined;
		let hasStarted = false;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const startCount = () => {
			if (hasStarted) return;
			hasStarted = true;

			if (prefersReducedMotion) {
				setCount(value);
				return;
			}

			const startTime = performance.now();

			const animate = (currentTime: number) => {
				const progress = Math.min((currentTime - startTime) / duration, 1);

				const easedProgress = 1 - Math.pow(1 - progress, 4);
				setCount(Math.round(value * easedProgress));

				if (progress < 1) {
					animationFrame = requestAnimationFrame(animate);
				}
			};

			animationFrame = requestAnimationFrame(animate);
		};

		if (!("IntersectionObserver" in window)) {
			startCount();
		} else {
			observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						startCount();
						observer?.disconnect();
					}
				},
				{ threshold: 0.4 },
			);

			observer.observe(element);
		}

		return () => {
			observer?.disconnect();
			cancelAnimationFrame(animationFrame);
		};
	}, [value]);

	return (
		<span ref={elementRef} className="tabular-nums">
			{typeof count === "number" ? count.toLocaleString() : count}
			{isPlus ? "+" : ""}
		</span>
	);
};

const ImpactStatsGrid = ({ items, isHome = true }: ImpactStatsGridProps) => {
	const stats = asItems<ImpactItem>(items);

	return (
		<div
			className={`grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 ${
				isHome ? "" : "bg-transparent"
			}`}>
			{stats.map((item, index) => {
				const Icon = icons[index % icons.length];

				return (
					<Reveal
						key={`${item.name ?? "impact"}-${index}`}
						delay={index * 120}
						distance={28}>
						<div
							className={`group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg sm:min-h-[210px] sm:p-7 ${
								isHome
									? "border-[#DCEAE1] bg-white/90 shadow-[0_4px_20px_rgba(23,77,55,0.04)] hover:border-[#B8D7C4] hover:shadow-[0_12px_30px_rgba(23,77,55,0.09)]"
									: "border-[#E8EEE9] bg-white"
							}`}>
							{/* Curved decorative accent with numbering */}
							<div
								aria-hidden="true"
								className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#EAF4ED] opacity-70 transition-transform duration-500 ease-in-out group-hover:scale-125"
							/>

							<div className="relative z-10 flex items-center justify-between">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF4ED] sm:h-12 sm:w-12">
									<img
										src={Icon}
										alt=""
										aria-hidden="true"
										className="h-7 w-7 object-contain sm:h-8 sm:w-8"
									/>
								</div>

								<span className="absolute -right-1 top-0 z-10 text-xs font-semibold tracking-widest text-[#9AA99F]">
									{String(index + 1).padStart(2, "0")}
								</span>
							</div>

							<div className="relative z-10 mt-7">
								<h3 className="text-3xl font-bold leading-none tracking-tight text-[#2A8C56] sm:text-4xl md:text-[42px]">
									<AnimatedNumber
										value={item.value ?? 0}
										isPlus={item.isPlus}
									/>
								</h3>

								<p className="mt-3 max-w-[180px] text-sm font-medium leading-6 text-[#59645D] sm:text-base">
									{asText(item.name)}
								</p>
							</div>
						</div>
					</Reveal>
				);
			})}
		</div>
	);
};

export default ImpactStatsGrid;
