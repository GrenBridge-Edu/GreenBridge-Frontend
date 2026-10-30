import Hero from "../../components/shared/Hero";
import CurvePatternTop, {
	CurvePatternBottom,
} from "../../components/shared/CurvePattern";
import WhoWeAre from "./components/WhoWeAre";
import WhyWeExists from "./components/WhyWeExists";
import OurCoreValues from "./components/OurCoreValues";
import {
	asText,
	getImageForViewport,
	getResponsiveImages,
	useHomeSection,
} from "../home/data/homeContent";

const DEFAULTS = {
	title: "Empowering Communities Through Education and Sustainability",
	subtitle:
		"Green Bridge is a non-profit organization dedicated to promoting sustainable development by connecting people, innovation, and education.",
	description: "",
	visibility: {
		title: {
			global: true,
			desktop: true,
			tablet: true,
			mobile: true,
		},
		subtitle: {
			global: true,
			desktop: true,
			tablet: true,
			mobile: true,
		},
		description: {
			global: true,
			desktop: true,
			tablet: true,
			mobile: true,
		},
	},
};

const About = () => {
	const { fields, block } = useHomeSection("hero" as never, DEFAULTS);

	const images = getResponsiveImages(undefined, block);
	const backgroundImage =
		getImageForViewport(images) || "/images/programBG.jpg";

	const visibility = fields.visibility as Record<string, unknown>;

	return (
		<>
			<main className="relative">
				<Hero
					backgroundImage={backgroundImage}
					backgroundImages={{
						default: images.default || backgroundImage,
						desktop: images.desktop,
						tablet: images.tablet,
						mobile: images.mobile,
					}}
					heading={asText(fields.title, DEFAULTS.title)}
					subtext={asText(fields.subtitle, DEFAULTS.subtitle)}
					headingVisibility={visibility?.title as never}
					subtextVisibility={visibility?.subtitle as never}
					animations={{
						background: true,
						typewriter: true,
						content: true,
					}}
					isActive
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
