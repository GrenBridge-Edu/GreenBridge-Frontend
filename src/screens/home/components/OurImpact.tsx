import { asItems, asText, useHomeSection } from "../data/homeContent";
import ImpactStatsGrid, { type ImpactItem } from "./ImpactStatsGrid";
import Reveal from "../../../components/shared/Reveal";

const DEFAULTS = {
	title: "Why Green Bridge Exists",
	description:
		"Making a difference in communities worldwide through sustainable development and education",
	items: [
		{ name: "Students reached", value: 2500, isPlus: true },
		{ name: "Sustainability Programs", value: 44, isPlus: false },
		{ name: "Active Projects", value: 30, isPlus: true },
		{ name: "Communities Reached", value: 18, isPlus: false },
	],
};

const OurImpact = () => {
	const { fields } = useHomeSection("impact", DEFAULTS);
	const items = asItems<ImpactItem>(fields.items);

	return (
		<section className="relative">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#D8EAE0]/50 blur-3xl"
			/>

			<div
				aria-hidden="true"
				className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#E1EFE7]/60 blur-3xl"
			/>

			<div className="relative mx-auto max-w-[1440px]">
				<div className="absolute -top-30 right-0 z-30 flex w-full flex-col px-6 md:w-1/3 md:px-0">
					<Reveal>
						<h2 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#2A8C56]">
							<span className="h-0.5 w-8 rounded-full bg-[#2A8C56]" />
							Our Impact
						</h2>
					</Reveal>

					<Reveal delay={100}>
						<h1 className="py-2 text-[30px] font-bold leading-tight text-[#1A1A1A] md:text-[36px]">
							{asText(fields.title, DEFAULTS.title)}
						</h1>
					</Reveal>

					<Reveal delay={200}>
						<p className="max-w-lg text-sm leading-7 text-[#5B665F] md:text-base">
							{asText(fields.description, DEFAULTS.description)}
						</p>
					</Reveal>
				</div>

				<div className="px-6 py-10 md:px-40 md:py-24">
					<ImpactStatsGrid items={items} />
				</div>
			</div>
		</section>
	);
};

export default OurImpact;
