import { useEffect, useState } from "react";
import PrimaryBtn from "../../../components/button";
import Divider from "@mui/material/Divider";
import { apiCall, nairaSignNeutral } from "../../../data/useFetcher";
import dayjs from "dayjs";
import programBG from "../../../assets/images/programBG.jpg";
import homeProgram1 from "../../../assets/images/homeProgram1.png";
import homeProgram2 from "../../../assets/images/homeProgram2.png";
import homeProgram3 from "../../../assets/images/resourcesBG.jpg";
import homeProgram4 from "../../../assets/images/program1.png";
import homeProgram5 from "../../../assets/images/homeBG1.jpg";
import pastProgram1 from "../../../assets/images/programP1.png";
import pastProgram2 from "../../../assets/images/programP2.png";
import pastProgram3 from "../../../assets/images/homeResources5.png";
import pastProgram4 from "../../../assets/images/programP4.png";
import { useProgramsStore } from "../../../data/stores/loggerStore";
import { GeneralDonationModal } from "../../../components/modals/DonationModal";

export const programs = [
	{
		isActive: true,
		title: "Child to School",
		target: 1200000,
		raised: 400000,
		totalDonors: 12,
		progress: 40,
		status: "ongoing",
		description:
			"This program supports children from underprivileged communities by providing school materials, uniforms, and tuition assistance. Together, we can keep more children in classrooms and build the bridge toward sustainable education. Your contribution helps turn dreams into possibilities, one child at a time.",
		thumbnailFile: { secure_url: homeProgram1 },
	},
	{
		thumbnailFile: { secure_url: homeProgram2 },
		isActive: true,
		title: "Sustainable Fashion Drive",
		target: 600000,
		raised: 200000,
		totalDonors: 6,
		progress: 88,
		status: "ongoing",
		description:
			"Fast fashion harms the planet, but sustainable choices can heal it. This project empowers youth and local tailors with skills in eco-friendly design, fabric recycling, and sustainable clothing production. By donating, you help reduce waste, promote creativity, and inspire a new generation of conscious creators.",
	},
	{
		thumbnailFile: { secure_url: homeProgram3 },
		isActive: false,
		title: "Community Sustainability Project",
		target: 600000,
		raised: 100000,
		totalDonors: 16,
		progress: 53,
		status: "draft",
		description:
			"GroundUp focuses on building eco-conscious communities through sustainable farming, waste recycling, and renewable energy education. By supporting this program, you’re helping create hands-on learning experiences that teach people how to care for their environment while improving their livelihoods. Every seed planted today grows into a sustainable tomorrow.",
	},
	{
		isActive: true,
		title: "STEM for All Initiative",
		target: 3000000,
		raised: 1000000,
		totalDonors: 24,
		progress: 30,
		status: "ongoing",
		description:
			"The future belongs to innovators. Through this program, Green Bridge brings STEM education to young learners — especially girls and students from underserved areas. We provide training kits, workshops, and mentorship to spark curiosity and nurture problem-solvers ready to shape a better, greener world.",
		thumbnailFile: { secure_url: homeProgram4 },
	},
	{
		thumbnailFile: { secure_url: homeProgram5 },
		isActive: false,
		title: "Electrify a Neighborhood",
		target: 1000000,
		raised: 650000,
		totalDonors: 32,
		progress: 32,
		status: "unpublished",
		description:
			"Access to clean energy changes everything — from children studying at night to families feeling safe after dark. This initiative installs solar-powered lighting systems in rural and semi-urban areas where electricity is scarce. Your donation helps light up homes, schools, and community centers, empowering lives and enabling growth.",
	},
];

