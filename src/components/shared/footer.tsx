import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

import Logo from "./Logo";
import Reveal from "./Reveal";
import { Button, Input, Textarea } from "../ui";
import {
	Facebook,
	Instagram,
	LinkedInIcon,
	Twitter,
	Youtube,
} from "../ui/Icons";
import { siteConfig } from "../../data/Config";
import {
	getContentBlockFields,
	mergeSectionFields,
	useContentBlocksQuery,
} from "../../data/hooks/useContentBlocks";
import contactSupportApi from "../../data/endpoints/contactSupport.api";
import { useDonation } from "../../hooks/useDonation";

interface FooterLinkItem {
	label: string;
	url: string;
}

interface FooterFields extends Record<string, unknown> {
	description: string;
	address: string;
	phone: string;
	email: string;
	workingHours: string;
	facebookUrl: string;
	instagramUrl: string;
	linkedinUrl: string;
	twitterUrl: string;
	youtubeUrl: string;
	footerLinks: FooterLinkItem[];
	resources: FooterLinkItem[];
	contactTitle: string;
	linksTitle: string;
	resourcesTitle: string;
	socialTitle: string;
	copyright: string;
	termsUrl: string;
	privacyUrl: string;
	contactHeading: string;
	contactDescription: string;
	contactButton: string;
}

interface ContactFormValues {
	fullname: string;
	email: string;
	message: string;
}

const DEFAULT_FOOTER: FooterFields = {
	description:
		"Green Bridge is a non-profit organization promoting sustainable development through quality education, innovation, and community empowerment.",
	address: "23 Agric, Ikorodu, Lagos.",
	phone: "+234 000 0000 00",
	email: "info@greenbridge.com",
	workingHours: "",
	facebookUrl: "",
	instagramUrl: "",
	linkedinUrl: "",
	twitterUrl: "",
	youtubeUrl: "",
	footerLinks:
		siteConfig.navigation.primary?.map(item => ({
			label: item?.label ?? "",
			url: item?.to ?? "",
		})) ?? [],
	resources: [
		{ label: "Terms of Service", url: "/terms" },
		{ label: "Privacy Policy", url: "/privacy-policy" },
		{ label: "Donation Policy", url: "/donation-policy" },
		{ label: "Volunteer Policy", url: "/volunteer-policy" },
	],
	contactTitle: "Contact",
	linksTitle: "Quick Links",
	resourcesTitle: "Resources",
	socialTitle: "Connect With Us",
	copyright: "All rights reserved.",
	termsUrl: "/terms",
	privacyUrl: "/privacy-policy",
	contactHeading: "Reach Out — Let’s Build a Greener Future Together.",
	contactDescription:
		"Have questions, feedback, or partnership ideas? Get in touch with the Green Bridge team — we’re always ready to connect.",
	contactButton: "Send Message",
};

const isFooterLink = (value: unknown): value is FooterLinkItem =>
	typeof value === "object" &&
	value !== null &&
	"label" in value &&
	"url" in value &&
	typeof value.label === "string" &&
	typeof value.url === "string";

const normalizeLinks = (
	value: unknown,
	fallback: FooterLinkItem[],
): FooterLinkItem[] =>
	Array.isArray(value) ? value.filter(isFooterLink) : fallback;

const ContactRow = ({
	icon,
	children,
	align = "center",
}: {
	icon: ReactNode;
	children: ReactNode;
	align?: "center" | "start";
}) => (
	<div
		className={`flex ${
			align === "start" ? "items-start" : "items-center"
		} gap-3 text-sm`}>
		<span
			className="shrink-0 text-[#91C5A4]"
			style={{ marginTop: align === "start" ? 2 : 0 }}
			aria-hidden="true">
			{icon}
		</span>

		<span
			className="w-px shrink-0 self-stretch bg-white/20"
			aria-hidden="true"
		/>

		<span className="min-w-0 break-words text-white/75">{children}</span>
	</div>
);

const FooterLink = ({
	label,
	url,
	onClick,
}: {
	label: string;
	url: string;
	onClick?: () => void;
}) => {
	const className =
		"inline-block rounded-sm text-white/65 transition-all duration-200 hover:translate-x-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91C5A4]";

	if (/^https?:\/\//i.test(url)) {
		return (
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className={className}>
				{label}
			</a>
		);
	}

	return (
		<Link to={url} onClick={onClick} className={className}>
			{label}
		</Link>
	);
};

