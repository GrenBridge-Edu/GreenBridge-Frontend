import { ArrowRight, Heart, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import RightSideModal from "./rightsidemodal";
import { formatCurrency } from "../../screens/home/data/homeContent";
import { Button } from "../ui";
import {
	GeneralDonation,
	type ProgramDonation,
} from "../../screens/get-involved/components/Donate";
import { fallbackPrograms } from "../../screens/programs/components/AllPrograms";

export interface DonationModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	type?: "right" | "center";
	isSpecific?: ProgramDonation | null;
}

const DonationModal = ({
	isOpen,
	onClose,
	title = "How Would You Like To Donate",
	type = "center",
	isSpecific,
}: DonationModalProps) => {
	const navigate = useNavigate();
	const [isGeneralDonation, setIsGeneralDonation] = useState(false);

	const handleGeneralDonation = () => {
		onClose();
		setIsGeneralDonation(true);
	};

	const handleViewPrograms = () => {
		onClose();
		navigate("/programs");
	};

	// A selected program should go straight to its donation form.
	if (isSpecific) {
		return (
			<GeneralDonationModal
				isOpen={isOpen}
				onClose={onClose}
				isSpecific={isSpecific}
				title="Donate to This Program"
				type={type}
			/>
		);
	}

	return (
		<>
			<RightSideModal
				isOpen={isOpen}
				onClose={onClose}
				type={type}
				width="max-w-5xl"
				height="max-h-[500px] md:max-h-[650px]"
				title={title}>
				<div className="mx-auto max-w-2xl px-2 text-center">
					<p className="text-sm leading-7 text-[#3A3A3A]">
						Choose the option that best matches how you want to support our
						mission.
					</p>
				</div>

				<div className="p-3 sm:p-6 md:p-8">
					<div className="grid gap-5 md:grid-cols-2 md:gap-6">
						<div className="group flex flex-col overflow-hidden rounded-2xl bg-[#57887C] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
							<div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-white/15 text-white">
								<Heart size={26} />
							</div>

							<div className="flex flex-1 flex-col text-center">
								<h2 className="text-xl font-bold capitalize leading-snug text-white sm:text-2xl">
									Give to Our General Fund
								</h2>

								<p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/90">
									Help us respond quickly to urgent needs across all communities
									we support.
								</p>

								<div className="my-6 flex flex-1 items-center justify-center rounded-xl bg-[#FAF8B3] p-4">
									<p className="text-sm leading-6 text-[#3A3A3A]">
										Your donation will be used wherever help is needed most.
									</p>
								</div>

								<Button
									type="button"
									size="lg"
									fullWidth
									rightIcon={<ArrowRight size={18} />}
									className="rounded-xl bg-white font-bold text-[#2A8C56] transition duration-300 hover:scale-[0.98] hover:bg-[#F7FAF8]"
									style={{
										background: "#FFFFFF",
										color: "#2A8C56",
										boxShadow: "none",
									}}
									onClick={handleGeneralDonation}>
									Donate Now
								</Button>
							</div>
						</div>

						<div className="group flex flex-col overflow-hidden rounded-2xl bg-[#00AB00] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
							<div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-white/15 text-white">
								<Sprout size={27} />
							</div>

							<div className="flex flex-1 flex-col text-center">
								<h2 className="text-xl font-bold capitalize leading-snug text-white sm:text-2xl">
									Support a Specific Project
								</h2>

								<p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/90">
									Choose any of our ongoing programs and make an impact where it
									matters most.
								</p>

								<div className="my-6 flex flex-1 items-center justify-center rounded-xl bg-[#FAF8B3] p-4">
									<p className="text-sm leading-6 text-[#3A3A3A]">
										Perfect if you want your donation to go toward a particular
										cause.
									</p>
								</div>

								<Button
									type="button"
									size="lg"
									fullWidth
									rightIcon={<ArrowRight size={18} />}
									className="rounded-xl bg-white font-bold text-[#2A8C56] transition duration-300 hover:scale-[0.98] hover:bg-[#F7FAF8]"
									style={{
										background: "#FFFFFF",
										color: "#2A8C56",
										boxShadow: "none",
									}}
									onClick={handleViewPrograms}>
									View Programs
								</Button>
							</div>
						</div>
					</div>
				</div>
			</RightSideModal>

			<GeneralDonationModal
				isOpen={isGeneralDonation}
				onClose={() => setIsGeneralDonation(false)}
			/>
		</>
	);
};

