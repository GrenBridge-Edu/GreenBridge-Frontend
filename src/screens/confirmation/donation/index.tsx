import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
	CheckCircle2,
	CircleAlert,
	LoaderCircle,
	ShieldCheck,
} from "lucide-react";

import { useFinalizePaymentMutation } from "../../../data/hooks/usePaymentMutations";
import Hero from "../../../components/shared/Hero";

type VerificationStatus = "verifying" | "success" | "failed";

const Topup = () => {
	const [searchParams] = useSearchParams();

	const reference =
		searchParams.get("reference") || searchParams.get("trxref") || "";

	const fullname = searchParams.get("fullname") || "";
	const email = searchParams.get("email") || "";

	const [status, setStatus] = useState<VerificationStatus>("verifying");
	const [retryCount, setRetryCount] = useState(0);

	const finalizeMutation = useFinalizePaymentMutation();

	const inFlightRef = useRef<{
		reference: string;
		promise: ReturnType<typeof finalizeMutation.mutateAsync>;
	} | null>(null);

	useEffect(() => {
		let cancelled = false;

		if (!reference) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setStatus("failed");

			return () => {
				cancelled = true;
			};
		}

		setStatus("verifying");

		let promise =
			inFlightRef.current?.reference === reference
				? inFlightRef.current.promise
				: null;

		if (!promise) {
			promise = finalizeMutation.mutateAsync({ reference });

			inFlightRef.current = {
				reference,
				promise,
			};
		}

		promise
			.then(() => {
				if (!cancelled) {
					setStatus("success");
				}
			})
			.catch(() => {
				if (!cancelled) {
					setStatus("failed");
				}
			});

		return () => {
			cancelled = true;
		};
	}, [reference, retryCount, finalizeMutation.mutateAsync]);

	const handleRetry = () => {
		if (!reference || status === "verifying") return;

		inFlightRef.current = null;
		setStatus("verifying");
		setRetryCount(count => count + 1);
	};

	return (
		<>
			<Hero
				heading={"Payment Confirmation"}
				subtext=""
				backgroundImage={""}
				height="30vh"
				subtextVisibility={{ global: false }}
				animations={{
					background: true,
					content: true,
				}}
				isActive
			/>
			<main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#F7FAF8] px-4 py-16 sm:px-6">
				{/* Background decoration */}
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-[#D4E8DD]/60 blur-3xl"
				/>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -bottom-40 -right-32 size-96 rounded-full bg-[#E1EFE7]/70 blur-3xl"
				/>

				<section
					aria-live="polite"
					aria-atomic="true"
					className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#1C5D39]/10 bg-white shadow-[0_20px_70px_rgba(28,93,57,0.09)]">
					{/* Top accent */}
					<div className="h-1.5 w-full bg-[#1C5D39]" />

					<div className="px-6 py-10 text-center sm:px-10 sm:py-12">
						{/* Brand accent */}
						<div className="mb-9 flex items-center justify-center gap-2">
							<ShieldCheck
								size={17}
								className="text-[#1C5D39]"
								aria-hidden="true"
							/>
							<span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1C5D39]">
								Secure payment verification
							</span>
						</div>

						{status === "verifying" && (
							<div className="animate-in fade-in duration-500">
								<div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#E1EFE7]">
									<LoaderCircle
										className="size-10 animate-spin text-[#1C5D39]"
										aria-hidden="true"
									/>
								</div>

								<p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#2A8C56]">
									Almost there
								</p>

								<h1 className="mt-3 text-2xl font-bold leading-tight text-[#1A1A1A] sm:text-3xl">
									Verifying your donation
								</h1>

								<p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#3A3A3A]">
									Please wait while we confirm your payment. This page will
									update automatically when verification is complete.
								</p>

								<div className="mx-auto mt-8 max-w-xs">
									<div className="h-1.5 overflow-hidden rounded-full bg-[#E1EFE7]">
										<div className="h-full w-1/2 animate-pulse rounded-full bg-[#1C5D39]" />
									</div>
								</div>

								<p className="mt-4 text-xs text-gray-400">
									Please don't close this page yet.
								</p>
							</div>
						)}

						{status === "success" && (
							<div className="animate-in fade-in duration-500">
								<div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#E1EFE7]">
									<CheckCircle2
										className="size-11 text-[#1C5D39]"
										aria-hidden="true"
									/>
								</div>

								<p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#2A8C56]">
									Payment confirmed
								</p>

								<h1 className="mt-3 text-2xl font-bold leading-tight text-[#1A1A1A] sm:text-3xl">
									Thank you for your donation!
								</h1>

								<p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#3A3A3A]">
									Your payment has been verified successfully. Thank you for
									supporting our mission and helping us make a difference.
								</p>

								{(fullname || email) && (
									<div className="mt-8 rounded-xl border border-[#1C5D39]/10 bg-[#F7FAF8] p-5 text-left">
										<p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#1C5D39]">
											Donation details
										</p>

										<div className="space-y-3 text-sm">
											{fullname && (
												<div className="flex flex-wrap justify-between gap-2">
													<span className="font-medium text-[#3A3A3A]">
														Name
													</span>
													<span className="text-right text-gray-600">
														{fullname}
													</span>
												</div>
											)}

											{email && (
												<div className="flex flex-wrap justify-between gap-2">
													<span className="font-medium text-[#3A3A3A]">
														Email
													</span>
													<span className="break-all text-right text-gray-600">
														{email}
													</span>
												</div>
											)}
										</div>
									</div>
								)}

								{reference && (
									<div className="mt-5 rounded-lg bg-gray-50 px-4 py-3 text-left">
										<p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
											Payment reference
										</p>
										<p className="mt-1 break-all text-xs text-gray-600">
											{reference}
										</p>
									</div>
								)}

								<Link
									to="/"
									className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#1C5D39] px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#174D30] hover:shadow-lg hover:shadow-[#1C5D39]/15 sm:w-auto">
									Return home
								</Link>
							</div>
						)}

						{status === "failed" && (
							<div className="animate-in fade-in duration-500">
								<div className="mx-auto flex size-20 items-center justify-center rounded-full bg-red-50">
									<CircleAlert
										className="size-11 text-red-600"
										aria-hidden="true"
									/>
								</div>

								<p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-red-600">
									Verification unsuccessful
								</p>

								<h1 className="mt-3 text-2xl font-bold leading-tight text-[#1A1A1A] sm:text-3xl">
									We couldn't verify your payment
								</h1>

								<p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#3A3A3A]">
									{reference
										? "Payment confirmation was unsuccessful. You can retry verification or contact our support team with your payment reference."
										: "We couldn't find a payment reference in the return URL. Please contact support if you completed a payment."}
								</p>

								{reference && (
									<div className="mt-6 rounded-lg border border-red-100 bg-red-50/60 px-4 py-3 text-left">
										<p className="text-[11px] font-semibold uppercase tracking-wider text-red-500">
											Payment reference
										</p>
										<p className="mt-1 break-all text-xs text-gray-600">
											{reference}
										</p>
									</div>
								)}

								<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
									{reference && (
										<button
											type="button"
											onClick={handleRetry}
											className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1C5D39] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#174D30] hover:shadow-lg hover:shadow-[#1C5D39]/15">
											Retry verification
										</button>
									)}

									<Link
										to="/"
										className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#1C5D39]/20 px-6 py-3 text-sm font-semibold text-[#1C5D39] transition duration-300 hover:bg-[#E1EFE7]">
										Return home
									</Link>
								</div>
							</div>
						)}
					</div>

					<div className="border-t border-gray-100 px-6 py-4 text-center">
						<p className="text-xs text-gray-400">
							Thank you for supporting our mission.
						</p>
					</div>
				</section>
			</main>
		</>
	);
};

export default Topup;