export const pastPrograms = [
	{
		isActive: true,
		title: "Feed the Future",
		target: 1200000,
		raised: 400000,
		totalDonors: 12,
		progress: 40,
		status: "ongoing",
		description:
			"This initiative provided over 15,000 nutritious meals to families affected by food insecurity. By collaborating with local farmers and food banks, we helped communities reduce hunger and waste simultaneously.",
		thumbnailFile: { secure_url: pastProgram1 },
	},
	{
		thumbnailFile: { secure_url: pastProgram2 },
		isActive: true,
		title: "Green Community Initiative",
		target: 600000,
		raised: 200000,
		totalDonors: 6,
		progress: 88,
		status: "ongoing",
		description:
			"A sustainability drive aimed at reforesting degraded areas and promoting eco-conscious living. Over 5,000 trees were planted, and schools adopted eco-clubs to keep the campaign alive.",
	},
	{
		thumbnailFile: { secure_url: pastProgram3 },
		isActive: false,
		title: "Health for All Outreach",
		target: 600000,
		raised: 100000,
		totalDonors: 16,
		progress: 53,
		status: "draft",
		description:
			"This medical outreach offered free checkups, vaccinations, and medications to more than 2,000 residents across multiple rural regions. The project also trained local health workers to ensure long-term community wellness.",
	},
	{
		isActive: true,
		title: "Clean Water for All",
		target: 3000000,
		raised: 1000000,
		totalDonors: 24,
		progress: 30,
		status: "ongoing",
		description:
			"By constructing new boreholes and installing solar-powered pumps, this project provided sustainable access to safe drinking water for more than 10,000 people across four communities. Health and hygiene levels have greatly improved.",
		thumbnailFile: { secure_url: pastProgram4 },
	},
];

