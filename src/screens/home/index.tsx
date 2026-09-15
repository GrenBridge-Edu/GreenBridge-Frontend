import CurvePatternTop, {
	CurvePatternBottom,
} from "../../components/shared/CurvePattern";
import OurImpact from "./components/OurImpact";
import OurWorkInAction from "./components/OurWorkInAction";
import OurStories from "./components/OurStories";
import MainHero from "./components/MainHero";
import MakeDifference from "./components/MakeDifference";
import OurResources from "./components/Resources";
import OurPartners from "./components/OurPartners";

const Home = () => {
	return (
		<>
			<main className="relative">
				<MainHero />
				<CurvePatternTop />
			</main>
			<div className="relative">
				<OurImpact />
				<OurWorkInAction />
				<CurvePatternBottom />
			</div>
			<OurStories />
			<div className="relative">
				<MakeDifference />
			</div>
			<div className="relative">
				<OurResources />
				<CurvePatternBottom />
			</div>
			<OurPartners />
		</>
	);
};

export default Home;
