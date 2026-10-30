import { HomeGetInvolved1 } from "../../../utils/icons";

import { asItems, asText } from "../../home/data/homeContent";
import type { ImpactItem } from "../../home/components/ImpactStatsGrid";
import ImpactStatsGrid from "../../home/components/ImpactStatsGrid";
import Reveal from "../../../components/shared/Reveal";

import { useAboutSection } from "../data/aboutContent";

const DEFAULTS = {
	eyebrow: "our impact",
	title: "Why Green Bridge Exists",
	description:
		"Making a difference in communities worldwide through sustainable development and education",
	missionTitle: "Our Mission",
	missionDescription:
		"To be at the intersection of education and environmental sustainability, fostering holistic learning and sustainable development worldwide.",
	visionTitle: "Our Vision",
	visionDescription:
		"To influence young people to create environmentally sustainable solutions in their localities and future careers, and to make sustainable academic progress.",
};

const IMPACT_DEFAULTS: ImpactItem[] = [
	{ name: "Students reached", value: 2500, isPlus: true },
	{ name: "Sustainability Programs", value: 44, isPlus: false },
	{ name: "Active Projects", value: 30, isPlus: true },
	{ name: "Communities Reached", value: 18, isPlus: false },
];

const WhyWeExists = () => {
	const { fields } = useAboutSection("mission-vision", DEFAULTS);

	const items = [
		{
			title: asText(fields.missionTitle, DEFAULTS.missionTitle),
			description: asText(
				fields.missionDescription,
				DEFAULTS.missionDescription,
			),
		},
		{
			title: asText(fields.visionTitle, DEFAULTS.visionTitle),
			description: asText(fields.visionDescription, DEFAULTS.visionDescription),
		},
	];

	return (
		<section className="relative overflow-hidden bg-[#D4E8DD] py-16 md:py-24">
			<div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
			<div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#2A8C56]/10 blur-3xl" />

			<div className="relative px-6 sm:px-10 md:px-16 lg:px-40">
				<div className="grid items-end gap-8">
					<div className="w-full md:min-h-24 md:max-w-xl">
						<Reveal distance={20}>
							<p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#2A8C56]">
								{asText(fields.eyebrow, DEFAULTS.eyebrow)}
							</p>
						</Reveal>

						<Reveal distance={24} delay={0.08}>
							<h2 className="py-1 text-3xl font-bold capitalize leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl">
								{asText(fields.title, DEFAULTS.title)}
							</h2>
						</Reveal>

						<Reveal distance={24} delay={0.16}>
							<p className="mt-3 max-w-xl text-base leading-8 text-[#3A3A3A]">
								{asText(fields.description, DEFAULTS.description)}
							</p>
						</Reveal>
					</div>
				</div>
			</div>

			<Reveal
				distance={24}
				className="relative px-6 py-12 sm:px-10 md:px-16 md:py-20 lg:px-40">
				<ImpactStatsGrid
					items={asItems<ImpactItem>(IMPACT_DEFAULTS)}
					isHome={false}
				/>
			</Reveal>

			<div className="relative grid grid-cols-1 gap-5 px-6 sm:px-10 md:grid-cols-2 md:gap-6 md:px-16 lg:px-40">
				{items.map((item, index) => (
					<Reveal key={item.title} distance={28} delay={index * 0.12}>
						<article className="group relative h-full overflow-hidden rounded-2xl border border-white/70 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-10">
							<div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#D4E8DD]/60 transition-transform duration-700 group-hover:scale-125" />

							<div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0F7F2] shadow-sm">
								<img
									src={HomeGetInvolved1}
									alt=""
									aria-hidden="true"
									className="h-9 w-9 object-contain"
								/>
							</div>

							<div className="relative">
								<h3 className="py-5 text-2xl font-bold capitalize tracking-tight text-[#1A1A1A] md:text-3xl">
									{item.title}
								</h3>

								<p className="text-base leading-8 text-[#3A3A3A]">
									{item.description}
								</p>
							</div>

							<div className="mt-8 h-1 w-12 rounded-full bg-[#2A8C56] transition-all duration-500 group-hover:w-20" />
						</article>
					</Reveal>
				))}
			</div>
		</section>
	);
};

export default WhyWeExists;
