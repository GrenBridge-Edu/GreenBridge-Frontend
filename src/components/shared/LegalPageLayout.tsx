import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import { Loader } from "lucide-react";

import Hero from "./Hero";
import Reveal from "./Reveal";
import { useLegalDocsListQuery } from "../../data/hooks/useLegal";

const SLUG_TO_PATH: Record<string, string> = {
	"terms": "/terms",
	"privacy-policy": "/privacy-policy",
	"donation-policy": "/donation-policy",
	"volunteer-policy": "/volunteer-policy",
};

interface LegalPageLayoutProps {
	title: string;
	children: ReactNode;
	imageUrl?: string;
}

const LegalPageLayout = ({
	title,
	children,
	imageUrl,
}: LegalPageLayoutProps) => {
	const { data: docs, isLoading } = useLegalDocsListQuery();

	return (
		<div>
			<Hero
				heading={title}
				subtext=""
				backgroundImage={imageUrl ?? ""}
				height="60vh"
				subtextVisibility={{ global: false }}
				animations={{
					background: true,
					content: true,
				}}
				isActive
			/>

			<div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:px-8 lg:grid-cols-[220px_1fr]">
				<Reveal distance={18}>
					<aside>
						<p
							className="mb-3 font-semibold"
							style={{
								color: "var(--color-text-muted)",
								fontFamily: "Syne, sans-serif",
							}}>
							Legal Documents
						</p>

						{isLoading ? (
							<div className="flex justify-center py-4">
								<Loader
									size={22}
									className="animate-spin"
									style={{ color: "var(--color-brand-primary)" }}
								/>
							</div>
						) : (
							<nav className="flex flex-col gap-1" aria-label="Legal documents">
								{docs?.map((doc, index) => (
									<Reveal key={doc.slug} delay={80 + index * 50} distance={8}>
										<NavLink
											to={SLUG_TO_PATH[doc.slug] ?? "#"}
											className={({ isActive }) =>
												`block rounded-xl px-4 py-2.5 text-sm transition-all duration-300 hover:translate-x-1 hover:bg-[var(--color-brand-mint)]/60 ${
													isActive ? "font-bold" : "font-medium"
												}`
											}
											style={({ isActive }) => ({
												background: isActive
													? "var(--color-brand-mint)"
													: "transparent",
												color: isActive
													? "var(--color-brand-primary)"
													: "var(--color-text-secondary)",
											})}>
											{doc.title}
										</NavLink>
									</Reveal>
								))}
							</nav>
						)}
					</aside>
				</Reveal>

				<Reveal delay={150} distance={20}>
					<div
						className="space-y-8 text-base"
						style={{ fontFamily: "Syne, sans-serif" }}>
						{children}
					</div>
				</Reveal>
			</div>
		</div>
	);
};

export default LegalPageLayout;
