import { useState } from "react";
import { useForm } from "react-hook-form";

import { asText } from "../../home/data/homeContent";
import { useGetInvolvedSection } from "../data/getInvolvedContent";
import { useJoinOurTeamMutation } from "../../../data/hooks/useContactSupport";
import Reveal from "../../../components/shared/Reveal";
import SafeHtml from "../../../components/SafeHtml";

interface JoinOurTeamFormValues {
	firstName: string;
	lastName: string;
	email: string;
	telephone: string;
	positionOfInterest: string;
	coverLetter: string;
}

const POSITIONS = [
	"Education & Training",
	"Sustainability and Environment",
	"Media & Communications",
	"Project & Field Operations",
	"Technology & Innovation",
];

const TEAM_DEFAULTS = {
	title: "Join our team",
	description:
		"Use your skills, passion, and creativity to make a difference. Whether in outreach, media, logistics, or teaching, your contribution helps us reach more lives.",
	formTitle: "Submit your application",
	imageUrl: "",
};

const JoinOurTeam = () => {
	const [successMessage, setSuccessMessage] = useState("");

	const { fields } = useGetInvolvedSection("team", TEAM_DEFAULTS);
	const mutation = useJoinOurTeamMutation();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<JoinOurTeamFormValues>({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			telephone: "",
			positionOfInterest: "",
			coverLetter: "",
		},
	});

	const onSubmit = async (values: JoinOurTeamFormValues) => {
		setSuccessMessage("");

		try {
			const response = await mutation.mutateAsync({
				firstName: values.firstName.trim(),
				lastName: values.lastName.trim(),
				email: values.email.trim(),
				telephone: values.telephone.trim(),
				positionOfInterest: values.positionOfInterest,
				coverLetter: values.coverLetter.trim(),
			});

			setSuccessMessage(
				response.message || "Your application has been submitted successfully.",
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
			{/* Heading: positioned above the form on desktop, inline on mobile */}
			<div className="grid items-end gap-8 md:grid-cols-2">
				<div className="md:absolute md:right-5 md:-top-20 md:z-[35]">
					<Reveal distance={20}>
						<div className="min-h-16 w-full md:min-h-24 md:max-w-xl">
							<div className="flex flex-col">
								<h1 className="py-1 text-[32px] font-bold capitalize tracking-tight text-[#1A1A1A] md:text-4xl">
									{asText(fields.title, TEAM_DEFAULTS.title)}
								</h1>

								<p className="text-[16px] leading-relaxed text-[#3A3A3A]">
									<SafeHtml
										html=
										{asText(fields.description, TEAM_DEFAULTS.description)}
									/>
								</p>
							</div>
						</div>
					</Reveal>
				</div>
			</div>

			{/* Image and application form */}
			<Reveal delay={120} distance={28} className="pt-10">
				<div className="group grid overflow-hidden rounded-4xl shadow-sm md:grid-cols-4">
					<div className="h-full min-h-64 overflow-hidden md:min-h-80">
						<img
							src={asText(fields.imageUrl, "/images/getInvolvedForm1.png")}
							alt="Join our team"
							className="h-full min-h-64 w-full rounded-t-4xl object-cover transition-transform duration-700 group-hover:scale-[1.025] md:min-h-80 md:rounded-l-4xl md:rounded-t-none"
							loading="lazy"
						/>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="rounded-b-4xl border-2 border-[#D2D2D2] bg-[#D4E8DD] p-8 md:col-span-3 md:rounded-b-none md:rounded-br-4xl md:rounded-r-4xl md:p-12">
						<h2 className="py-1 text-[32px] font-bold text-[#1A1A1A]">
							{asText(fields.formTitle, TEAM_DEFAULTS.formTitle)}
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
									<label className={labelClassName} htmlFor="team-first-name">
										First Name
									</label>
									<input
										id="team-first-name"
										autoComplete="given-name"
										placeholder="Your First name"
										className={inputClassName}
										{...register("firstName", {
											required: "This field is required",
										})}
									/>
									{errors.firstName && (
										<p className={errorClassName}>{errors.firstName.message}</p>
									)}
								</div>

								<div>
									<label className={labelClassName} htmlFor="team-last-name">
										Last Name
									</label>
									<input
										id="team-last-name"
										autoComplete="family-name"
										placeholder="Your Last name"
										className={inputClassName}
										{...register("lastName", {
											required: "This field is required",
										})}
									/>
									{errors.lastName && (
										<p className={errorClassName}>{errors.lastName.message}</p>
									)}
								</div>

								<div>
									<label className={labelClassName} htmlFor="team-telephone">
										Phone Number
									</label>
									<input
										id="team-telephone"
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
									<label className={labelClassName} htmlFor="team-email">
										Email Address
									</label>
									<input
										id="team-email"
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
							</div>

							{/* Right column */}
							<div className="space-y-4">
								<div>
									<label className={labelClassName} htmlFor="team-position">
										Position Of Interest
									</label>
									<select
										id="team-position"
										className={inputClassName}
										{...register("positionOfInterest", {
											required: "This field is required",
										})}>
										<option value="">Select Position of interest</option>
										{POSITIONS.map(position => (
											<option key={position} value={position}>
												{position}
											</option>
										))}
									</select>
									{errors.positionOfInterest && (
										<p className={errorClassName}>
											{errors.positionOfInterest.message}
										</p>
									)}
								</div>

								<div>
									<label className={labelClassName} htmlFor="team-cover-letter">
										Cover Letter
									</label>
									<textarea
										id="team-cover-letter"
										rows={7}
										placeholder="Why would you like to join us..."
										className={`${inputClassName} min-h-40 resize-y md:min-h-60`}
										{...register("coverLetter", {
											required: "This field is required",
										})}
									/>
									{errors.coverLetter && (
										<p className={errorClassName}>
											{errors.coverLetter.message}
										</p>
									)}
								</div>
							</div>
						</div>

						<div className="mt-6">
							<button
								type="submit"
								disabled={mutation.isPending}
								className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#2A8C56] px-10 py-3 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#236F46] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
								{mutation.isPending ? "Submitting..." : "Send Application"}
							</button>
						</div>
					</form>
				</div>
			</Reveal>
		</section>
	);
};

export default JoinOurTeam;
