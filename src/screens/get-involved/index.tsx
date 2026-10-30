import Hero from "../../components/shared/Hero";
import CurvePatternTop from "../../components/shared/CurvePattern";

import JoinOurTeam from "./components/JoinOurTeam";
import PartnerWithUs from "./components/PartnerWithUs";
import Donate from "./components/Donate";

import {
	asText,
	getImageForViewport,
	getResponsiveImages,
	useHomeSection,
} from "../home/data/homeContent";

const DEFAULTS = {
	title: "Be Part of the Change",
	subtitle:
		"Your time, resources, and ideas can make a lasting impact. Join us in building a sustainable future through education, innovation, and community development.",
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

const GetInvolved = () => {
	const { fields, block } = useHomeSection("hero" as never, DEFAULTS);

	const images = getResponsiveImages(undefined, block);

	const backgroundImage =
		getImageForViewport(images) || "/images/getInvolvedBG.jpg";

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

			<JoinOurTeam />
			<Donate />
			<PartnerWithUs />
		</>
	);
};

export default GetInvolved;
