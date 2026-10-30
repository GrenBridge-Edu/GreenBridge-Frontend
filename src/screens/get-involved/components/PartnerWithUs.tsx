import { useState } from "react";
import { useForm } from "react-hook-form";

import { usePartnerWithUsMutation } from "../../../data/hooks/useContactSupport";

import { asText } from "../../home/data/homeContent";
import { useGetInvolvedSection } from "../data/getInvolvedContent";
import Reveal from "../../../components/shared/Reveal";

interface PartnerWithUsFormValues {
	nameOfOrganisation: string;
	email: string;
	telephone: string;
	organizationType: string;
	areaOfPartnership: string;
	message: string;
}

const PARTNER_DEFAULTS = {
	title: "Partner with us",
	description:
		"We believe lasting change happens through collaboration. Partner with Green Bridge on sustainability programs, community projects, or educational initiatives — together, we can reach farther.",
	formTitle: "Partnership Request Form",
	imageUrl: "",
};

const ORGANISATION_TYPES = [
	"Non-profit organization",
	"Government agency",
	"Private company",
	"Educational institution",
	"Community organization",
	"Other",
];

const PARTNERSHIP_AREAS = [
	"Education",
	"Sustainability and environment",
	"Community development",
	"Technology and innovation",
	"Funding and sponsorship",
	"Other",
];