const Footer = ({ isContact = false }: { isContact?: boolean }) => {
	const navigate = useNavigate();
	const { data } = useContentBlocksQuery("global");
	const { openDonationModal } = useDonation();

	const fields = getContentBlockFields(data, "footer");
	const merged = mergeSectionFields<FooterFields>(DEFAULT_FOOTER, fields);

	const footer: FooterFields = {
		...merged,
		footerLinks: normalizeLinks(fields.footerLinks, DEFAULT_FOOTER.footerLinks),
		resources: normalizeLinks(fields.resources, DEFAULT_FOOTER.resources),
	};

	const handleFaqClick = () => {
		const faqElement = document.getElementById("faq");

		if (faqElement) {
			faqElement.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
			return;
		}

		navigate("/faq");
	};

	const socialLinks = [
		{
			label: "Facebook",
			url: footer.facebookUrl,
			icon: <Facebook width={18} height={18} />,
		},
		{
			label: "Instagram",
			url: footer.instagramUrl,
			icon: <Instagram width={18} height={18} />,
		},
		{
			label: "LinkedIn",
			url: footer.linkedinUrl,
			icon: <LinkedInIcon />,
		},
		{
			label: "X",
			url: footer.twitterUrl,
			icon: <Twitter width={18} height={18} />,
		},
		{
			label: "YouTube",
			url: footer.youtubeUrl,
			icon: <Youtube width={18} height={18} />,
		},
	].filter(item => item.url.trim());

	return (
		<footer
			className={`relative bg-[#012D1C] text-white ${!isContact ? "pt-0" : "py-12"}`}>
			{!isContact && (
				<div className="px-6 pt-14 sm:px-10 md:px-16 lg:px-40">
					<div className="mx-auto max-w-6xl">
						<Reveal distance={24}>
							<FooterContactForm
								heading={footer.contactHeading}
								description={footer.contactDescription}
								buttonText={footer.contactButton}
							/>
						</Reveal>
					</div>
				</div>
			)}

			<div className="px-6 pb-8 pt-14 sm:px-10 md:px-16 md:pt-16 lg:px-40">
				<div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:gap-12">
					{/* Organization details */}
					<Reveal distance={20}>
						<div className="space-y-5">
							<Link
								to="/"
								aria-label={`${siteConfig.site.name} home`}
								className="inline-flex">
								<Logo height={48} src="/logo.png" />
							</Link>

							<p className="max-w-sm text-sm leading-7 text-white/65">
								{footer.description}
							</p>

							<div className="space-y-4 pt-2">
								{footer.email && (
									<ContactRow icon={<Mail size={16} />}>
										<a
											href={`mailto:${footer.email}`}
											className="break-all transition-colors hover:text-white">
											{footer.email}
										</a>
									</ContactRow>
								)}

								{footer.phone && (
									<ContactRow icon={<Phone size={16} />}>
										<a
											href={`tel:${footer.phone.replace(/[^\d+]/g, "")}`}
											className="transition-colors hover:text-white">
											{footer.phone}
										</a>
									</ContactRow>
								)}

								{footer.address && (
									<ContactRow icon={<MapPin size={16} />} align="start">
										{footer.address}
									</ContactRow>
								)}

								{footer.workingHours && (
									<ContactRow icon={<Clock size={16} />} align="start">
										{footer.workingHours}
									</ContactRow>
								)}
							</div>
						</div>
					</Reveal>

					{/* Quick links */}
					<Reveal delay={100} distance={20}>
						<div className="space-y-5">
							<h3 className="text-sm font-bold tracking-wide text-white">
								{footer.linksTitle}
							</h3>

							<ul className="space-y-4 text-sm">
								{footer.footerLinks.map((item, index) => (
									<li key={`${item.url}-${index}`}>
										<FooterLink
											label={item.label}
											url={item.url}
											onClick={item.url === "#" ? handleFaqClick : undefined}
										/>
									</li>
								))}
							</ul>
						</div>
					</Reveal>

					{/* Resources */}
					<Reveal delay={180} distance={20}>
						<div className="space-y-5">
							<h3 className="text-sm font-bold tracking-wide text-white">
								{footer.resourcesTitle}
							</h3>

							<ul className="space-y-4 text-sm">
								{footer.resources.map((item, index) => (
									<li key={`${item.url}-${index}`}>
										<FooterLink label={item.label} url={item.url} />
									</li>
								))}

								<li>
									<FooterLink label="FAQ" url="/faq" onClick={handleFaqClick} />
								</li>
							</ul>
						</div>
					</Reveal>

					{/* Social links and donation */}
					<Reveal delay={260} distance={20}>
						<div className="space-y-5">
							<h3 className="text-sm font-bold tracking-wide text-white">
								{footer.socialTitle}
							</h3>

							{socialLinks.length > 0 ? (
								<div className="flex flex-wrap gap-3">
									{socialLinks.map(social => (
										<a
											key={social.label}
											href={social.url}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={social.label}
											title={social.label}
											className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#91C5A4] hover:bg-[#2A8C56] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91C5A4]">
											{social.icon}
										</a>
									))}
								</div>
							) : (
								<p className="text-sm leading-6 text-white/55">
									Follow Green Bridge for updates on our work and impact.
								</p>
							)}

							<p className="text-sm leading-6 text-white/55">
								Help us create lasting change in communities.
							</p>

							<button
								type="button"
								onClick={() => openDonationModal()}
								className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#2A8C56] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#247849] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91C5A4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#012D1C]">
								Make a donation
							</button>
						</div>
					</Reveal>
				</div>

				{/* Copyright */}
				<div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
					<p className="text-xs text-white/45">
						© {new Date().getFullYear()} {siteConfig.site.name}.{" "}
						{footer.copyright}
					</p>

					<div className="flex flex-wrap items-center justify-center gap-5 text-xs">
						<FooterLink label="Terms of Service" url={footer.termsUrl} />
						<FooterLink label="Privacy Policy" url={footer.privacyUrl} />
					</div>
				</div>
			</div>
		</footer>
	);
};