const AllPrograms = () => {
	const programType = ["ongoing", "past"],
		[isProgram, SetIsProgram] = useState<"ongoing" | "past">("ongoing");

	return (
		<div className=" px-10 md:px-40 py-10 md:py-24 relative">
			<div className="grid md:grid-cols-2 items-end gap-8">
				<div className="flex flex-col">
					<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
						{isProgram} Programs
					</h1>
					<p className="text-[#3A3A3A] text-[16px]">
						{isProgram === "ongoing"
							? `These are the projects currently making an impact in communities.
						Your support helps us keep them alive, growing, and reaching more
						lives every day.`
							: `These completed programs are a testament to what we can achieve together. Each one tells a story of hope, progress, and the lasting change your support made possible.`}
					</p>
				</div>
				<div className=" md:absolute md:right-5 md:-top-20 md:z-35">
					<div className="bg-[#D8EAE0] rounded-full w-full md:max-w-xl p-4 md:p-6 m-h-16 md:min-h-24">
						<div className="grid grid-cols-2 gap-3">
							{programType?.map((program, pdx) => (
								<PrimaryBtn
									text={`${program} programs`}
									key={pdx}
									onClick={() => SetIsProgram(program as "ongoing" | "past")}
									className={`py-3 rounded-full min-h-12 hover:scale-105 mt-auto ease-in-out transition-all uppercase text-[12px] md:text-lg px-1 md:px-5 ${
										isProgram === program
											? " bg-white shadow text-black border-transparent font-bold border"
											: " text-[#3a3a3a] hover:shadow"
									}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
			<OurWorkInAction programType={isProgram} />
		</div>
	);
};

export default AllPrograms;

const OurWorkInAction = ({
	programType,
}: {
	programType?: "ongoing" | "past";
}) => {
	const { getLogger, data } = useProgramsStore();
	const [datum, setDatum] = useState<dataType | any>({ docs: [] });

	useEffect(() => {
		apiCall({
			type: "get",
			url: `/api/v1/program/get-programs`,
			getter: (d: any) => getLogger(d),
			params: {
				programType,
			},
		});
	}, [programType]);

	useEffect(() => {
		setDatum(data);
	}, [data]);

	if (!data || datum?.docs?.length === 0)
		return (
			<ActualWorks
				workActions={programType === "past" ? pastPrograms : programs}
				programType={programType}
			/>
		);

	return <ActualWorks workActions={datum?.docs} programType={programType} />;
};

const ActualWorks = ({
	workActions,
	programType,
}: {
	workActions?: any[];
	programType?: "ongoing" | "past";
}) => {
	const [isProgramDonation, setIsProgramDonation] = useState<boolean | any>(
		false
	);
	return (
		<>
			<div className="grid gap-6 pt-10">
				{workActions?.map((program, pdx) => (
					<div className="" key={pdx}>
						<div className="grid md:grid-cols-2 gap-6 items-stretch">
							{/* Image Column - Full height with background layer behind */}
							<div className="relative rounded-2xl h-full min-h-64 md:min-h-80">
								{/* Green background layer (behind the image) */}
								<div className="absolute inset-0 bg-[#2A8C56] z-0 w-[85%] h-[90%] rounded-xl left-3 -top-2 md:-top-3" />

								{/* Actual image - covers the entire container */}
								<img
									src={program?.thumbnailFile?.secure_url || programBG}
									alt={program?.title}
									className="absolute inset-0 w-5/6 h-5/6 object-fit z-10 rounded-2xl"
								/>
							</div>
							<div className="">
								<div className="p-3">
									<h3 className="text-[#1a1a1a] font-bold capitalize text-[20px] py-1">
										{program?.title}
									</h3>
									<p className="text-[#3A3A3A] text-[14px] pt-3 leading-6">
										{program?.description}
									</p>
									{programType === "past" ? (
										<div className="flex items-center gap-2 py-3 text-xs">
											{pdx % 2 !== 0 ? (
												<>
													<span>Target:</span>
													<div className="bg-[#D8EAE0] p-2 rounded-lg w-auto">
														{nairaSignNeutral}
														{(program?.target || 0).toLocaleString()} goal
														reached
													</div>
												</>
											) : (
												<span></span>
											)}

											<div className="bg-[#D8EAE0] p-2 rounded-lg w-auto">
												{dayjs(
													program?.startDuration ||
														dayjs().subtract(5, "months")
												).format("MMMM YYYY")}{" "}
												- {dayjs(program?.endDuration).format("MMMM YYYY")}
											</div>
											<div className="text-green-600 bg-[#ECFDF3] p-2 rounded-full w-auto border">
												{pdx % 2 !== 0 ? (
													<span>Target Archieved</span>
												) : (
													<span>Successful</span>
												)}
											</div>
										</div>
									) : (
										<>
											<div className="flex items-center gap-3 pb-3">
												{pdx % 2 !== 0 ? <span>Target:</span> : <span></span>}
												<div className="bg-[#D8EAE0] p-2 rounded-lg w-auto">
													{pdx % 2 !== 0 ? (
														<span>
															{nairaSignNeutral}
															{(program?.target || 0).toLocaleString()}
														</span>
													) : (
														<span>
															{dayjs(program?.startDuration).format(
																"MMMM YYYY"
															)}{" "}
															- Present
														</span>
													)}
												</div>
											</div>
											{pdx % 2 !== 0 ? (
												<div className="block w-full">
													<div className="flex items-center gap-2 w-full">
														<div className="relative h-2 w-full rounded-full bg-[#E0D5E9]">
															<div
																className="h-full rounded-full bg-[#1C5D39]"
																style={{
																	width: `${program?.progress || 0}%`,
																}}></div>
														</div>
														<span>
															{(program?.progress || 0).toLocaleString()}%
														</span>
													</div>
												</div>
											) : (
												<span></span>
											)}
											<div className="pt-3">
												<PrimaryBtn
													// disabled={!!loading}
													// loading={!!loading}
													onClick={() => setIsProgramDonation(program)}
													width="w"
													text="Donate to this Program"
													className="bg-[#2A8C56] py-3 text-white rounded-2xl min-h-12 px-10 hover:scale-105 mt-auto ease-in-out transition-all duration-500"
												/>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
						{pdx !== workActions?.length - 1 && (
							<Divider className="bg-[#2A8C56]" />
						)}
					</div>
				))}
			</div>
			<GeneralDonationModal
				isOpen={!!isProgramDonation}
				onClose={() => setIsProgramDonation(false)}
				isSpecific={isProgramDonation}
				title="Donate to This Program"
			/>
		</>
	);
};
