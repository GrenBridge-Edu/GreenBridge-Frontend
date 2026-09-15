import { useEffect, useRef, useState } from "react";
import PrimaryBtn from "../../../components/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import programBG from "../../../assets/images/programBG.jpg";
import homeResources1 from "../../../assets/images/homeResources1.png";
import homeResources2 from "../../../assets/images/homeResources2.png";
import homeResources3 from "../../../assets/images/homeResources3.png";
import homeResources4 from "../../../assets/images/homeBG3.jpg";
import homeResources5 from "../../../assets/images/homeResources4.png";
import homeResources6 from "../../../assets/images/homeResources5.png";
import { ArrowRight } from "lucide-react";
import { useResourcesStore } from "../../../data/stores/loggerStore";
import { apiCall } from "../../../data/useFetcher";
import { useNavigate } from "react-router-dom";

export const resources = [
	{
		thumbnailFile: { secure_url: homeResources1 },
		title: "Bridging Sustainability Through Education",
		description:
			"Education remains the most powerful tool for sustainable growth. Here’s how Green Bridge’s school outreach programs are shaping brighter futures.",
		category: "BLOG",
		btnText: "read more",
	},
	{
		thumbnailFile: { secure_url: homeResources2 },
		title: "Green Energy Fair 2025 in Pictures",
		description:
			"A glimpse into our recent Green Energy Fair — bringing together innovators, students, and community leaders to discuss eco-solutions.",
		category: "NEWS",
	},
	{
		thumbnailFile: { secure_url: homeResources3 },
		title: "Water for All: A Short Documentary",
		description:
			"Watch how local partnerships helped us provide clean water to three underserved communities across Lagos.",
		category: "Educational video",
		btnText: "watch now",
	},
	{
		thumbnailFile: { secure_url: homeResources4 },
		title: "Water for All: A Short Documentary",
		description:
			"Watch how local partnerships helped us provide clean water to three underserved communities across Lagos.",
		category: "INFOGRAPHICS",
		btnText: "download",
	},
	{
		thumbnailFile: { secure_url: homeResources1 },
		title: "Renewable Energy at the Community Level",
		description:
			"It covers cost models, sustainability metrics, and local empowerment strategies that make renewable energy accessible to all.",
		category: "INFOGRAPHICS",
		btnText: "download",
	},
	{
		thumbnailFile: { secure_url: homeResources5 },
		title: "Renewable Energy at the Community Level",
		description:
			"It covers cost models, sustainability metrics, and local empowerment strategies that make renewable energy accessible to all.",
		category: "Blogs",
	},
	{
		thumbnailFile: { secure_url: homeResources6 },
		title: "The Power of Quality Education in Sustainable",
		description:
			"This article explores how investing in learning opportunities helps communities innovate, adapt to climate change, and build lasting social progress.",
		category: "BLOG",
	},
	{
		thumbnailFile: { secure_url: homeResources4 },
		title: "Building a Sustainable Future Together",
		description:
			"A short documentary capturing Green Bridge’s outreach programs, showcasing children, volunteers",
		category: "video",
		btnText: "watch",
	},
	{
		thumbnailFile: { secure_url: homeResources5 },
		title: "Renewable Energy at the Community Level",
		description:
			"It covers cost models, sustainability metrics, and local empowerment strategies that make renewable energy accessible to all.",
		category: "INFOGRAPHICS",
		btnText: "download",
	},
];

const OurResources = () => {
	const { getLogger, data } = useResourcesStore();
	const [datum, setDatum] = useState<dataType | any>({ docs: [] });

	useEffect(() => {
		apiCall({
			type: "get",
			url: `/api/v1/resource/get-resources`,
			getter: (d: any) => getLogger(d),
		});
	}, []);

	useEffect(() => {
		setDatum(data);
	}, [data]);

	if (!data || datum?.docs?.length === 0)
		return <MainOurResources resource={resources} />;

	return <MainOurResources resource={datum?.docs} />;
};

const MainOurResources = ({ resource = [] }: { resource?: any[] }) => {
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null),
		navigate = useNavigate();

	const pairedStories = [];
	for (let i = 0; i < resource?.length; i += 3) {
		pairedStories.push(resource?.slice(i, i + 3));
	}

	return (
		<div className=" px-10 md:px-40 py-10 md:py-24">
			<div className="grid md:grid-cols-2">
				<div className="flex flex-col">
					<h2 className="text-[#2A8C56] uppercase font-bold text-[16px]">
						Resources
					</h2>
					<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
						Learn. Grow. Take Action.
					</h1>
					<p className="text-[#3A3A3A] text-[16px]">
						Discover stories, guides, and updates from our work and partners —
						from classroom innovations to community impact projects and
						environmental solutions.
					</p>
				</div>
				<div className="hidden md:flex justify-end items-center">
					<PrimaryBtn
						// disabled={!!loading}
						// loading={!!loading}
						width="w"
						text="See all Resources"
						className="bg-[#2A8C56] py-3 text-white rounded-2xl min-h-12 px-10 hover:scale-105"
						onClick={() => navigate("/resources")}
					/>
				</div>
			</div>
			<div className="pt-10">
				<Swiper
					modules={[Autoplay, Pagination, Navigation]}
					autoplay={{ delay: 9000, disableOnInteraction: false }}
					onBeforeInit={(swiper: any) => {
						if (
							swiper.params.navigation &&
							typeof swiper.params.navigation !== "boolean"
						) {
							swiper.params.navigation.prevEl = prevRef.current;
							swiper.params.navigation.nextEl = nextRef.current;
						}
					}}
					navigation={{
						prevEl: prevRef.current,
						nextEl: nextRef.current,
					}}
					loop={true}
					className="mySwiper">
					{pairedStories?.map((pair, pdx) => (
						<SwiperSlide key={pdx}>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{" "}
								{/* Adjust layout as needed */}
								{pair.map((hero, hdx) => (
									<ResourceComponent key={hdx} hero={hero} />
								))}
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default OurResources;

export const ResourceComponent = ({ hero }: { hero: any }) => {
	return (
		<>
			<div className="rounded-2xl bg-white shadow border flex flex-col border-gray-100">
				<div className="relative">
					<img
						src={hero?.thumbnailFile?.secure_url || programBG}
						alt={hero?.title}
						className=" rounded-t-2xl h-[250px] object-cover  transition-all ease-in-out hover:scale-95 duration-500"
						loading="lazy"
					/>
					<div className="absolute bg-[#2A8C56] min-h-6 min-w-1/3 bottom-0 max-w-2/3 trapezoid pr-20 -left-2">
						<h3 className="text-[#ffffff] text-[16px] font-bold lg:text-[20px] uppercase text-center px-1">
							{hero?.category}
						</h3>
					</div>
				</div>
				<div className="p-3">
					<h3 className="text-[#1a1a1a] font-bold capitalize text-[20px] py-1">
						{hero?.title}
					</h3>
					<p className="text-[#3A3A3A] text-[14px] pt-3 leading-6">
						{hero?.description}
					</p>
				</div>
				<div className="flex justify-end items-center pr-5 mt-auto pb-3">
					<PrimaryBtn
						// disabled={!!loading}
						// loading={!!loading}
						width="w"
						text={hero?.btnText || "Read more"}
						className="border py-3 text-[#2A8C56] rounded-2xl min-h-12 px-10 hover:scale-105 mt-auto ease-in-out transition-all capitalize"
						icon={ArrowRight}
						iconPosition="right"
					/>
				</div>
			</div>
		</>
	);
};
