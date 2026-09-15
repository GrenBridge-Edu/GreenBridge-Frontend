import Hero from "../../components/shared/Hero";
import programBG from "../../assets/images/programBG.jpg";
import CurvePatternTop from "../../components/shared/CurvePattern";
import AllPrograms from "./components/AllPrograms";

const Programs = () => {
	return (
		<>
			<main className="relative">
				<Hero
					backgroundImage={programBG}
					heading="Our Programs & Projects"
					subtext="Empowering communities through education, innovation, and sustainable development. Each initiative represents a step toward a greener, more equitable future"
					isSearch="Search for a program..."
				/>
				<CurvePatternTop />
			</main>
			<AllPrograms />
		</>
	);
};

export default Programs;
