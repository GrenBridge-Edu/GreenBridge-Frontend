import {
	asText,
	getImageForViewport,
	getResponsiveImages,
} from "../../home/data/homeContent";
import Reveal from "../../../components/shared/Reveal";
import { useAboutSection } from "../data/aboutContent";
import SafeHtml from "../../../components/SafeHtml";

const DEFAULTS = {
	eyebrow: "about us",
	title: "who we are",
	description:
		"We are an NGO on a mission to cultivate comprehensive learning experiences while championing sustainable development across Africa and on a global scale. Our goal is to inspire young individuals and empower their minds to be able to independently develop sustainable solutions within their communities and future careers. By giving them access to the knowledge and tools for sustainable development, we empower them to shape the change they want to see, to see their communities and environment differently, and to build them up while growing academically and intellectually. We aim to nurture this spirit of innovation so it creates a ripple effect among young people.",
	imageUrl: "",
	secondaryImageUrl: "",
};

const WhoWeAre = () => {
	const { fields, block } = useAboutSection("story", DEFAULTS);

	const primaryImages = getResponsiveImages(
		{ imageUrl: fields.imageUrl },
		block,
		0,
	);

	const secondaryImages = getResponsiveImages(
		{ imageUrl: fields.secondaryImageUrl },
		block,
		1,
	);

	const primaryImage =
		getImageForViewport(primaryImages) || "/images/about1.png";

	const secondaryImage =
		getImageForViewport(secondaryImages) || "/images/homeProgram1.png";

	return (
		<section className="relative px-6 py-16 sm:px-10 md:px-16 md:py-28 lg:px-40">
			<div className="grid items-end gap-8 md:grid-cols-2">
				<div>
					<Reveal distance={20}>
						<h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#2A8C56]">
							{asText(fields.eyebrow, DEFAULTS.eyebrow)}
						</h2>
					</Reveal>

					<Reveal distance={24} delay={80}>
						<h1 className="py-2 text-3xl font-bold uppercase leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl">
							{asText(fields.title, DEFAULTS.title)}
						</h1>
					</Reveal>

					<Reveal distance={24} delay={160}>
						<p className="text-base leading-8 text-[#3A3A3A]">
							<SafeHtml
								html={asText(fields.description, DEFAULTS.description)}
							/>
						</p>
					</Reveal>

					<div className="py-4" />
				</div>
			</div>

			<Reveal
				distance={28}
				delay={120}
				className="relative mt-8 w-full md:absolute md:right-5 md:-top-5 md:z-30 md:mt-0 md:w-[40vw]">
				<div className=" md:absolute md:right-5 md:-top-20 md:z-30 md:w-[40vw] w-full">
					<div className="relative rounded-2xl h-full min-h-64 md:min-h-80">
						{/* Green background layer (behind the image) */}
						<div className="absolute inset-0 bg-[#2A8C56] z-0 w-full md:w-[85%] h-[90%] rounded-xl -left-5 -top-2 md:-top-3 md:ml-auto" />

						{/* Actual image - covers the entire container */}
						<img
							src={primaryImage}
							alt="About Green Bridge"
							className="absolute inset-0 w-full md:w-5/6 h-5/6 object-cover z-10 rounded-2xl md:ml-auto"
						/>
					</div>
					<div className="relative rounded-2xl h-full min-h-64 md:min-h-80">
						{/* Green background layer (behind the image) */}
						<div className="absolute inset-0 bg-[#2A8C56] z-0 w-full md:w-[85%] h-[90%] rounded-xl -left-5 -top-2 md:-top-3" />

						{/* Actual image - covers the entire container */}
						<img
							src={secondaryImage}
							alt="Green Bridge programs"
							className="absolute inset-0 w-full md:w-5/6 h-5/6 object-cover z-10 rounded-2xl"
						/>
					</div>
				</div>
			</Reveal>
		</section>
	);
};

export default WhoWeAre;
