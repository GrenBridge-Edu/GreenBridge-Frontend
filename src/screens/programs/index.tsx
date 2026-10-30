import Hero from "../../components/shared/Hero";
import CurvePatternTop from "../../components/shared/CurvePattern";
import AllPrograms from "./components/AllPrograms";

import {
	asText,
	getImageForViewport,
	getResponsiveImages,
} from "../home/data/homeContent";

import { useProgramsSection } from "./data/programsContent";

const DEFAULTS = {
	title: "Our Programs & Projects",
	subtitle:
		"Empowering communities through education, innovation, and sustainable development. Each initiative represents a step toward a greener, more equitable future.",
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

const Programs = () => {
	const { fields, block } = useProgramsSection("hero", DEFAULTS);

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
					isSearch="Search by Topic..."
					animations={{
						background: true,
						typewriter: true,
						content: true,
					}}
					isActive
				/>

				<CurvePatternTop />
			</main>

			<AllPrograms />
		</>
	);
};

export default Programs;
