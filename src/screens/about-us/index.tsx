import Hero from "../../components/shared/Hero";
import programBG from "../../assets/images/programBG.jpg";
import CurvePatternTop, {
	CurvePatternBottom,
} from "../../components/shared/CurvePattern";
import WhoWeAre from "./components/WhoWeAre";
import WhyWeExists from "./components/WhyWeExists";
import OurCoreValues from "./components/OurCoreValues";

const About = () => {
	return (
		<>
			<main className="relative">
				<Hero
					backgroundImage={programBG}
					heading="Empowering Communities Through Education and Sustainability"
					subtext="Green Bridge is a non-profit organization dedicated to promoting sustainable development by connecting people, innovation, and education."
				/>

				<CurvePatternTop />
			</main>
			<div className="relative">
				<WhoWeAre />
				<CurvePatternBottom />
			</div>
			<WhyWeExists />
			<OurCoreValues />
		</>
	);
};

export default About;
