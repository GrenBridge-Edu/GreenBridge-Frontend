import Hero from "../../components/shared/Hero";
import getInvolvedBG from "../../assets/images/getInvolvedBG.jpg";
import CurvePatternTop from "../../components/shared/CurvePattern";
import JoinOurTeam from "./components/JoinOurTeam";
import PartnerWithUs from "./components/PartnerWithUs";
import Donate from "./components/Donate";

const GetInvolved = () => {
	return (
		<>
			<main className="relative">
				<Hero
					backgroundImage={getInvolvedBG}
					heading="Be Part of the Change and Change"
					subtext="Your time, resources, and ideas can make a lasting impact. Join us in building a sustainable future through education, innovation, and community development."
				/>
				<CurvePatternTop />
			</main>
			<JoinOurTeam />
			<Donate />
			<PartnerWithUs />
		</>
	);
};

export default GetInvolved;