interface FooterContactFormProps {
	heading: string;
	description: string;
	buttonText: string;
}

const FooterContactForm = ({
	heading,
	description,
	buttonText,
}: FooterContactFormProps) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ContactFormValues>({
		defaultValues: {
			fullname: "",
			email: "",
			message: "",
		},
		mode: "onSubmit",
	});

	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const onSubmit = async (values: ContactFormValues) => {
		setSuccessMessage("");
		setErrorMessage("");

		try {
			const response = await contactSupportApi.submit({
				fullname: values.fullname.trim(),
				email: values.email.trim(),
				message: values.message.trim(),
			});

			setSuccessMessage(
				response.message || "Your message has been sent successfully.",
			);
			reset();
		} catch {
			setErrorMessage(
				"We couldn't send your message right now. Please try again.",
			);
		}
	};

	return (
		<div className="relative overflow-hidden border-y border-white/10 py-10 md:py-12">
			<div
				className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#2A8C56]/15 blur-3xl"
				aria-hidden="true"
			/>

			<div className="relative grid items-start gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
				<div className="max-w-md">
					<span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#91C5A4]">
						<span className="h-1.5 w-1.5 rounded-full bg-[#91C5A4]" />
						Get in touch
					</span>

					<h2 className="max-w-lg text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
						{heading}
					</h2>

					<p className="mt-4 text-sm leading-7 text-white/65">{description}</p>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="grid gap-x-5 gap-y-4 sm:grid-cols-2"
					noValidate>
					<Controller
						name="fullname"
						control={control}
						rules={{
							required: "Please enter your full name.",
							validate: value =>
								Boolean(value.trim()) || "Please enter your full name.",
						}}
						render={({ field }) => (
							<Input
								{...field}
								label="Full Name"
								name="fullname"
								placeholder="Enter your full name"
								autoComplete="name"
								required
								error={errors.fullname?.message}
								className="!border-white/15 !bg-white !text-[#1f2937]"
							/>
						)}
					/>

					<Controller
						name="email"
						control={control}
						rules={{
							required: "Please enter your email address.",
							validate: value =>
								/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ||
								"Please enter a valid email address.",
						}}
						render={({ field }) => (
							<Input
								{...field}
								label="Email Address"
								name="email"
								type="email"
								placeholder="Enter your email address"
								autoComplete="email"
								required
								error={errors.email?.message}
								className="!border-white/15 !bg-white !text-[#1f2937]"
							/>
						)}
					/>

					<div className="sm:col-span-2">
						<Controller
							name="message"
							control={control}
							rules={{
								required: "Please enter a message.",
								validate: value =>
									Boolean(value.trim()) || "Please enter a message.",
							}}
							render={({ field }) => (
								<Textarea
									{...field}
									label="Message"
									name="message"
									placeholder="How can we help?"
									rows={3}
									required
									error={errors.message?.message}
									className="!border-white/15 !bg-white !text-[#1f2937]"
								/>
							)}
						/>
					</div>

					<div className="flex flex-col items-start gap-3 sm:col-span-2">
						{errorMessage && (
							<p className="text-sm text-red-300" role="alert">
								{errorMessage}
							</p>
						)}

						{successMessage && (
							<p className="text-sm text-green-300" role="status">
								{successMessage}
							</p>
						)}

						<Button
							type="submit"
							loading={isSubmitting}
							disabled={isSubmitting}
							className="min-h-11 rounded-xl bg-[#2A8C56] px-8 text-white transition-colors hover:!bg-[#247849]">
							{isSubmitting ? "Sending..." : buttonText}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Footer;
