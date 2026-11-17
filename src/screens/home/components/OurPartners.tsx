import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import marquee1 from "../../../assets/svg/marquee1.svg";
import marquee2 from "../../../assets/svg/marquee2.svg";
import marquee3 from "../../../assets/svg/marquee3.svg";
import marquee4 from "../../../assets/svg/marquee4.svg";
import marquee5 from "../../../assets/svg/marquee5.svg";
import marquee6 from "../../../assets/svg/marquee6.svg";
import homeDonate from "../../../assets/svg/homeDonate.svg";
import homeVolunteer from "../../../assets/svg/homeVolunteer.svg";
import homePartner from "../../../assets/svg/homePartner.svg";

import {
	asItems,
	asText,
	getImageForViewport,
	getResponsiveImages,
	useHomeSection,
} from "../data/homeContent";

import Reveal from "../../../components/shared/Reveal";
import SafeHtml from "../../../components/SafeHtml";

interface PartnerItem {
	name?: string;
	imageUrl?: string;
	link?: string;
	images?: unknown;
	imageVariants?: unknown;
}

interface InvolvementItem {
	title?: string;
	description?: string;
	buttonText?: string;
	buttonLink?: string;
}

const DEFAULTS = {
	partnersTitle: "Allies in Impact",
	partnersDescription:
		"Each organization, business, and individual we collaborate with strengthens our impact — together, we bridge the gap between education, innovation, and sustainability.",
	getInvolvedTitle: "Be the Change — Join the Green Bridge Movement",
	getInvolvedDescription:
		"Your time, voice, or donation can help us build a more sustainable world. There are many ways to get involved — choose how you want to make an impact.",
	partners: [] as PartnerItem[],
	involvementItems: [
		{
			title: "Donate",
			description:
				"Support ongoing projects and help us reach more communities. Support ongoing projects and help us reach more communities.",
			buttonText: "Donate Now",
			buttonLink: "/donate",
		},
		{
			title: "Volunteer",
			description:
				"Support ongoing projects and help us reach more communities. Support ongoing projects and help us reach more communities.",
			buttonText: "Join as Volunteer",
			buttonLink: "/get-involved",
		},
		{
			title: "Partner With Us",
			description:
				"Support ongoing projects and help us reach more communities. Support ongoing projects and help us reach more communities.",
			buttonText: "Become a Partner",
			buttonLink: "/contact",
		},
	],
};

const fallbackLogos = [
	marquee1,
	marquee2,
	marquee3,
	marquee4,
	marquee5,
	marquee6,
];

const fallbackLinks = ["/donate", "/get-involved", "/contact"];

const involvementIcons = [homeDonate, homeVolunteer, homePartner];

