import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MoreHorizontal, Heart } from "lucide-react";

import Logo from "./Logo";
import { siteConfig } from "../../data/Config";
import { useDonation } from "../../hooks/useDonation";

const SCROLL_THRESHOLD = 200;

const hidePreloader = () => {
	const preloader = document.getElementById("preloader");

	if (!preloader) return;

	preloader.classList.add("hidden");

	window.setTimeout(() => {
		preloader.remove();
		document.body.style.overflow = "";
	}, 2000);
};

const PublicNavBar = () => {
	const { pathname } = useLocation();
	const { openDonationModal } = useDonation();

	const [drawerOpen, setDrawerOpen] = useState(false);
	const [moreOpen, setMoreOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const moreRef = useRef<HTMLDivElement>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const drawerCloseRef = useRef<HTMLButtonElement>(null);

	const primaryLinks = siteConfig.navigation.primary;
	const moreLinks = siteConfig.navigation.more;
	const mobileLinks = [...primaryLinks, ...moreLinks];

	useEffect(() => {
		hidePreloader();

		const onScroll = () => {
			setScrolled(window.scrollY > SCROLL_THRESHOLD);
		};

		onScroll();

		window.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	useEffect(() => {
		const currentLink = mobileLinks.find(link => {
			if (link.to === "/") return pathname === "/";
			return pathname === link.to || pathname.startsWith(`${link.to}/`);
		});

		document.title = currentLink
			? `${currentLink.label} | ${siteConfig.site.name}`
			: siteConfig.site.name;
	}, [pathname, mobileLinks]);

	useEffect(() => {
		if (!moreOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
				setMoreOpen(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMoreOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [moreOpen]);

	useEffect(() => {
		if (!drawerOpen) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setDrawerOpen(false);
			}
		};

		document.addEventListener("keydown", handleEscape);

		requestAnimationFrame(() => {
			drawerCloseRef.current?.focus();
		});

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleEscape);
			menuButtonRef.current?.focus();
		};
	}, [drawerOpen]);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setDrawerOpen(false);
		setMoreOpen(false);
	}, [pathname]);

	const closeDrawer = () => setDrawerOpen(false);

	const handleDonateClick = () => {
		setDrawerOpen(false);
		setMoreOpen(false);
		openDonationModal();
	};

	const textColor = scrolled
		? "var(--color-text-primary)"
		: "var(--color-text-inverse)";

	const activeColor = scrolled
		? "var(--color-brand-primary)"
		: "var(--color-brand-primary-light)";

	return (
		<>
			<motion.header
				initial={{ y: -40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
				style={{
					background: scrolled
						? "linear-gradient(90.73deg, #FFFFFF 50.75%, #D8EAE0 90.95%)"
						: "transparent",
					boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.06)" : "none",
				}}>
				<div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-12 xl:px-20">
					<Link
						to="/"
						aria-label={`${siteConfig.site.name} home`}
						onClick={closeDrawer}
						className="shrink-0 transition-transform duration-300 hover:-translate-y-0.5">
						<Logo height={52} />
					</Link>

					<nav
						className="hidden items-center gap-5 lg:flex xl:gap-7"
						aria-label="Primary navigation">
						{primaryLinks.map((link, index) => (
							<NavLink
								key={link.to}
								to={link.to}
								className="group relative whitespace-nowrap py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
								style={({ isActive }) => ({
									color: isActive ? activeColor : textColor,
									transitionDelay: `${index * 15}ms`,
								})}>
								{({ isActive }) => (
									<>
										{link.label}
										<span
											className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-300"
											style={{
												background: activeColor,
												transform: isActive ? "scaleX(1)" : "scaleX(0)",
											}}
										/>
									</>
								)}
							</NavLink>
						))}

						{moreLinks.length > 0 && (
							<div ref={moreRef} className="relative">
								<button
									type="button"
									aria-label="More navigation options"
									aria-expanded={moreOpen}
									aria-haspopup="true"
									onClick={() => setMoreOpen(value => !value)}
									className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5"
									style={{
										color: textColor,
										background: moreOpen
											? "var(--color-bg-elevated)"
											: "transparent",
									}}>
									<MoreHorizontal size={21} />
								</button>

								<AnimatePresence>
									{moreOpen && (
										<motion.div
											initial={{ opacity: 0, y: 8, scale: 0.97 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{ opacity: 0, y: 6, scale: 0.98 }}
											transition={{
												duration: 0.18,
												ease: "easeOut",
											}}
											className="absolute right-0 top-full mt-3 w-56 origin-top-right rounded-2xl border p-2 shadow-xl"
											style={{
												background: "var(--color-bg-base)",
												borderColor: "var(--color-border)",
											}}>
											{moreLinks.map(link => (
												<NavLink
													key={link.to}
													to={link.to}
													onClick={() => setMoreOpen(false)}
													className="block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-[var(--color-bg-elevated)]"
													style={({ isActive }) => ({
														color: isActive
															? activeColor
															: "var(--color-text-secondary)",
													})}>
													{link.label}
												</NavLink>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						)}
					</nav>

					<div className="flex shrink-0 items-center gap-2 sm:gap-3">
						<button
							type="button"
							onClick={handleDonateClick}
							className="hidden items-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:ring-offset-2 lg:inline-flex xl:px-7 xl:py-3 xl:text-base"
							style={{
								background: "var(--color-brand-primary)",
							}}>
							<Heart size={16} />
							Donate Now
						</button>

						<button
							ref={menuButtonRef}
							type="button"
							onClick={() => setDrawerOpen(true)}
							aria-label="Open navigation menu"
							aria-expanded={drawerOpen}
							aria-controls="mobile-navigation"
							className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 hover:bg-[var(--color-bg-elevated)] lg:hidden"
							style={{ color: textColor }}>
							<Menu size={23} />
						</button>
					</div>
				</div>

				{scrolled && (
					<div
						className="nav-gradient-border absolute bottom-0 left-0 right-0 h-px"
						aria-hidden="true"
					/>
				)}
			</motion.header>

			<AnimatePresence>
				{drawerOpen && (
					<motion.div
						id="mobile-navigation"
						role="dialog"
						aria-modal="true"
						aria-label="Navigation menu"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-5 overflow-y-auto px-6 py-16 lg:hidden"
						style={{
							background: "var(--color-brand-primary-dark)",
						}}>
						<button
							ref={drawerCloseRef}
							type="button"
							onClick={closeDrawer}
							aria-label="Close navigation menu"
							className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20">
							<X size={22} />
						</button>

						<Link
							to="/"
							onClick={closeDrawer}
							className="absolute left-5 top-5"
							aria-label={`${siteConfig.site.name} home`}>
							<Logo height={40} className="h-9! w-auto" />
						</Link>

						<nav
							className="flex w-full max-w-sm flex-col items-center gap-2"
							aria-label="Mobile navigation">
							{mobileLinks.map((link, index) => (
								<motion.div
									key={link.to}
									initial={{ opacity: 0, y: 14 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.35,
										delay: 0.08 + index * 0.045,
										ease: [0.22, 1, 0.36, 1],
									}}
									className="w-full">
									<NavLink
										to={link.to}
										onClick={closeDrawer}
										className="block w-full rounded-xl px-5 py-3 text-center text-lg font-semibold text-white transition-colors duration-200 hover:bg-white/10"
										style={({ isActive }) => ({
											background: isActive
												? "rgba(255,255,255,0.14)"
												: "transparent",
										})}>
										{link.label}
									</NavLink>
								</motion.div>
							))}
						</nav>

						<motion.button
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.35,
								delay: 0.08 + mobileLinks.length * 0.045,
							}}
							type="button"
							onClick={handleDonateClick}
							className="mt-3 flex w-full max-w-sm items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
							style={{
								background: "var(--color-brand-primary)",
							}}>
							<Heart size={18} />
							Donate Now
						</motion.button>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default PublicNavBar;