export default DonationModal;

export const GeneralDonationModal = ({
	isOpen,
	onClose,
	title = "Make a General Donation",
	type = "center",
	isSpecific,
}: DonationModalProps) => {
	const projectImage =
		isSpecific?.thumbnailFile?.secure_url ||
		fallbackPrograms?.[0]?.thumbnailFile?.secure_url;

	const projectTitle = isSpecific?.title || fallbackPrograms?.[0]?.title;

	const target = Number(isSpecific?.target || 0);

	const progress = Math.min(
		100,
		Math.max(0, Number(isSpecific?.progress || 0)),
	);

	return (
		<RightSideModal
			isOpen={isOpen}
			onClose={onClose}
			type={type}
			width="max-w-5xl"
			disableExternalClose
			height="max-h-[500px] md:max-h-[650px]"
			title={title}>
			<div className="mx-auto max-w-2xl px-2 text-center">
				<p className="text-sm leading-7 text-[#3A3A3A]">
					{isSpecific
						? "Every contribution helps move this project closer to completion."
						: "Your contribution helps us support communities wherever the need is greatest."}
				</p>
			</div>

			{isSpecific && (
				<div className="relative grid items-stretch gap-6 pt-7 md:grid-cols-2">
					<div className="relative min-h-56 sm:min-h-72 md:min-h-80">
						<div className="absolute inset-0 left-2 top-2 rounded-2xl bg-[#2A8C56] md:left-3 md:top-3" />

						{projectImage ? (
							<img
								src={projectImage}
								alt={projectTitle || "Project"}
								className="absolute inset-0 z-10 h-full w-full rounded-2xl object-cover"
								loading="lazy"
							/>
						) : (
							<div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-[#D4E8DD] p-4 text-center text-sm text-[#3A3A3A]">
								Project image unavailable
							</div>
						)}
					</div>

					<div className="flex flex-col justify-center rounded-2xl bg-[#D4E8DD] p-5 sm:p-6">
						<p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2A8C56]">
							Featured project
						</p>

						<h3 className="text-xl font-bold capitalize leading-snug text-[#1A1A1A] sm:text-2xl">
							{projectTitle}
						</h3>

						{isSpecific.description && (
							<p className="pt-4 text-sm leading-7 text-[#3A3A3A]">
								{isSpecific.description}
							</p>
						)}

						<div className="mt-6 space-y-5">
							<div className="flex flex-wrap items-center justify-between gap-3">
								<span className="text-sm font-semibold text-[#1A1A1A]">
									Fundraising target
								</span>

								<span className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#1C5D39]">
									{formatCurrency(target)}
								</span>
							</div>

							<div>
								<div className="mb-3 flex items-center justify-between gap-3 text-sm">
									<span className="font-medium text-[#3A3A3A]">
										Project progress
									</span>

									<span className="font-bold text-[#1C5D39]">{progress}%</span>
								</div>

								<div
									className="h-2.5 w-full overflow-hidden rounded-full bg-white"
									role="progressbar"
									aria-label="Project fundraising progress"
									aria-valuenow={progress}
									aria-valuemin={0}
									aria-valuemax={100}>
									<div
										className="h-full rounded-full bg-[#1C5D39] transition-[width] duration-700 ease-out"
										style={{ width: `${progress}%` }}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="p-3 sm:p-6 md:p-8">
				<GeneralDonation isSpecific={isSpecific} onClose={onClose} />
			</div>
		</RightSideModal>
	);
};
