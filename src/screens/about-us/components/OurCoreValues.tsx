import aboutTeam from "../../../assets/images/aboutTeam.jpg";

const OurCoreValues = () => {
	const coreValues = [
		{
			title: "Service",
			description: `We are committed to serving communities with compassion and purpose, ensuring our actions create real, lasting impact. `,
		},
		{
			title: "Integrity",
			description: `We uphold transparency, honesty, and accountability in everything we do.`,
		},
		{
			title: "Loyalty",
			description: `We remain steadfast in our mission, standing by communities and causes that drive meaningful change.`,
		},
		{
			title: "Excellence",
			description: `We pursue excellence through innovation, dedication, and continuous learning.`,
		},
	];
	return (
		<div className=" px-10 md:px-40 py-10 md:py-30">
			<div className="grid md:grid-cols-2 items-end gap-8">
				<div className="">
					<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
						Our Core Value
					</h1>
					<p className="text-[#3A3A3A] text-[16px] max-w-md">
						The principles that guide our work and define our commitment to
						communities
					</p>
				</div>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
				{coreValues?.map((core, mdx) => (
					<div
						className=" bg-white p-3 md:p-6 rounded-lg shadow-md hover:scale-105 transition-all duration-500 ease-in-out border border-gray-200"
						key={mdx}>
						<div className=" bg-[#2A8C56] h-12 w-12 flex items-center justify-center rounded-full shadow-md">
							<span className="font-bold text-white text-3xl">{mdx + 1}</span>
						</div>
						<h1 className="text-[#1A1A1A] font-bold capitalize text-[24px] py-1">
							{core?.title}
						</h1>
						<p className="text-[#3A3A3A] text-[14px] leading-8">
							{core?.description}
						</p>
					</div>
				))}
			</div>
			<div className="grid md:grid-cols-2 items-end gap-8 pt-20">
				<div className="relative rounded-2xl h-full min-h-64 md:min-h-80">
					{/* Green background layer (behind the image) */}
					<div className="absolute inset-0 bg-[#2A8C56] z-0 w-[85%] h-[90%] rounded-xl left-3 -top-2 md:-top-3" />

					{/* Actual image - covers the entire container */}
					<img
						src={aboutTeam}
						alt={"Our Team"}
						className="absolute inset-0 w-5/6 h-5/6 object-cover z-10 rounded-2xl"
					/>
				</div>
				<div className=" max-w-lg">
					<h2 className="text-[#2A8C56] font-bold uppercase text-[16px]">
						our team
					</h2>
					<h1 className="text-[#1A1A1A] font-bold text-[32px] py-1">
						Meet the People Behind the Mission
					</h1>
					<p className="text-[#3A3A3A] text-[16px] leading-8">
						Behind Green Bridge is a passionate group of individuals united by
						one goal — creating sustainable change through education,
						empowerment, and action. Each team member brings unique expertise,
						creativity, and compassion to drive our mission forward. Together,
						we work hand-in-hand with communities, partners, and volunteers to
						make lasting impact where it matters most.
					</p>
					<div className="py-4"></div>
				</div>
			</div>
		</div>
	);
};

export default OurCoreValues;
