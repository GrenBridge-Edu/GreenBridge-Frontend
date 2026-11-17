import { useState } from "react";
import type { JSX } from "react";
import { Controller, useForm } from "react-hook-form";
import { Mail, MapPinHouse, Phone, Link2 } from "lucide-react";

import {
	Facebook,
	Instagram,
	LinkedInIcon,
	Twitter,
} from "../../../components/ui/Icons";
import Reveal from "../../../components/shared/Reveal";
import { Button, Input, Textarea } from "../../../components/ui";
import { useContactSection } from "../data/contactContent";
import { useContactSupportMutation } from "../../../data/hooks/useContactSupport";
import SafeHtml from "../../../components/SafeHtml";

interface ContactFormValues {
	fullname: string;
	email: string;
	address: string;
	message: string;
}

interface ContactDetailsFields {
	title: string;
	description: string;
	email: string;
	phone: string;
	address: string;
}

interface ContactFormFields {
	title: string;
}

interface SocialLink {
	name: string;
	url: string;
}

interface SocialLinksFields {
	items: SocialLink[];
}

const CONTACT_DETAILS_DEFAULTS: ContactDetailsFields = {
	title: "Contact Information",
	description:
		"Reach out to our team directly through any of the channels below. We’re always happy to connect, collaborate, and answer your questions.",
	email: "greenbridgeforschool@gmail.com",
	phone: "+234 903 519 4844",
	address: "23 Agric, Ikorodu, Lagos.",
};

const CONTACT_FORM_DEFAULTS: ContactFormFields = {
	title: "Contact form",
};

const SOCIAL_LINKS_DEFAULTS: SocialLinksFields = {
	items: [
		{ name: "Threads", url: "" },
		{ name: "Facebook", url: "" },
		{ name: "X", url: "" },
		{ name: "Instagram", url: "" },
		{ name: "LinkedIn", url: "" },
	],
};

const SOCIAL_ICONS: Record<
	string,
	(props: { width?: number; height?: number }) => JSX.Element
> = {
	"facebook": Facebook,
	"instagram": Instagram,
	"linkedin": LinkedInIcon,
	"x": Twitter,
	"twitter(x)": Twitter,
	"twitter": Twitter,
};

const getText = (value: unknown, fallback = ""): string =>
	typeof value === "string" && value.trim() ? value : fallback;

const getSafeExternalUrl = (value: string): string | null => {
	try {
		const url = new URL(value);

		return url.protocol === "https:" || url.protocol === "http:"
			? url.toString()
			: null;
	} catch {
		return null;
	}
};

