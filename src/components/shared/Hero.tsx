import { ArrowRight, Search } from "lucide-react";

type HeroProps = {
	backgroundImage: string;
	heading: string;
	subtext: string;
	isSearch?: string;
	isButtons?: boolean;
};

const Hero = ({
	isButtons = false,
	backgroundImage,
	heading,
	subtext,
	isSearch,
}: HeroProps) => {
	return (
		<section
			className="relative min-h-[88vh] bg-cover bg-center bg-no-repeat flex items-center px-10 md:px-40 py-10 md:py-24 text-white"
			id="hero"
			style={{ backgroundImage: `url(${backgroundImage})` }}>
			<div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>

			<div className="relative z-10 md:w-1/2">
				<h1 className="font-bold text-[40px] md:text-[48px] leading-tight">
					{heading}
				</h1>
				<p className="text-[18px] md:text-[22px] py-4">{subtext}</p>

				{isSearch && (
					<div className="relative">
						<div className="absolute cursor-pointer top-4 left-3">
							<Search color="#3A3A3A" />
						</div>

						<input
							type="search"
							className="pl-10 border bg-[#EFF3FA] w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-50 text-[#3A3A3A] placeholder:text-[#3A3A3A] focus:border-transparent"
							placeholder={isSearch || "Type here to search"}
						/>
					</div>
				)}

				{isButtons && (
					<div className="mt-6 flex gap-4">
						<button className="bg-[#2A8C56] px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition cursor-pointer flex items-center gap-2 hover:scale-105">
							Get Started <ArrowRight />
						</button>
						<button className="border bg-white border-white px-6 py-3 rounded-lg font-medium hover:bg-[#EFF3FA] text-[#2A8C56] transition cursor-pointer hover:scale-105">
							Learn More
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default Hero;
