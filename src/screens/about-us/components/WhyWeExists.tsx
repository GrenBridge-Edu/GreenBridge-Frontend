import { HomeGetInvolved1 } from "../../../utils/icons";
import { MainImpact } from "../../home/components/OurImpact";

const WhyWeExists = () => {
	const missionVison = [
		{
			title: "Mission",
			description: `To be at the intersection of education and environmental sustainability, fostering holistic learning
and sustainable development worldwide.`,
		},
		{
			title: "Vision",
			description: `To influence young people to create environmentally sustainable solutions in their localities and
future careers, and to make sustainable academic progress.`,
		},
	];

	return (
		<div className=" bg-[#D4E8DD] py-10 md:py-24 ">
			<div className=" px-10 md:px-40">
				<div className="grid items-end gap-8">
					<div className="w-full md:max-w-xl m-h-16 md:min-h-24">
						<div className="flex flex-col">
							<h2 className="text-[#2A8C56] font-bold uppercase text-[16px]">
								our impact
							</h2>
							<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
								Why Green Bridge Exists
							</h1>
							<p className="text-[#3A3A3A] text-[16px]">
								Making a difference in communities worldwide through sustainable
								development and education
							</p>
						</div>
					</div>
				</div>
			</div>
			<MainImpact isHome={false} />
			<div className=" px-10 md:px-40">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{missionVison?.map((mission, mdx) => (
						<div
							className=" bg-white p-5 md:p-10 md:pb-16 rounded-lg shadow-md hover:scale-105 transition-all duration-500 ease-in-out"
							key={mdx}>
							<div className=" bg-white h-24 w-24 flex items-center justify-center rounded-xl shadow-lg">
								<HomeGetInvolved1 className=" h-12 w-12" />
							</div>
							<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-3">
								{mission?.title}
							</h1>
							<p className="text-[#3A3A3A] text-[16px] leading-8">
								{mission?.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default WhyWeExists;
