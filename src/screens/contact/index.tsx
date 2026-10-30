import Hero, { type HeroVisibility } from "../../components/shared/Hero";
import CurvePatternTop, {
	CurvePatternBottom,
} from "../../components/shared/CurvePattern";
import ContactFormInformation from "./components/ContactFormInformation";
import { useContactSection } from "./data/contactContent";
import FAQs from "../faq/components/FAQComponent";

const HERO_DEFAULTS = {
	title: "We’d Love to Hear From You",
	subtitle:
		"Whether you want to collaborate, volunteer, donate, or simply learn more about our work — your voice matters. Reach out and we’ll respond as soon as possible.",
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

const getText = (value: unknown, fallback = ""): string =>
	typeof value === "string" ? value : fallback;

const Contact = () => {
	const { fields, block } = useContactSection("hero", HERO_DEFAULTS);

	const visibility = fields.visibility as
		| Record<string, HeroVisibility>
		| undefined;

	const backgroundImages = {
		default: block?.imageUrl || "/images/getInvolvedBG.jpg",
		desktop: block?.images?.desktop?.url,
		tablet: block?.images?.tablet?.url,
		mobile: block?.images?.mobile?.url,
	};

	return (
		<>
			<main className="relative">
				<Hero
					backgroundImage={getText(
						block?.imageUrl,
						"/images/getInvolvedBG.jpg",
					)}
					backgroundImages={backgroundImages}
					heading={getText(fields.title, HERO_DEFAULTS.title)}
					subtext={getText(fields.subtitle, HERO_DEFAULTS.subtitle)}
					headingVisibility={visibility?.title}
					subtextVisibility={visibility?.subtitle}
					animations={{
						background: true,
						typewriter: true,
						content: true,
					}}
					isActive
				/>
				<CurvePatternTop />
			</main>

			<section className="relative">
				<ContactFormInformation />
				<CurvePatternBottom />
			</section>

			<FAQs />
		</>
	);
};

export default Contact;
