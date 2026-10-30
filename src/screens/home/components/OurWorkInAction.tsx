import dayjs from "dayjs";
import { Link } from "react-router-dom";

import { useHomeProgramsQuery } from "../../../data/queries/homeContent.queries";

import { asText, formatCurrency, useHomeSection } from "../data/homeContent";
import Reveal from "../../../components/shared/Reveal";

const DEFAULTS = {
	title: "Our work in action",
	description:
		"Discover how we're creating sustainable change through education, infrastructure, and community empowerment",
	buttonText: "See all Programs",
	buttonLink: "/programs",
};

const fallbackImages = [
	"/images/homeProgram1.png",
	"/images/homeProgram2.png",
	"/images/homeProgram3.png",
];

const fallbackPrograms = [
	{
		title: "Child to School",
		description:
			"Providing educational resources nd scholarships to underprivileged children, ensuring access to quality education for all.",
		createdAt: Date.now(),
		target: 5000000,
		thumbnailFile: { secure_url: fallbackImages[0] },
	},
	{
		title: "Ground Up",
		description:
			"Building sustainable infrastructure from the ground uo, focusing on renewable energy and eco-friendly construction",
		createdAt: Date.now(),
		target: 5000000,
		thumbnailFile: { secure_url: fallbackImages[1] },
	},
	{
		title: "Students to School",
		description:
			"Providing educational resources nd scholarships to underprivileged children, ensuring access to quality education for all.",
		createdAt: Date.now(),
		target: 5000000,
		thumbnailFile: { secure_url: fallbackImages[2] },
	},
];

const OurWorkInAction = () => {
	const { fields } = useHomeSection("work", DEFAULTS);
	const { data: programs = [], isLoading } = useHomeProgramsQuery(4);

	const workActions =
		programs.length > 0 ? programs.slice(0, 3) : fallbackPrograms;

	return (
		<section className="relative overflow-hidden bg-white px-6 py-16 sm:px-10 md:px-16 md:py-24 lg:px-40">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#EAF4ED]/70 blur-3xl"
			/>

			<div className="relative">
				<div className="grid gap-6 md:grid-cols-2 md:items-end">
					<div className="max-w-2xl">
						<Reveal>
							<h2 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#2A8C56]">
								<span className="h-0.5 w-8 rounded-full bg-[#2A8C56]" />
								Our Latest Programs
							</h2>
						</Reveal>

						<Reveal delay={100}>
							<h1 className="py-3 text-3xl font-bold leading-tight text-[#1A1A1A] sm:text-4xl md:text-[42px]">
								{asText(fields.title, DEFAULTS.title)}
							</h1>
						</Reveal>

						<Reveal delay={200}>
							<p className="max-w-xl text-sm leading-7 text-[#59645D] sm:text-base">
								{asText(fields.description, DEFAULTS.description)}
							</p>
						</Reveal>
					</div>

					<Reveal delay={250} className="hidden justify-end md:flex">
						<Link
							to={asText(fields.buttonLink, DEFAULTS.buttonLink)}
							className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#2A8C56] px-7 py-3 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(42,140,86,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#237648] hover:shadow-[0_10px_24px_rgba(42,140,86,0.22)]">
							{asText(fields.buttonText, DEFAULTS.buttonText)}
							<span aria-hidden="true">→</span>
						</Link>
					</Reveal>
				</div>

				{isLoading ? (
					<div className="grid gap-6 pt-12 md:grid-cols-3">
						{[0, 1, 2].map(item => (
							<div
								key={item}
								className="overflow-hidden rounded-2xl border border-[#E8EEE9] bg-white">
								<div className="h-[230px] animate-pulse bg-[#EAF0EC] sm:h-[260px]" />
								<div className="space-y-4 p-5 sm:p-6">
									<div className="h-6 w-3/4 animate-pulse rounded bg-[#EAF0EC]" />
									<div className="h-4 w-full animate-pulse rounded bg-[#F0F4F1]" />
									<div className="h-4 w-5/6 animate-pulse rounded bg-[#F0F4F1]" />
									<div className="h-11 w-32 animate-pulse rounded-xl bg-[#EAF0EC]" />
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="grid gap-6 pt-10 md:grid-cols-3">
						{workActions.map((program, index) => {
							const action = program as unknown as Record<string, unknown>;

							const thumbnail = action.thumbnailFile as
								| Record<string, unknown>
								| undefined;

							const thumbnailUrl =
								typeof thumbnail?.secure_url === "string" &&
								thumbnail.secure_url.trim()
									? thumbnail.secure_url
									: fallbackImages[index % fallbackImages.length];

							const title =
								asText(action.title) || asText(action.name) || "Our Program";

							const description =
								asText(action.caption) || asText(action.description);

							const createdAt = action.createdAt as
								| string
								| number
								| Date
								| undefined;

							const target = action.target;

							return (
								<Reveal
									key={String(action._id ?? action.id ?? index)}
									delay={index * 140}
									distance={30}>
									<article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5EDE7] bg-white shadow-[0_5px_24px_rgba(23,77,55,0.045)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C7DDCE] hover:shadow-[0_18px_40px_rgba(23,77,55,0.11)]">
										<div className="relative h-[230px] overflow-hidden sm:h-[260px]">
											<img
												src={thumbnailUrl}
												alt={title}
												loading="lazy"
												className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
											/>

											<div
												aria-hidden="true"
												className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70"
											/>

											<span className="absolute bottom-4 left-5 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#2A8C56] backdrop-blur-sm">
												Program {String(index + 1).padStart(2, "0")}
											</span>
										</div>

										<div className="flex flex-1 flex-col p-5 sm:p-6">
											<h3 className="text-xl font-bold capitalize leading-snug text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#2A8C56]">
												{title}
											</h3>

											<p className="mt-3 line-clamp-3 text-sm leading-7 text-[#68736C]">
												{description}
											</p>

											<div className="mt-6 flex items-center gap-3">
												<span className="shrink-0 text-xs font-bold uppercase tracking-wider text-[#849188]">
													{index % 2 !== 0 ? "Target" : "Date"}
												</span>

												<div className="min-w-0 flex-1 rounded-lg bg-[#F0F6F2] px-3 py-3 text-sm font-semibold text-[#2A8C56]">
													{index % 2 !== 0 ? (
														<span>{formatCurrency(String(target || 0))}</span>
													) : (
														<span>
															{dayjs(
																createdAt ??
																	fallbackPrograms[
																		index % fallbackPrograms.length
																	].createdAt,
															).format("MMMM YYYY")}{" "}
															- Present
														</span>
													)}
												</div>
											</div>

											<div className="mt-6 border-t border-[#EDF1EE] pt-5">
												<Link
													to="/programs"
													className="inline-flex items-center gap-2 text-sm font-bold text-[#2A8C56] transition-all duration-300 hover:gap-4">
													Read more
													<span aria-hidden="true">→</span>
												</Link>
											</div>
										</div>
									</article>
								</Reveal>
							);
						})}
					</div>
				)}

				<Reveal delay={200}>
					<div className="mt-8 flex justify-center md:hidden">
						<Link
							to={asText(fields.buttonLink, DEFAULTS.buttonLink)}
							className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#2A8C56] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#237648]">
							{asText(fields.buttonText, DEFAULTS.buttonText)}
							<span aria-hidden="true">→</span>
						</Link>
					</div>
				</Reveal>
			</div>
		</section>
	);
};

export default OurWorkInAction;
