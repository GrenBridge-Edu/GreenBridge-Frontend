import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";

import { useInfiniteProgramsQuery } from "../../../data/queries/homeContent.queries";
import type { Program } from "../../../data/endpoints/programs.api";

import { asText, formatCurrency } from "../../home/data/homeContent";
import { useProgramsSection } from "../data/programsContent";
import { Button } from "../../../components/ui";
import DonationModal from "../../../components/modals/DonationModal";
import Reveal from "../../../components/shared/Reveal";

const DEFAULTS = {
	title: "Our Programs",
	description:
		"Discover the projects making a difference in communities through education, innovation, and sustainable development.",
};

const programImages = [
	"/images/homeProgram1.png",
	"/images/homeProgram2.png",
	"/images/resourcesBG.jpg",
	"/images/program1.png",
	"/images/homeBG1.jpg",
];

const pastProgramImages = [
	"/images/programP1.png",
	"/images/programP2.png",
	"/images/homeResources5.png",
	"/images/programP4.png",
];

type DisplayProgram = Program & {
	thumbnailFile?: {
		secure_url?: string;
	};
	raised?: number;
	totalDonors?: number;
	status?: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const fallbackPrograms: DisplayProgram[] = [
	{
		id: "fallback-child-to-school",
		title: "Child to School",
		target: 1_200_000,
		totalRaised: 400_000,
		raised: 400_000,
		numberOfDonors: 12,
		totalDonors: 12,
		progress: 40,
		statusText: "Ongoing",
		description:
			"This program supports children from underprivileged communities by providing school materials, uniforms, and tuition assistance. Together, we can keep more children in classrooms and build the bridge toward sustainable education. Your contribution helps turn dreams into possibilities, one child at a time.",
		thumbnailFile: { secure_url: programImages[0] },
		startDuration: dayjs().subtract(5, "months").format("YYYY-MM-DD"),
	},
	{
		id: "fallback-sustainable-fashion",
		title: "Sustainable Fashion Drive",
		target: 600_000,
		totalRaised: 200_000,
		raised: 200_000,
		numberOfDonors: 6,
		totalDonors: 6,
		progress: 33,
		statusText: "Ongoing",
		description:
			"This project empowers youth and local tailors with skills in eco-friendly design, fabric recycling, and sustainable clothing production. Your support helps reduce waste and promote sustainable clothing.",
		thumbnailFile: { secure_url: programImages[1] },
		startDuration: dayjs().subtract(4, "months").format("YYYY-MM-DD"),
	},
	{
		id: "fallback-stem-for-all",
		title: "STEM for All Initiative",
		target: 3_000_000,
		totalRaised: 1_000_000,
		raised: 1_000_000,
		numberOfDonors: 24,
		totalDonors: 24,
		progress: 33,
		statusText: "Ongoing",
		description:
			"Through this program, Green Bridge brings STEM education to young learners, especially girls and students from underserved areas. We provide training kits, workshops, and mentorship to nurture future innovators.",
		thumbnailFile: { secure_url: programImages[3] },
		startDuration: dayjs().subtract(3, "months").format("YYYY-MM-DD"),
	},
];

const fallbackPastPrograms: DisplayProgram[] = [
	{
		id: "fallback-feed-the-future",
		title: "Feed the Future",
		target: 1_200_000,
		totalRaised: 1_200_000,
		raised: 1_200_000,
		numberOfDonors: 12,
		totalDonors: 12,
		progress: 100,
		statusText: "Completed",
		description:
			"This initiative provided nutritious meals to families affected by food insecurity. By collaborating with local farmers and food banks, we helped communities reduce hunger and waste simultaneously.",
		thumbnailFile: { secure_url: pastProgramImages[0] },
		startDuration: dayjs().subtract(8, "months").format("YYYY-MM-DD"),
		endDuration: dayjs().subtract(3, "months").format("YYYY-MM-DD"),
		isTargetReached: true,
	},
	{
		id: "fallback-green-community",
		title: "Green Community Initiative",
		target: 600_000,
		totalRaised: 600_000,
		raised: 600_000,
		numberOfDonors: 6,
		totalDonors: 6,
		progress: 100,
		statusText: "Completed",
		description:
			"A sustainability drive aimed at reforesting degraded areas and promoting eco-conscious living. Trees were planted, and schools adopted eco-clubs to keep the campaign alive.",
		thumbnailFile: { secure_url: pastProgramImages[1] },
		startDuration: dayjs().subtract(9, "months").format("YYYY-MM-DD"),
		endDuration: dayjs().subtract(4, "months").format("YYYY-MM-DD"),
		isTargetReached: true,
	},
	{
		id: "fallback-clean-water",
		title: "Clean Water for All",
		target: 3_000_000,
		totalRaised: 3_000_000,
		raised: 3_000_000,
		numberOfDonors: 24,
		totalDonors: 24,
		progress: 100,
		statusText: "Completed",
		description:
			"By constructing new boreholes and installing solar-powered pumps, this project provided sustainable access to safe drinking water across multiple communities.",
		thumbnailFile: { secure_url: pastProgramImages[3] },
		startDuration: dayjs().subtract(10, "months").format("YYYY-MM-DD"),
		endDuration: dayjs().subtract(5, "months").format("YYYY-MM-DD"),
		isTargetReached: true,
	},
];

const getProgramImage = (
	program: DisplayProgram,
	index: number,
	isPast: boolean,
) => {
	const legacyUrl = program.thumbnailFile?.secure_url;
	const apiUrl = program.thumbnail?.url;

	if (typeof apiUrl === "string" && apiUrl.trim()) return apiUrl;
	if (typeof legacyUrl === "string" && legacyUrl.trim()) return legacyUrl;

	const images = isPast ? pastProgramImages : programImages;
	return images[index % images.length];
};

const AllPrograms = () => {
	const { fields } = useProgramsSection("introduction", DEFAULTS);

	const [isProgram, setIsProgram] = useState<"ongoing" | "past">("ongoing");
	const [selectedProgram, setSelectedProgram] = useState<DisplayProgram | null>(
		null,
	);

	const apiProgramType = isProgram === "past" ? "PAST" : "ONGOING";

	const filters = useMemo(
		() => ({ programType: apiProgramType }),
		[apiProgramType],
	);

	const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useInfiniteProgramsQuery(filters);

	const sentinelRef = useRef<HTMLDivElement | null>(null);

	const fetchedPrograms = useMemo(
		() =>
			data?.pages.flatMap(page =>
				Array.isArray(page.data) ? page.data : [],
			) ?? [],
		[data],
	);

	const fallback =
		isProgram === "past" ? fallbackPastPrograms : fallbackPrograms;

	const workActions: DisplayProgram[] =
		fetchedPrograms.length > 0 ? fetchedPrograms : fallback;

	useEffect(() => {
		const sentinel = sentinelRef.current;

		if (!sentinel || !hasNextPage || isFetchingNextPage || isLoading) {
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
	}, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

	const openProgramDonation = (program: DisplayProgram) => {
		// Fallback entries use local IDs, not real database IDs.
		// Only API programs with a MongoDB _id can be donated to specifically.
		const programId = program._id;

		if (
			typeof programId !== "string" ||
			!programId.trim() ||
			!fetchedPrograms.some(item => String(item._id) === programId)
		) {
			return;
		}

		setSelectedProgram(program);
	};

	return (
		<section className="relative overflow-hidden px-6 py-10 md:px-40 md:py-24">
			<div className="pointer-events-none absolute -right-32 top-24 h-72 w-72 rounded-full bg-[#D4E8DD]/40 blur-3xl" />

			<div className="relative grid items-end gap-8 md:grid-cols-2">
				<div className="flex flex-col">
					<Reveal distance={24}>
						<h1 className="py-1 text-[32px] font-bold capitalize tracking-tight text-[#1A1A1A]">
							{isProgram === "ongoing"
								? asText(fields.title, DEFAULTS.title)
								: "Past Programs"}
						</h1>
					</Reveal>

					<Reveal distance={24} delay={100}>
						<p className="text-[16px] leading-8 text-[#3A3A3A]">
							{isProgram === "ongoing"
								? asText(fields.description, DEFAULTS.description)
								: "These completed programs are a testament to what we can achieve together. Each one tells a story of hope, progress, and the lasting change your support made possible."}
						</p>
					</Reveal>
				</div>

				<Reveal
					distance={20}
					className="md:absolute md:right-5 md:-top-20 md:z-30">
					<div className="w-full rounded-full bg-[#D8EAE0] p-4 md:max-w-xl md:p-6">
						<div className="grid grid-cols-2 gap-3">
							{(["ongoing", "past"] as const).map(program => (
								<Button
									variant={isProgram === program ? "secondary" : "outline"}
									key={program}
									onClick={() => {
										setIsProgram(program);
										setSelectedProgram(null);
									}}
									className={`mt-auto min-h-12 rounded-full px-1 py-3 text-[12px] uppercase transition-all ease-in-out hover:scale-105 hover:shadow md:px-5 md:text-lg ${
										isProgram === program
											? "border border-transparent bg-white font-bold text-black shadow"
											: "text-[#3A3A3A]"
									}`}>
									{`${program} programs`}
								</Button>
							))}
						</div>
					</div>
				</Reveal>
			</div>

			{isLoading && fetchedPrograms.length === 0 ? (
				<div className="grid gap-8 pt-10">
					{[0, 1, 2].map(item => (
						<div key={item} className="grid animate-pulse gap-6 md:grid-cols-2">
							<div className="min-h-64 rounded-2xl bg-gray-100 md:min-h-80" />
							<div className="space-y-4 p-3">
								<div className="h-7 w-2/3 rounded bg-gray-100" />
								<div className="h-4 rounded bg-gray-100" />
								<div className="h-4 w-5/6 rounded bg-gray-100" />
								<div className="h-12 rounded bg-gray-100" />
							</div>
						</div>
					))}
				</div>
			) : (
				<>
					{workActions.length === 0 ? (
						<p className="py-10 text-[#3A3A3A]">
							No {isProgram} programs are available right now.
						</p>
					) : (
						<div className="grid gap-6 pt-10">
							{workActions.map((program, index) => {
								const image = getProgramImage(
									program,
									index,
									isProgram === "past",
								);

								const target = Number(program.target ?? 0);
								const raised = Number(
									program.totalRaised ?? program.raised ?? 0,
								);

								const progress = Math.min(
									100,
									Math.max(
										0,
										Number(
											program.progress ??
												(target > 0 ? (raised / target) * 100 : 0),
										),
									),
								);

								const startDate = program.startDuration || program.createdAt;
								const endDate = program.endDuration;
								const programKey = String(
									program._id ?? program.id ?? `${program.title}-${index}`,
								);

								return (
									<Reveal
										key={programKey}
										distance={28}
										delay={(index % 3) * 100}>
										<div>
											<div className="grid items-stretch gap-6 md:grid-cols-2">
												<div className="relative min-h-64 rounded-2xl md:min-h-80">
													<div className="absolute left-3 top-0 z-0 h-[90%] w-[85%] rounded-xl bg-[#2A8C56] md:-top-3" />

													<img
														src={image}
														alt={program.title}
														loading="lazy"
														className="absolute inset-0 z-10 h-[90%] w-5/6 rounded-2xl object-cover transition-transform duration-700 hover:scale-[1.02]"
													/>
												</div>

												<div className="p-3">
													<h2 className="py-1 text-[20px] font-bold capitalize tracking-tight text-[#1A1A1A]">
														{program.title}
													</h2>

													<p className="pt-3 text-[14px] leading-7 text-[#3A3A3A]">
														{program.description || program.caption || ""}
													</p>

													{isProgram === "past" ? (
														<div className="flex flex-wrap items-center gap-2 py-3 text-xs">
															<span>Target:</span>

															<div className="w-auto rounded-lg bg-[#D8EAE0] p-2">
																{formatCurrency(target)} goal
																{program.isTargetReached ? " reached" : ""}
															</div>

															{startDate && (
																<div className="w-auto rounded-lg bg-[#D8EAE0] p-2">
																	{dayjs(startDate).format("MMMM YYYY")}
																	{" - "}
																	{endDate
																		? dayjs(endDate).format("MMMM YYYY")
																		: "Completed"}
																</div>
															)}

															<div className="w-auto rounded-full border bg-[#ECFDF3] p-2 text-green-600">
																{program.isTargetReached || progress >= 100
																	? "Target Achieved"
																	: "Successful"}
															</div>
														</div>
													) : (
														<>
															<div className="flex flex-wrap items-center gap-3 py-3">
																<span>Target:</span>

																<div className="w-auto rounded-lg bg-[#D8EAE0] p-2">
																	{formatCurrency(target)}
																</div>

																{startDate && (
																	<div className="w-auto rounded-lg bg-[#D8EAE0] p-2">
																		{dayjs(startDate).format("MMMM YYYY")} -
																		{" Present"}
																	</div>
																)}
															</div>

															<div className="block w-full">
																<div className="flex w-full items-center gap-2">
																	<div
																		className="relative h-2 w-full rounded-full bg-[#E0D5E9]"
																		role="progressbar"
																		aria-label={`${program.title} fundraising progress`}
																		aria-valuemin={0}
																		aria-valuemax={100}
																		aria-valuenow={Math.round(progress)}>
																		<div
																			className="h-full rounded-full bg-[#1C5D39] transition-[width] duration-1000 ease-out"
																			style={{ width: `${progress}%` }}
																		/>
																	</div>

																	<span className="shrink-0 text-sm">
																		{Math.round(progress)}%
																	</span>
																</div>
															</div>

															<div className="pt-3">
																<Button
																	onClick={() => openProgramDonation(program)}
																	disabled={
																		!program._id ||
																		!fetchedPrograms.some(
																			item =>
																				String(item._id) ===
																				String(program._id),
																		)
																	}
																	className="mt-auto min-h-12 rounded-2xl bg-[#2A8C56] px-10 py-3 text-white transition-all duration-500 ease-in-out hover:scale-105">
																	Donate to this Program
																</Button>
															</div>
														</>
													)}
												</div>
											</div>

											{index !== workActions.length - 1 && (
												<hr className="mt-6 bg-[#2A8C56]" />
											)}
										</div>
									</Reveal>
								);
							})}
						</div>
					)}

					<div ref={sentinelRef} className="h-2 w-full" />

					{isFetchingNextPage && (
						<div className="py-8 text-center text-sm text-[#3A3A3A]">
							Loading more programs...
						</div>
					)}

					{!hasNextPage &&
						fetchedPrograms.length > 0 &&
						!isFetchingNextPage && <hr className="mt-5 text-gray-50" />}
				</>
			)}

			<DonationModal
				isOpen={Boolean(selectedProgram)}
				onClose={() => setSelectedProgram(null)}
				isSpecific={selectedProgram}
				title="Donate to This Program"
			/>
		</section>
	);
};

export default AllPrograms;
