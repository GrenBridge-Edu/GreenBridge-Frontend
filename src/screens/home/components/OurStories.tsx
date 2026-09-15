import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import homeStory1 from "../../../assets/images/homeStory1.png";
import homeStory2 from "../../../assets/images/homeStory2.png";
import homeStory3 from "../../../assets/images/homeStory3.png";
import homeStory4 from "../../../assets/images/homeStory4.png";
import homeStory5 from "../../../assets/images/homeStory5.png";
import homeStory6 from "../../../assets/images/homeStory6.png";
import { useRef } from "react";

const OurStories = () => {
	const stories = [
		{
			title: "Aisha’s Journey: From Dropout to STEM Advocate",
			description:
				"Aisha grew up in a rural village where girls rarely finished school. Through Green Bridge’s Students to School program, she received a scholarship and mentorship that helped her return to class. Today, she teaches young girls how to code and dreams of starting a solar tech company in her community.",
			image: homeStory1,
		},
		{
			title: "The Classroom That Found Light",
			description:
				"In a small community school, lessons once stopped by noon because of darkness. After Green Bridge’s Electrify a Neighborhood project installed solar panels, evening classes began. Students can now study longer, and teachers hold after-school workshops — a simple change that ignited hope and progress.",
			image: homeStory2,
		},
		{
			title: "Lighting Up Hope in Oke-Ira Village",
			description:
				"For years, the small Oke-Ira community lived in darkness once the sun set. Through the Electrify a Neighborhood initiative, Green Bridge installed solar-powered streetlights and rechargeable lanterns for households. The result extended study hours for children, safety, and a revived evening market. The village now calls the lights “our stars of hope.",
			image: homeStory3,
		},
		{
			title: "From Waste to Wonders: The Green Youth Initiative",
			description:
				"In collaboration with local schools, Green Bridge launched the GroundUp Sustainability Club, where students learn to recycle plastics into creative art and usable items. Over 500 students have participated, turning waste into wealth while spreading awareness on environmental conservation.",
			image: homeStory4,
		},
		{
			title: "Empowering Teachers for a Greener Future",
			description:
				"Green Bridge organized a sustainability workshop for rural educators, training over 100 teachers on how to incorporate climate education and STEM projects into their classrooms. One participant, Mr. Bamidele, said, “It changed how I teach. Now my students build solar-powered models instead of just reading about them.",
			image: homeStory5,
		},
		{
			title: "Aisha’s Journey Back to School",
			description:
				"Aisha, a 10-year-old girl from northern Nigeria, had to stop schooling after her parents couldn’t afford uniforms and books. Through the Send a Child to School program, Green Bridge provided her with school supplies and tuition support. Today, Aisha dreams of becoming a science teacher — inspiring other girls in her community.",
			image: homeStory6,
		},
	];

	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);

	const pairedStories = [];
	for (let i = 0; i < stories.length; i += 2) {
		pairedStories.push(stories.slice(i, i + 2));
	}

	return (
		<div className=" px-10 md:px-40 py-10 md:pt-24 md:pb-70 bg-[#D8EAE0]">
			<div className="grid md:grid-cols-2">
				<div className="flex flex-col">
					<h2 className="text-[#2A8C56] uppercase text-[16px]">Our stories</h2>
					<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
						lives we've touched
					</h1>
					<p className="text-[#3A3A3A] text-[16px]">
						Every project begins with hope — and every success carries a story.
						Meet the individuals and communities whose lives have been
						transformed through our programs and your support.
					</p>
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
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{" "}
								{/* Adjust layout as needed */}
								{pair.map((hero, hdx) => (
									<div
										className="grid grid-cols-2 rounded-2xl bg-white"
										key={hdx}>
										<img
											src={hero?.image}
											alt={hero?.title}
											className=" rounded-l-2xl h-[50vh] object-cover  transition-all ease-in-out hover:scale-105"
											loading="lazy"
										/>
										<div className="p-3">
											<div className="bg-[#2A8C56] rounded-2xl p-2">
												<h3 className="text-[#ffffff] font-bold capitalize text-[16px] py-1">
													{hero?.title}
												</h3>
											</div>
											<p className="text-[#3A3A3A] text-[12px] pt-3 leading-7">
												{hero?.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default OurStories;
