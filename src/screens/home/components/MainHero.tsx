import { useRef } from "react";
import Hero from "../../../components/shared/Hero";
import homeBG1 from "../../../assets/images/homeBG1.jpg";
import homeBG2 from "../../../assets/images/homeBG2.jpg";
import homeBG3 from "../../../assets/images/homeBG3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MainHero = () => {
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null),
		heroDetails = [
			{
				bg: homeBG1,
				heading: "Building Sustainable Futures Through Education",
				subtext:
					"Join Green Bridge in our mission to promote sustainable development and quality education as the foundation for growth. Together, we can create lasting change in communities worldwide.",
			},
			{
				bg: homeBG2,
				heading: "Building Sustainable Futures Through Education",
				subtext:
					"Join Green Bridge in our mission to promote sustainable development and quality education as the foundation for growth. Together, we can create lasting change in communities worldwide.",
			},
			{
				bg: homeBG3,
				heading: "Building Sustainable Futures Through Education",
				subtext:
					"Join Green Bridge in our mission to promote sustainable development and quality education as the foundation for growth. Together, we can create lasting change in communities worldwide.",
			},
		];

	return (
		<>
			<Swiper
				modules={[Autoplay, Pagination, Navigation]}
				autoplay={{ delay: 9000, disableOnInteraction: false }}
				onBeforeInit={(swiper: any) => {
					if (typeof swiper.params.navigation !== "boolean") {
						swiper.params.navigation.prevEl = prevRef.current;
						swiper.params.navigation.nextEl = nextRef.current;
					}
				}}
				//  pagination={{ clickable: true }}
				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current,
				}}
				loop={true}
				className="mySwiper">
				{heroDetails?.map((hero, hdx) => (
					<SwiperSlide key={hdx}>
						<Hero
							backgroundImage={hero?.bg}
							heading={hero?.heading}
							subtext={hero?.subtext}
							isButtons
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default MainHero;
