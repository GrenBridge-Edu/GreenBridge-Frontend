import {
	asText,
	getImageForViewport,
	getResponsiveImages,
	useHomeSection,
} from "../data/homeContent";
import { useDonation } from "../../../hooks/useDonation";
import Reveal from "../../../components/shared/Reveal";
import SafeHtml from "../../../components/SafeHtml";

const DEFAULTS = {
	title: "Make a Difference Today",
	description:
		"Your donation helps us provide quality education and sustainable solutions to communities in need. Every contribution counts.",
	buttonText: "Donate now",
	buttonLink: "/donate",
};

const MakeDifference = ({ isHome = true }: { isHome?: boolean }) => {
	const { fields, block } = useHomeSection("make-a-difference", DEFAULTS);
	const { openDonationModal } = useDonation();

	const images = getResponsiveImages(undefined, block);
	const image = getImageForViewport(images) || "/images/homeDonate.png";

	return (
		<section className={`relative px-6 md:px-40 ${isHome ? "pb-75" : "py-12"}`}>
			<Reveal
				distance={24}
				className={`z-10 w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.16)] md:p-10 ${
					isHome
						? "absolute left-1/2 top-0 max-w-7xl -translate-x-1/2 -translate-y-1/2"
						: ""
				}`}>
				<div className="grid grid-cols-1 items-center gap-8 md:grid-cols-4 md:gap-10">
					<div className="flex flex-col items-start justify-center md:col-span-1">
						<span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2A8C56]">
							<span className="h-1.5 w-1.5 rounded-full bg-[#2A8C56]" />
							Be part of the change
						</span>

						<h3 className="py-1 text-2xl font-bold leading-tight tracking-tight text-[#1A1A1A] md:text-[28px]">
							{asText(fields.title, DEFAULTS.title)}
						</h3>

						<p className="py-3 text-sm leading-6 text-[#5A5A5A]">
							<SafeHtml
								html={asText(fields.description, DEFAULTS.description)}
							/>
						</p>

						<button
							type="button"
							onClick={() => openDonationModal()}
							className="group mt-3 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#2A8C56] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#237849] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2A8C56]">
							{asText(fields.buttonText, DEFAULTS.buttonText)}
							<span
								aria-hidden="true"
								className="transition-transform duration-300 group-hover:translate-x-1">
								→
							</span>
						</button>
					</div>

					<div className="min-h-64 overflow-hidden rounded-2xl md:col-span-3 md:min-h-[40vh]">
						<picture>
							{images.desktop && (
								<source media="(min-width: 1024px)" srcSet={images.desktop} />
							)}

							{images.tablet && (
								<source
									media="(min-width: 768px) and (max-width: 1023px)"
									srcSet={images.tablet}
								/>
							)}

							{images.mobile && (
								<source media="(max-width: 767px)" srcSet={images.mobile} />
							)}

							<img
								src={image}
								alt="Support Green Bridge's work"
								className="h-64 w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03] md:h-[40vh]"
								loading="lazy"
							/>
						</picture>
					</div>
				</div>
			</Reveal>
		</section>
	);
};

export default MakeDifference;