const PartnerWithUs = () => {
	const [successMessage, setSuccessMessage] = useState("");

	const { fields } = useGetInvolvedSection("partner", PARTNER_DEFAULTS);
	const mutation = usePartnerWithUsMutation();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<PartnerWithUsFormValues>({
		defaultValues: {
			nameOfOrganisation: "",
			email: "",
			telephone: "",
			organizationType: "",
			areaOfPartnership: "",
			message: "",
		},
	});

	const onSubmit = async (values: PartnerWithUsFormValues) => {
		setSuccessMessage("");

		try {
			const response = await mutation.mutateAsync({
				nameOfOrganisation: values.nameOfOrganisation.trim(),
				email: values.email.trim(),
				telephone: values.telephone.trim(),
				organizationType: values.organizationType,
				areaOfPartnership: values.areaOfPartnership,
				others: values.message.trim(),
			});

			setSuccessMessage(
				response.message ||
					"Your partnership request has been submitted successfully.",
			);

			reset();
		} catch {
			// The shared API client handles request error notifications.
		}
	};

	const inputClassName =
		"w-full rounded-lg bg-white px-3 py-4 text-[#3A3A3A] outline-none transition duration-200 placeholder:text-[#777] focus:ring-2 focus:ring-[#2A8C56]/30";

	const labelClassName = "mb-2 block text-sm font-medium text-[#3A3A3A]";

	const errorClassName = "mt-1 text-xs text-red-600";

	return (
		<section className="relative px-10 py-10 md:px-40 md:py-24">
			{/* Section heading */}
			<div className="grid items-end gap-8">
				<div className="min-h-16 w-full md:min-h-24 md:max-w-xl">
					<div className="flex flex-col">
						<Reveal>
							<h1 className="py-1 text-[32px] font-bold capitalize tracking-tight text-[#1A1A1A] md:text-4xl">
								{asText(fields.title, PARTNER_DEFAULTS.title)}
							</h1>
						</Reveal>

						<Reveal delay={100}>
							<p className="text-[16px] leading-relaxed text-[#3A3A3A]">
								{asText(fields.description, PARTNER_DEFAULTS.description)}
							</p>
						</Reveal>
					</div>
				</div>
			</div>

			{/* Image and partnership form */}
			<Reveal delay={120} distance={28} className="pt-10">
				<div className="group grid overflow-hidden rounded-4xl shadow-sm md:grid-cols-4">
					<div className="h-full min-h-64 overflow-hidden md:min-h-80">
						<img
							src={asText(fields.imageUrl, "/images/getInvolvedForm1.png")}
							alt="Partner with Green Bridge"
							className="h-full min-h-64 w-full rounded-t-4xl object-cover transition-transform duration-700 group-hover:scale-[1.025] md:min-h-80 md:rounded-l-4xl md:rounded-t-none"
							loading="lazy"
						/>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="rounded-b-4xl border-2 border-[#D2D2D2] bg-[#D4E8DD] p-8 md:col-span-3 md:rounded-b-none md:rounded-br-4xl md:rounded-r-4xl md:p-12">
						<h2 className="py-1 text-[32px] font-bold text-[#1A1A1A]">
							{asText(fields.formTitle, PARTNER_DEFAULTS.formTitle)}
						</h2>

						{successMessage && (
							<div
								role="status"
								className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
								{successMessage}
							</div>
						)}

						<div className="mt-4 grid gap-4 md:grid-cols-2">
							{/* Left column */}
							<div className="space-y-4">
								<div>
									<label
										className={labelClassName}
										htmlFor="partner-organisation">
										Organization/Individual Name
									</label>
									<input
										id="partner-organisation"
										autoComplete="organization"
										placeholder="Your organization name"
										className={inputClassName}
										{...register("nameOfOrganisation", {
											required: "This field is required",
										})}
									/>
									{errors.nameOfOrganisation && (
										<p className={errorClassName}>
											{errors.nameOfOrganisation.message}
										</p>
									)}
								</div>

								<div>
									<label className={labelClassName} htmlFor="partner-email">
										Email Address
									</label>
									<input
										id="partner-email"
										type="email"
										autoComplete="email"
										placeholder="Your email"
										className={inputClassName}
										{...register("email", {
											required: "This field is required",
											pattern: {
												value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
												message: "Invalid email format",
											},
										})}
									/>
									{errors.email && (
										<p className={errorClassName}>{errors.email.message}</p>
									)}
								</div>

								<div>
									<label className={labelClassName} htmlFor="partner-telephone">
										Phone Number
									</label>
									<input
										id="partner-telephone"
										type="tel"
										autoComplete="tel"
										placeholder="Your Mobile number"
										className={inputClassName}
										{...register("telephone", {
											required: "This field is required",
											validate: value =>
												/^(?:\+?234|0)[0-9]{10}$/.test(
													value.replace(/[\s()-]/g, ""),
												) || "Enter a valid Nigerian phone number",
										})}
									/>
									{errors.telephone && (
										<p className={errorClassName}>{errors.telephone.message}</p>
									)}
								</div>

								<div>
									<label
										className={labelClassName}
										htmlFor="partner-organisation-type">
										Organization Type
									</label>
									<select
										id="partner-organisation-type"
										className={inputClassName}
										{...register("organizationType", {
											required: "This field is required",
										})}>
										<option value="">Select your organization type</option>
										{ORGANISATION_TYPES.map(type => (
											<option key={type} value={type}>
												{type}
											</option>
										))}
									</select>
									{errors.organizationType && (
										<p className={errorClassName}>
											{errors.organizationType.message}
										</p>
									)}
								</div>
							</div>

							{/* Right column */}
							<div className="space-y-4">
								<div>
									<label className={labelClassName} htmlFor="partner-area">
										Area of Partnership
									</label>
									<select
										id="partner-area"
										className={inputClassName}
										{...register("areaOfPartnership", {
											required: "This field is required",
										})}>
										<option value="">Select an area of partnership</option>
										{PARTNERSHIP_AREAS.map(area => (
											<option key={area} value={area}>
												{area}
											</option>
										))}
									</select>
									{errors.areaOfPartnership && (
										<p className={errorClassName}>
											{errors.areaOfPartnership.message}
										</p>
									)}
								</div>

								<div>
									<label className={labelClassName} htmlFor="partner-message">
										Message
									</label>
									<textarea
										id="partner-message"
										rows={7}
										placeholder="Message/Proposal..."
										className={`${inputClassName} min-h-40 resize-y md:min-h-60`}
										{...register("message", {
											required: "This field is required",
										})}
									/>
									{errors.message && (
										<p className={errorClassName}>{errors.message.message}</p>
									)}
								</div>
							</div>
						</div>

						<div className="pt-6">
							<button
								type="submit"
								disabled={mutation.isPending}
								className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#2A8C56] px-10 py-3 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#236F46] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
								{mutation.isPending
									? "Submitting..."
									: "Submit Partnership Request"}
							</button>
						</div>
					</form>
				</div>
			</Reveal>
		</section>
	);
};

export default PartnerWithUs;
