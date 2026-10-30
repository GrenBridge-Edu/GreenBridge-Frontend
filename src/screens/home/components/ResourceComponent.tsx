import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ResourceComponentProps {
	resource: Record<string, unknown>;
}

const ResourceComponent = ({ resource }: ResourceComponentProps) => {
	const thumbnail = resource.thumbnailFile as
		| Record<string, unknown>
		| undefined;

	const image =
		typeof thumbnail?.secure_url === "string" && thumbnail.secure_url.trim()
			? thumbnail.secure_url
			: typeof resource.imageUrl === "string" && resource.imageUrl.trim()
				? resource.imageUrl
				: "/images/homeResources1.png";

	const title =
		typeof resource.title === "string" && resource.title.trim()
			? resource.title
			: "Green Bridge Resource";

	const description =
		typeof resource.description === "string"
			? resource.description
			: typeof resource.caption === "string"
				? resource.caption
				: "";

	const category =
		typeof resource.category === "string" && resource.category.trim()
			? resource.category
			: "Resource";

	const id = String(resource._id ?? resource.id ?? "");
	const link = id ? `/resources/${id}` : "/resources";

	const buttonText =
		typeof resource.btnText === "string" && resource.btnText.trim()
			? resource.btnText
			: "Read more";

	return (
		<article className="group flex h-full min-h-[440px] flex-col overflow-hidden rounded-2xl border border-[#E9EFEA] bg-white shadow-[0_8px_30px_-18px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D5E8DA] hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.2)]">
			<div className="relative h-[230px] shrink-0 overflow-hidden bg-[#F0F4F1] sm:h-[250px]">
				<img
					src={image}
					alt={title}
					className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
					loading="lazy"
				/>

				<div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />

				<div className="absolute bottom-4 left-4">
					<span className="inline-flex items-center rounded-full border border-white/30 bg-[#2A8C56] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm backdrop-blur-sm sm:text-xs">
						{category}
					</span>
				</div>
			</div>

			<div className="flex flex-1 flex-col p-5 sm:p-6">
				<h3 className="line-clamp-2 text-lg font-bold leading-snug text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#2A8C56] sm:text-xl">
					{title}
				</h3>

				<p className="mt-3 line-clamp-4 text-sm leading-6 text-[#626B65]">
					{description}
				</p>

				<div className="mt-auto flex items-center justify-between border-t border-[#EEF2EF] pt-5 mt-6">
					<Link
						to={link}
						className="group/link inline-flex min-h-10 items-center gap-2 text-sm font-semibold capitalize text-[#2A8C56] transition-colors duration-300 hover:text-[#1F6F43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2A8C56]">
						{buttonText}
						<ArrowUpRight
							size={17}
							className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
						/>
					</Link>

					<span className="text-xs font-medium tracking-wider text-[#A0AAA3]">
						GREEN BRIDGE
					</span>
				</div>
			</div>
		</article>
	);
};

export default ResourceComponent;