const OurPartners = () => {
	const { fields, block } = useHomeSection("partners", DEFAULTS);

	const partners = asItems<PartnerItem>(fields.partners);
	const involvementItems = asItems<InvolvementItem>(fields.involvementItems);

	const uploadedPartners = partners
		.map((partner, index) => ({
			partner,
			index,
			images: getResponsiveImages(partner, block, index),
		}))
		.map(({ partner, index, images }) => ({
			partner,
			index,
			image: getImageForViewport(images) || partner.imageUrl || "",
		}))
		.filter(({ image }) => Boolean(image));

	const logos =
		uploadedPartners.length > 0
			? uploadedPartners.map(({ partner, index, image }) => ({
					name: asText(partner.name, `Partner ${index + 1}`),
					image,
					link: asText(partner.link),
				}))
			: fallbackLogos.map((image, index) => ({
					name: `Partner ${index + 1}`,
					image,
					link: "",
				}));

	const marqueeLogos = [...logos, ...logos];

	return (
		<section className="relative overflow-hidden bg-[#D8EAE0]">
			<div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-white/30 blur-3xl" />

			<div className="relative px-6 py-16 sm:px-10 md:px-16 md:py-24 lg:px-40">
				{/* Partners */}
				<div className="grid gap-6 md:grid-cols-2 md:items-end">
					<div className="flex flex-col">
						<Reveal distance={16}>
							<span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2A8C56]">
								<span className="h-1.5 w-1.5 rounded-full bg-[#2A8C56]" />
								Our Partners
							</span>
						</Reveal>

						<Reveal distance={20} delay={80}>
							<h2 className="py-1 text-3xl font-bold leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl">
								{asText(fields.partnersTitle, DEFAULTS.partnersTitle)}
							</h2>
						</Reveal>

						<Reveal distance={20} delay={140}>
							<p className="mt-3 max-w-2xl text-sm leading-7 text-[#4C5B51] sm:text-base">
								<SafeHtml
									html={asText(
										fields.partnersDescription,
										DEFAULTS.partnersDescription,
									)}
								/>
							</p>
						</Reveal>
					</div>
				</div>

				{/* Partner logo marquee */}
				<Reveal distance={20} className="relative mt-12">
					<div className="relative overflow-hidden border-y border-[#BFD8C7]/80 py-8">
						<div
							className="gallery-marquee flex w-max items-center gap-12 md:gap-16"
							style={{
								animation: "galleryScroll 28s linear infinite",
							}}>
							{marqueeLogos.map((partner, index) => {
								const logo = (
									<img
										src={partner.image}
										alt={partner.name}
										className="max-h-20 max-w-36 object-contain opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-24 sm:max-w-40"
										loading="lazy"
									/>
								);

								return partner.link ? (
									<a
										key={`${partner.name}-${index}`}
										href={partner.link}
										target="_blank"
										rel="noreferrer"
										aria-label={partner.name}
										className="group flex h-24 shrink-0 items-center justify-center rounded-xl px-4 transition-all duration-300 hover:bg-white/50">
										{logo}
									</a>
								) : (
									<div
										key={`${partner.name}-${index}`}
										className="group flex h-24 shrink-0 items-center justify-center rounded-xl px-4 transition-all duration-300 hover:bg-white/50">
										{logo}
									</div>
								);
							})}
						</div>
					</div>

					<style>{`
            @keyframes galleryScroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .gallery-marquee {
              width: max-content;
              will-change: transform;
            }

            .gallery-marquee:hover {
              animation-play-state: paused !important;
            }

            @media (prefers-reduced-motion: reduce) {
              .gallery-marquee {
                animation: none !important;
              }
            }
          `}</style>
				</Reveal>

				{/* Get involved */}
				<div className="mt-20 md:mt-28">
					<div className="grid gap-6 md:grid-cols-2 md:items-end">
						<div className="flex flex-col">
							<Reveal distance={16}>
								<span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2A8C56]">
									<span className="h-1.5 w-1.5 rounded-full bg-[#2A8C56]" />
									Get Involved
								</span>
							</Reveal>

							<Reveal distance={20} delay={80}>
								<h2 className="py-1 text-3xl font-bold leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl">
									{asText(fields.getInvolvedTitle, DEFAULTS.getInvolvedTitle)}
								</h2>
							</Reveal>

							<Reveal distance={20} delay={140}>
								<p className="mt-3 max-w-2xl text-sm leading-7 text-[#4C5B51] sm:text-base">
									<SafeHtml
										html={asText(
											fields.getInvolvedDescription,
											DEFAULTS.getInvolvedDescription,
										)}
									/>
								</p>
							</Reveal>
						</div>
					</div>

					<div className="grid gap-5 pt-10 md:grid-cols-3 md:gap-6">
						{involvementItems.map((item, index) => {
							const fallbackLink = fallbackLinks[index] ?? "/contact";
							const icon = involvementIcons[index];

							return (
								<Reveal
									key={`${item.title ?? "involvement"}-${index}`}
									distance={24}
									delay={index * 100}
									className="h-full">
									<article className="group relative flex h-full min-h-[310px] flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/65 p-6 shadow-[0_10px_35px_-25px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:shadow-[0_20px_45px_-25px_rgba(0,0,0,0.22)] sm:p-7">
										<div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#EAF4ED] transition-transform duration-500 group-hover:scale-125" />

										<div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF4ED] transition-colors duration-300 group-hover:bg-[#2A8C56]">
											{icon && (
												<img
													src={icon}
													alt=""
													aria-hidden="true"
													className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110"
												/>
											)}
										</div>

										<div className="relative mt-7">
											<h3 className="text-xl font-bold capitalize text-[#1A1A1A] sm:text-2xl">
												{asText(item.title, "Get involved")}
											</h3>

											<p className="mt-3 text-sm leading-7 text-[#59645C]">
												{asText(item.description)}
											</p>
										</div>

										<div className="relative mt-auto pt-7">
											<Link
												to={
													asText(item.buttonLink, fallbackLink) || fallbackLink
												}
												className="group/button inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#D9E9DE] bg-white px-5 py-3 text-sm font-semibold text-[#2A8C56] transition-all duration-300 hover:border-[#2A8C56] hover:bg-[#2A8C56] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2A8C56]">
												{asText(item.buttonText, "Read more")}
												<ArrowUpRight
													size={17}
													className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
												/>
											</Link>
										</div>
									</article>
								</Reveal>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurPartners;
