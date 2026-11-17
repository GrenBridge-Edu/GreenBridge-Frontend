import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import {
	useInitializeGeneralDonationMutation,
	useInitializeProgramDonationMutation,
} from "../../../data/hooks/usePaymentMutations";
import { asText } from "../../home/data/homeContent";
import { useGetInvolvedSection } from "../data/getInvolvedContent";
import Reveal from "../../../components/shared/Reveal";
import { Button, Input } from "../../../components/ui";
import SafeHtml from "../../../components/SafeHtml";

const DONATION_AMOUNTS = [50000, 100000, 250000, 500000, 1000000, 2000000];

const DONATE_DEFAULTS = {
	title: "Donate",
	description:
		"Every donation — no matter the size — helps power our education programs, sustainability projects, and community outreach efforts. Choose a project that speaks to your heart and give today.",
	formTitle: "Make A General Donation",
	calloutTitle:
		"Want to support a specific cause like Send a Child to School or Electrify a Neighborhood?",
	calloutDescription:
		"Visit our Programs Page to choose the cause that speaks to your heart and make an impact where it matters most.",
	buttonText: "Program Page",
	buttonLink: "/programs",
};

export interface ProgramDonation {
	_id?: string;
	id?: string;
	title?: string;
	name?: string;
	description?: string;
	target?: number | string;
	progress?: number | string;
	thumbnailFile?: {
		secure_url?: string;
	};
}

interface DonationFormValues {
	fullname: string;
	email: string;
	amount: string;
	isAnonymous: boolean;
}

interface GeneralDonationProps {
	isSpecific?: ProgramDonation | null;
	onClose?: () => void;
}

