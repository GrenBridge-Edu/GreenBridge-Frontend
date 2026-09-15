import Divider from "@mui/material/Divider";
import {
	HomeOurImpactIcon1,
	HomeOurImpactIcon2,
	HomeOurImpactIcon3,
	HomeOurImpactIcon4,
} from "../../../utils/icons";

const OurImpact = () => {
	return (
		<div>
			<div className=" absolute -top-30 z-30 w-1/3 right-0 flex flex-col">
				<h2 className="text-[#2A8C56] font-bold uppercase text-[16px]">
					Our Impact
				</h2>
				<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
					Why Green Bridge Exists
				</h1>
				<p className="text-[#3A3A3A] text-[16px]">
					Making a difference in communities worldwide through sustainable
					development and education
				</p>
			</div>
			<MainImpact />
		</div>
	);
};

export default OurImpact;

export const MainImpact = ({ isHome = true }: { isHome?: boolean }) => {
	const impacts = [
		{
			name: "Students reached",
			value: 2500,
			icon: HomeOurImpactIcon1,
			isPlus: true,
		},
		{
			name: "Sustainability Programs",
			value: 44,
			icon: HomeOurImpactIcon2,
			isPlus: false,
		},
		{
			name: "Active Projects",
			value: 30,
			icon: HomeOurImpactIcon3,
			isPlus: true,
		},
		{
			name: "Communities Reached",
			value: 18,
			icon: HomeOurImpactIcon4,
			isPlus: false,
		},
	];

	return (
		<>
			<div className=" px-10 md:px-40 py-10 md:py-24">
				<div
					className={`grid grid-cols-2 md:grid-cols-4 gap-10 p-3 rounded-xl ${
						isHome ? "bg-[#D8EAE0]" : "bg-[#ffffff]"
					}`}>
					{impacts?.map((impact, idx) => {
						let Icon: any = impact?.icon;
						return (
							<div
								className="flex items-center gap-4 justify-between"
								key={idx}>
								<div className="flex flex-col items-center gap-3">
									<div className="flex items-center gap-4">
										<Icon className="w-8 h-8" />
										<h1 className="font-bold text-[40px] text-[#2A8C56]">
											{(impact?.value).toLocaleString()}
											{impact?.isPlus ? "+" : ""}
										</h1>
									</div>
									<p className="text-[#3A3A3A]">{impact?.name}</p>
								</div>
								{idx !== impacts?.length - 1 && (
									<Divider
										sx={{
											width: "2px",
											color: "#fff",
										}}
										orientation="vertical"
										// className="bg-white text-white"
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};