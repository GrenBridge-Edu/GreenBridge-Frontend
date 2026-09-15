import { useEffect, useState, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "../logo";
import { Link, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Search } from "lucide-react";
import DonationModal from "../modals/DonationModal";

const hidePreloader = () => {
	const preloader = document.getElementById("preloader");
	if (preloader) {
		preloader.classList.add("hidden");
		// Optional: remove from DOM after transition
		setTimeout(() => {
			preloader.remove();
			document.body.style.overflow = "auto";
		}, 2000);
	}
};

export const links = [
	{
		name: "Home",
		path: "/",
	},
	{
		name: "About Us",
		path: "/about-us",
	},
	{
		name: "Programs",
		path: "/programs",
	},
	{
		name: "Resources",
		path: "/resources",
	},
	{
		name: "Get Involved",
		path: "/get-involved",
	},
	{
		name: "Contact",
		path: "/contact",
	},
];

export default function HeaderComponent() {
	const [isScrolled, setIsScrolled] = useState(false),
		[isMobileMenuOpen, setIsMobileMenuOpen] = useState(false),
		[isDonation, setIsDonation] = useState(false),
		{ pathname } = useLocation();

	// console.log({ pathname });

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		hidePreloader();

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		let findLink = links.find(link => link.path === pathname);
		if (findLink)
			document.title = `${findLink.name} | GreenBridge Sustainablity`;
		else document.title = "GreenBridge Sustainablity";
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<motion.header
			initial={{ y: -60, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			style={{
				background: `linear-gradient(90.73deg, #FFFFFF 50.75%, #D8EAE0 90.95%)`,
			}}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className={`sticky top-0 w-full z-50 bg-white transition-shadow duration-300 ${
				isScrolled ? "shadow-md" : ""
			}`}>
			<div className="relative flex items-center justify-between px-6 md:px-20 py-4">
				<Logo
					onClick={() => {
						if (isMobileMenuOpen) setIsMobileMenuOpen(false);
					}}
					height={"h-10 w-28 md:h-15 md:w-65"}
				/>

				{/* Desktop Nav */}
				<div className="hidden md:flex  items-center gap-5">
					<nav className="space-x-6 text-md font-medium">
						{links.map((link, index) => (
							<Link
								key={index}
								to={link.path}
								className={`hover:text-[#2A8C56] transition-colors duration-200 ${
									pathname === link.path
										? "text-[#2A8C56] pb-1 border-b-2 font-semibold"
										: "text-gray-700 hover:text-green-500"
								}`}>
								{link.name}
							</Link>
						))}
					</nav>

					<SearchHeader />
					<button
						onClick={() => setIsDonation(true)}
						className={`w-auto max-w-xs rounded-xl py-3 text-lg font-semibold bg-[#2A8C56] text-white shadow-sm hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 px-8 hover:scale-105 transition cursor-pointer duration-500`}>
						Donate Now
					</button>
				</div>
				<div className="flex items-center gap-2 md:hidden">
					<SearchHeader />

					{/* Hamburger Button */}
					<button
						className="text-2xl"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
						{isMobileMenuOpen ? (
							<FaTimes color="#2A8C56" />
						) : (
							<FaBars color="#2A8C56" />
						)}
					</button>
				</div>

				{/* Mobile Nav Overlay */}
				<div
					className={`absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out z-40 ${
						isMobileMenuOpen
							? "opacity-100 translate-y-0"
							: "opacity-0 -translate-y-4 pointer-events-none"
					}`}>
					<div className="flex flex-col px-6 py-4 space-y-4">
						{links.map((link, index) => (
							<Link
								key={index}
								to={link.path}
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className={`hover:text-[#2A8C56] transition-colors duration-200 font-medium ${
									pathname === link.path
										? "text-[#2A8C56] font-semibold"
										: "text-gray-700 hover:text-green-500"
								}`}>
								{link.name}
							</Link>
						))}
						<button
							onClick={() => {
								setIsDonation(true);
								setIsMobileMenuOpen(!isMobileMenuOpen);
							}}
							className={`w-auto max-w-xs rounded-xl py-3 text-lg font-semibold bg-[#2A8C56] text-white shadow-sm hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 px-8 mx-auto hover:scale-105 transition cursor-pointer`}>
							Donate Now
						</button>
					</div>
				</div>
			</div>
			<DonationModal
				isOpen={isDonation}
				onClose={() => setIsDonation(false)}
				title="How Would You Like To Donate"
			/>
		</motion.header>
	);
}

const SearchHeader = () => {
	const [isSearch, setIsSearch] = useState(false);
	const [search, setSearch] = useState("");

	// Use ref instead of querying document
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		const input = inputRef.current;
		if (!input) return;

		const handleSearchClear = () => {
			// Runs when user clicks the clear (X) icon inside search input
			setIsSearch(false);
			setSearch("");
		};

		// “search” event fires when user clears the input using built-in clear button
		input.addEventListener("search", handleSearchClear);

		// cleanup to avoid multiple listeners
		return () => {
			input.removeEventListener("search", handleSearchClear);
		};
	}, [isSearch]);

	return (
		<>
			{isSearch ? (
				<div className="relative transition-all">
					<input
						type="search"
						ref={inputRef}
						className="pr-10 border border-[#EFF3FA] bg-gray-50 max-w-xs w-full px-4 py-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
						placeholder="Search..."
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>

					<div className="absolute right-1 top-1/2 -translate-y-1/2">
						<span className="bg-[#2A8C56] rounded-full h-8 w-8 flex justify-center items-center p-3">
							<IconButton
								onClick={() => {
									// Hide only if input is empty
									if (!search) setIsSearch(false);
								}}>
								<Search color="#fff" />
							</IconButton>
						</span>
					</div>
				</div>
			) : (
				<span className="bg-white rounded-full transition-all">
					<IconButton onClick={() => setIsSearch(true)}>
						<Search />
					</IconButton>
				</span>
			)}
		</>
	);
};