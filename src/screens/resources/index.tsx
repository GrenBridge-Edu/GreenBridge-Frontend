import Hero from "../../components/shared/Hero";
import resourcesBG from "../../assets/images/resourcesBG.jpg";
import CurvePatternTop from "../../components/shared/CurvePattern";
import AllResources from "./components/AllResources";

const Resources = () => {
	return (
		<>
			<main className="relative">
				<Hero
					backgroundImage={resourcesBG}
					heading="Empowering Change Through Knowledge"
					subtext="Explore our collection of blogs, articles, reports, and educational materials on sustainable development and quality education."
					isSearch="Search by Topic..."
				/>

				<CurvePatternTop />
			</main>
			<AllResources />
		</>
	);
};

export default Resources;
