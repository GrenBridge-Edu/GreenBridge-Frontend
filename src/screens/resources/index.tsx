import Hero from "../../components/shared/Hero";
import CurvePatternTop from "../../components/shared/CurvePattern";
import AllResources from "./components/AllResources";

import {
	asText,
	getImageForViewport,
	getResponsiveImages,
} from "../home/data/homeContent";

import { useResourcesSection } from "./data/resourcesContent";

const DEFAULTS = {
	title: "Empowering Change Through Knowledge",
	subtitle:
		"Explore our collection of blogs, articles, reports, and educational materials on sustainable development and quality education.",
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

const Resources = () => {
	const { fields, block } = useResourcesSection("hero", DEFAULTS);

	const images = getResponsiveImages(undefined, block);
	const backgroundImage =
		getImageForViewport(images) || "/images/resourcesBG.jpg";

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

			<AllResources />
		</>
	);
};

export default Resources;