const ContactFormInformation = () => {
	const [feedback, setFeedback] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);

	const contactDetails = useContactSection(
		"contact-details",
		CONTACT_DETAILS_DEFAULTS,
	);

	const contactForm = useContactSection("contact-form", CONTACT_FORM_DEFAULTS);

	const socialLinks = useContactSection("social-links", SOCIAL_LINKS_DEFAULTS);

	const { mutateAsync, isPending } = useContactSupportMutation();

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ContactFormValues>({
		defaultValues: {
			fullname: "",
			email: "",
			address: "",
			message: "",
		},
	});

	const details = contactDetails.fields;
	const formFields = contactForm.fields;
	const socials = socialLinks.fields.items;

	const onSubmit = async (values: ContactFormValues) => {
		setFeedback(null);

		try {
			await mutateAsync({
				fullname: values.fullname.trim(),
				email: values.email.trim(),
				message: values.message.trim(),
			});

			setFeedback({
				type: "success",
				message: "Your message has been sent successfully.",
			});

			reset();
		} catch {
			setFeedback({
				type: "error",
				message: "Unable to send your message. Please try again.",
			});
		}
	};

	const contactItems = [
		{
			title: "Email",
			value: getText(details.email),
			icon: Mail,
		},
		{
			title: "Phone",
			value: getText(details.phone),
			icon: Phone,
		},
		{
			title: "Address",
			value: getText(details.address),
			icon: MapPinHouse,
		},
	];

	return (
		<div className="relative px-6 py-12 sm:px-10 md:px-40 md:py-30">
			{/* Contact information */}
			<div className="grid items-end gap-8 md:grid-cols-2">
				<Reveal className="relative z-10" distance={28}>
					<div>
						<p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#2A8C56]">
							Get in touch
						</p>

						<h1 className="py-1 text-3xl font-bold capitalize leading-tight text-[#1A1A1A] md:text-[32px]">
							{getText(details.title, CONTACT_DETAILS_DEFAULTS.title)}
						</h1>

						<p className="mt-3 max-w-xl text-base leading-7 text-[#3A3A3A]">
							<SafeHtml
								html={getText(
									details.description,
									CONTACT_DETAILS_DEFAULTS.description,
								)}
							/>
						</p>

						<div className="mt-7 space-y-5">
							{contactItems.map(contact => {
								const Icon = contact.icon;

								return (
									<div key={contact.title} className="flex items-start gap-4">
										<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#DCE9E1] bg-[#F4F8F5]">
											<Icon color="#2A8C56" size={21} strokeWidth={1.8} />
										</div>

										<div className="min-w-0 pt-0.5">
											<h2 className="text-base font-bold capitalize text-[#1A1A1A]">
												{contact.title}
											</h2>

											<p className="mt-1 break-words text-sm leading-6 text-[#3A3A3A]">
												{contact.value || "Contact information unavailable"}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</Reveal>
			</div>

			{/* Contact form - preserve the original absolute positioning */}
			<Reveal
				className="relative mt-10 md:absolute md:right-5 md:-top-20 md:z-35 md:mt-0"
				delay={120}
				distance={32}>
				<div className="w-full rounded-lg rounded-tl-[55px] bg-[#E1EFE7] p-5 shadow-[0_20px_60px_rgba(16,61,38,0.10)] sm:p-7 md:min-h-72 md:min-w-xl md:rounded-tl-[80px] md:p-10">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col"
						noValidate>
						<div className="mb-5">
							<p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2A8C56]">
								Send us a message
							</p>

							<h1 className="text-2xl font-bold capitalize text-[#1A1A1A] md:text-[32px]">
								{getText(formFields.title, CONTACT_FORM_DEFAULTS.title)}
							</h1>
						</div>

						<div className="space-y-4">
							<div>
								<Controller
									name="fullname"
									control={control}
									rules={{
										required: "This field is required",
										validate: value =>
											value.trim().length > 0 || "This field is required",
									}}
									render={({ field }) => (
										<Input
											{...field}
											value={field.value}
											placeholder="Firstname LastName (Surname)"
											label="Full Name"
											autoComplete="name"
											required
											error={errors.fullname?.message}
											className="w-full rounded-lg bg-white px-2 py-4 text-[#3A3A3A]"
										/>
									)}
								/>

								{errors.fullname && (
									<p className="mt-1 text-xs text-[#dc2626]">
										{errors.fullname.message}
									</p>
								)}
							</div>

							<div>
								<Controller
									name="email"
									control={control}
									rules={{
										required: "This field is required",
										pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
											message: "Invalid email format",
										},
									}}
									render={({ field }) => (
										<Input
											{...field}
											value={field.value}
											placeholder="Your email"
											label="Email Address"
											type="email"
											autoComplete="email"
											required
											error={errors.email?.message}
											className="w-full rounded-lg bg-white px-2 py-4 text-[#3A3A3A]"
										/>
									)}
								/>

								{errors.email && (
									<p className="mt-1 text-xs text-[#dc2626]">
										{errors.email.message}
									</p>
								)}
							</div>

							<div>
								<Controller
									name="address"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											value={field.value}
											placeholder="Your home address"
											label="Address"
											autoComplete="street-address"
											className="w-full rounded-lg bg-white px-2 py-4 text-[#3A3A3A]"
										/>
									)}
								/>
							</div>

							<div>
								<Controller
									name="message"
									control={control}
									rules={{
										required: "This field is required",
										validate: value =>
											value.trim().length > 0 || "This field is required",
									}}
									render={({ field }) => (
										<Textarea
											{...field}
											value={field.value}
											placeholder="Type your message here..."
											label="Message"
											required
											error={errors.message?.message}
											className="w-full rounded-lg bg-white px-2 py-4 text-[#3A3A3A] placeholder:text-[#3A3A3A]"
										/>
									)}
								/>

								{errors.message && (
									<p className="mt-1 text-xs text-[#dc2626]">
										{errors.message.message}
									</p>
								)}
							</div>

							{feedback && (
								<p
									role="status"
									aria-live="polite"
									className={`rounded-lg px-4 py-3 text-sm ${
										feedback.type === "success"
											? "bg-green-50 text-green-700"
											: "bg-red-50 text-red-700"
									}`}>
									{feedback.message}
								</p>
							)}

							<div className="pt-2">
								<Button
									type="submit"
									disabled={isPending}
									loading={isPending}
									className="min-h-12 w-full rounded-xl bg-[#2A8C56] px-10 py-3 text-white transition-colors hover:bg-[#1C7042]">
									{isPending ? "Sending..." : "Send Message"}
								</Button>
							</div>
						</div>
					</form>
				</div>
			</Reveal>

			{/* Social icons - separate from the form wrapper */}
			<Reveal
				className="relative mt-7 flex items-center justify-center gap-3 md:absolute md:-bottom-35 md:right-20 md:z-35 md:mt-0"
				delay={220}
				distance={16}>
				{Array.isArray(socials) &&
					socials.map((social, index) => {
						const name = getText(social?.name);

						if (!name) return null;

						const safeUrl = getSafeExternalUrl(getText(social?.url));
						const Icon = SOCIAL_ICONS[name.trim().toLowerCase()] ?? Link2;

						const className =
							"flex items-center justify-center rounded-full p-2 text-[#3A3A3A] transition-all duration-300 hover:bg-[#E1EFE7] hover:text-[#2A8C56] [&_svg]:h-7 [&_svg]:w-7 md:[&_svg]:h-10 md:[&_svg]:w-10";

						return safeUrl ? (
							<a
								key={`${name}-${index}`}
								href={safeUrl}
								title={name}
								aria-label={name}
								target="_blank"
								rel="noopener noreferrer"
								className={className}>
								<Icon width={40} height={40} />
							</a>
						) : (
							<span
								key={`${name}-${index}`}
								title={name}
								aria-label={name}
								className={className}>
								<Icon width={40} height={40} />
							</span>
						);
					})}
			</Reveal>
		</div>
	);
};

export default ContactFormInformation;