export const GeneralDonation = ({
	isSpecific,
	onClose,
}: GeneralDonationProps) => {
	const [selectedAmount, setSelectedAmount] = useState<number | null>(50000);

	const generalMutation = useInitializeGeneralDonationMutation();
	const programMutation = useInitializeProgramDonationMutation();

	const isPending = generalMutation.isPending || programMutation.isPending;

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useForm<DonationFormValues>({
		defaultValues: {
			fullname: "",
			email: "",
			amount: "50000",
			isAnonymous: false,
		},
	});

	const fullnameField = register("fullname", {
		required: "Full name is required",
	});

	const emailField = register("email", {
		required: "Email address is required",
		pattern: {
			value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			message: "Enter a valid email address",
		},
	});

	const onSubmit = async (values: DonationFormValues) => {
		const parsedAmount = Number(values.amount);

		if (!Number.isFinite(parsedAmount) || parsedAmount < 1) {
			return;
		}

		try {
			const payload = {
				fullname: values.fullname.trim(),
				email: values.email.trim(),
				amount: parsedAmount,
				isAnonymous: values.isAnonymous,
				nextScreen: new URL(
					"/confirmation/donation",
					window.location.origin,
				).toString(),
			};

			const response = isSpecific
				? await (async () => {
						const programId = isSpecific._id || isSpecific.id;

						if (!programId) {
							throw new Error("The selected program has no valid ID.");
						}

						return programMutation.mutateAsync({
							...payload,
							program: programId,
						});
					})()
				: await generalMutation.mutateAsync(payload);

			const authorizationUrl = response.data?.authorization_url;

			if (!authorizationUrl) {
				throw new Error(
					"Payment initialization did not return a checkout URL.",
				);
			}

			window.location.assign(authorizationUrl);
		} catch {
			// The shared API client handles request error notifications.
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
			{isSpecific && (
				<div className="rounded-xl border border-green-100 bg-green-50 p-4">
					<p className="text-sm text-green-800">
						Donation for{" "}
						<span className="font-semibold">
							{isSpecific.title || isSpecific.name || "selected program"}
						</span>
					</p>
				</div>
			)}

			<Input
				label="Full name"
				placeholder="Enter your full name"
				autoComplete="name"
				required
				value={watch("fullname")}
				onChange={event => {
					fullnameField.onChange(event);
				}}
				onBlur={fullnameField.onBlur}
				name={fullnameField.name}
				ref={fullnameField.ref}
				error={errors.fullname?.message}
			/>

			<Input
				label="Email address"
				type="email"
				placeholder="you@example.com"
				autoComplete="email"
				required
				value={watch("email")}
				onChange={event => {
					emailField.onChange(event);
				}}
				onBlur={emailField.onBlur}
				name={emailField.name}
				ref={emailField.ref}
				error={errors.email?.message}
			/>

			<div className="space-y-3">
				<label className="block text-sm font-semibold text-[var(--color-text-primary)]">
					Donation amount (NGN)
				</label>

				<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
					{DONATION_AMOUNTS.map(preset => {
						const isSelected = selectedAmount === preset;

						return (
							<Button
								key={preset}
								type="button"
								size="md"
								variant={isSelected ? "primary" : "outline"}
								aria-pressed={isSelected}
								onClick={() => {
									setSelectedAmount(preset);
									setValue("amount", String(preset), {
										shouldDirty: true,
										shouldValidate: true,
									});
								}}
								className="min-h-11">
								₦{preset.toLocaleString("en-NG")}
							</Button>
						);
					})}
				</div>

				<Controller
					name="amount"
					control={control}
					rules={{
						required: "Donation amount is required",
						validate: value => {
							const parsed = Number(value);

							if (!Number.isFinite(parsed) || parsed < 1) {
								return "Enter an amount of at least ₦1";
							}

							if (!/^\d+(\.\d{1,2})?$/.test(value)) {
								return "Enter no more than two decimal places";
							}

							return true;
						},
					}}
					render={({ field, fieldState }) => (
						<Input
							label="Custom amount"
							type="number"
							min="1"
							step="0.01"
							placeholder="Enter a custom amount"
							value={field.value}
							onChange={event => {
								const value = event.target.value;
								field.onChange(value === undefined ? "" : String(value));

								const parsed = Number(value);
								setSelectedAmount(
									DONATION_AMOUNTS.includes(parsed) ? parsed : null,
								);
							}}
							onBlur={field.onBlur}
							name={field.name}
							ref={field.ref}
							error={fieldState.error?.message}
							hint={`Selected amount: ₦${Number(
								field.value || 0,
							).toLocaleString("en-NG", { maximumFractionDigits: 2 })}`}
						/>
					)}
				/>
			</div>

			<label className="group flex cursor-pointer items-start gap-3 text-sm text-[var(--color-text-secondary)]">
				<input
					type="checkbox"
					className="mt-0.5 size-4 cursor-pointer accent-green-800 transition-transform group-hover:scale-105"
					{...register("isAnonymous")}
				/>
				<span>Make my donation anonymous</span>
			</label>

			<div className="flex flex-wrap gap-3 pt-1">
				<Button
					type="submit"
					size="lg"
					loading={isPending}
					disabled={isPending}
					fullWidth={!onClose}
					className="min-h-12 flex-1">
					{isPending ? "Preparing payment..." : "Proceed to payment"}
				</Button>

				{onClose && (
					<Button
						type="button"
						variant="outline"
						size="lg"
						onClick={onClose}
						disabled={isPending}
						className="min-h-12">
						Cancel
					</Button>
				)}
			</div>
		</form>
	);
};

const Donate = () => {
	const { fields } = useGetInvolvedSection("donate", DONATE_DEFAULTS);

	const buttonLink = asText(fields.buttonLink, DONATE_DEFAULTS.buttonLink);

	return (
		<section className="bg-[#D4E8DD] px-10 py-10 md:px-40 md:py-24">
			<div className="grid items-end gap-8">
				<div className="min-h-16 w-full md:min-h-24 md:max-w-xl">
					<div className="flex flex-col">
						<Reveal>
							<h1 className="py-1 text-[32px] font-bold capitalize tracking-tight text-[#1A1A1A] md:text-4xl">
								{asText(fields.title, DONATE_DEFAULTS.title)}
							</h1>
						</Reveal>

						<Reveal delay={100}>
							<p className="text-[16px] leading-relaxed text-[#3A3A3A]">
								<SafeHtml
									html=
									{asText(fields.description, DONATE_DEFAULTS.description)}
								/>
							</p>
						</Reveal>
					</div>
				</div>
			</div>

			<Reveal delay={160} distance={28} className="pt-10">
				<div className="grid overflow-hidden rounded-4xl shadow-sm md:grid-cols-4">
					<div className="rounded-t-4xl border-2 border-[#D2D2D2] bg-white p-8 md:col-span-3 md:rounded-l-4xl md:rounded-t-none md:p-12">
						<h2 className="py-1 text-[32px] font-bold text-[#1A1A1A]">
							{asText(fields.formTitle, DONATE_DEFAULTS.formTitle)}
						</h2>

						<GeneralDonation />
					</div>

					<div className="h-full min-h-64 rounded-b-4xl bg-[#1C5D39] p-4 text-white transition-colors duration-300 hover:bg-[#174D30] md:min-h-80 md:rounded-b-none md:rounded-br-4xl md:rounded-r-4xl md:p-8">
						<h2 className="py-1 text-[30px] font-bold">
							{asText(fields.calloutTitle, DONATE_DEFAULTS.calloutTitle)}
						</h2>

						<p className="text-[14px] leading-relaxed">
							{asText(
								fields.calloutDescription,
								DONATE_DEFAULTS.calloutDescription,
							)}
						</p>

						<div className="pt-6">
							<Link
								to={buttonLink.startsWith("/") ? buttonLink : "/programs"}
								className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-10 py-3 font-bold text-[#2A8C56] transition duration-200 hover:-translate-y-0.5 hover:bg-[#F3F8F5]">
								{asText(fields.buttonText, DONATE_DEFAULTS.buttonText)}
							</Link>
						</div>
					</div>
				</div>
			</Reveal>
		</section>
	);
};

export default Donate;
