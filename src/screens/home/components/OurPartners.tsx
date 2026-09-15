import PrimaryBtn from "../../../components/button";
import {
	HomeGetInvolved1,
	HomeGetInvolved2,
	HomeGetInvolved3,
} from "../../../utils/icons";
import marquee1 from "../../../assets/svg/marquee1.svg";
import marquee2 from "../../../assets/svg/marquee2.svg";
import marquee3 from "../../../assets/svg/marquee3.svg";
import marquee4 from "../../../assets/svg/marquee4.svg";
import marquee5 from "../../../assets/svg/marquee5.svg";
import marquee6 from "../../../assets/svg/marquee6.svg";

const OurPartners = () => {
	const getInvloved = [
		{
			title: "Donate",
			icon: HomeGetInvolved1,
			btnText: "Donate Now",
			description:
				"Support ongoing projects and help us reach more communities. Support ongoing projects and help us reach more communities.",
		},
		{
			description:
				"Support ongoing projects and help us reach more communities. Support ongoing projects and help us reach more communities.",
			icon: HomeGetInvolved2,
			btnText: "Join as Volunteer",
			title: "Volunteer",
		},
		{
			title: "Partner With Us",
			icon: HomeGetInvolved3,
			description:
				"Support ongoing projects and help us reach more communities. Support ongoing projects and help us reach more communities.",
			btnText: "Become a Partner",
		},
	];

	const marquees = [
		marquee1,
		marquee2,
		marquee3,
		marquee4,
		marquee5,
		marquee6,
		marquee1,
		marquee2,
		marquee3,
		marquee4,
		marquee5,
		marquee6,
	];
	return (
		<div className=" px-10 md:px-40 py-10 md:py-24 bg-[#D8EAE0]">
			<div className="grid md:grid-cols-2">
				<div className="flex flex-col">
					<h2 className="text-[#2A8C56] uppercase text-[16px] font-bold">
						Our Partners
					</h2>
					<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
						Allies in Impact
					</h1>
					<p className="text-[#3A3A3A] text-[16px]">
						Each organization, business, and individual we collaborate with
						strengthens our impact — together, we bridge the gap between
						education, innovation, and sustainability.
					</p>
				</div>
			</div>
			<div className="py-10 overflow-x-auto noscroll noScroll">
				<div
					className="flex items-center gap-10 gallery-marquee"
					style={{ animation: "galleryScroll 5s linear infinite" }}>
					{marquees?.map((image, index) => (
						<div
							key={index}
							className="relative shrink-0 transition-all duration-300 hover:z-10 hover:scale-110 hover:rotate-0">
							<img
								src={image}
								alt={`Image${index}`}
								className="object-cover rounded-lg curved-image"
							/>
						</div>
					))}
				</div>
				<style>{`
        @keyframes galleryScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .gallery-marquee {
          width: max-content;
        }
      `}</style>
			</div>
			<div className="grid md:grid-cols-2">
				<div className="flex flex-col">
					<h2 className="text-[#2A8C56] uppercase text-[16px] font-bold">
						Get Involved
					</h2>
					<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
						Be the Change — Join the Green Bridge Movement
					</h1>
					<p className="text-[#3A3A3A] text-[16px]">
						Your time, voice, or donation can help us build a more sustainable
						world. There are many ways to get involved — choose how you want to
						make an impact.
					</p>
				</div>
			</div>
			<div className="grid md:grid-cols-3 gap-6 pt-10">
				{getInvloved?.map((involve, idx) => {
					let Icon: any = involve?.icon;
					return (
						<div className="rounded-xl p-3" key={idx}>
							<div className=" bg-white h-12 w-12 flex items-center justify-center rounded-xl">
								<Icon className=" h-6 w-6" />
							</div>
							<h3 className="text-[#1A1A1A] font-bold capitalize text-[24px] py-1">
								{involve?.title}
							</h3>
							<p className="text-[#3A3A3A] text-[14px] py-3">
								{involve?.description}
							</p>
							<PrimaryBtn
								// disabled={!!loading}
								// loading={!!loading}
								width="w"
								text={involve?.btnText || "Read more"}
								className="hover:bg-[#2A8C56] py-3 hover:text-white rounded-2xl min-h-12 px-10 bg-white text-[#2A8C56] transition-all ease-in-out"
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default OurPartners;
