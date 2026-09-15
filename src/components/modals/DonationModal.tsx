import { ArrowRight } from "lucide-react";
import PrimaryBtn from "../button";
import RightSideModal from "./rightsidemodal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GeneralDonation } from "../../screens/get-involved/components/Donate";
import { programs } from "../../screens/programs/components/AllPrograms";
import { nairaSignNeutral } from "../../data/useFetcher";

interface DonationModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	type?: "right" | "center";
	isSpecific?: boolean | any;
}

const DonationModal = ({
	isOpen,
	onClose,
	title,
	type = "center",
}: DonationModalProps) => {
	const navigate = useNavigate(),
		[isGeneralDonation, setIsGeneralDonation] = useState(false);
	return (
		<>
			<RightSideModal
				isOpen={isOpen}
				onClose={onClose}
				type={type}
				width="max-w-5xl"
				height=" max-h-[500px] md:max-h-[650px]"
				title={title}>
				<>
					<p className="text-[#3A3A3A] text-[14px] text-center max-w-lg mx-auto">
						Choose the option that best matches how you want to support our
						mission
					</p>
					<div className="p-10">
						<div className="grid md:grid-cols-2 gap-6">
							<div className="rounded-xl p-4 bg-[#57887C]">
								<div className="flex flex-col text-center">
									<h1 className="text-[#ffffff] font-bold capitalize text-[18px] md:text-[26px] py-1">
										Give to Our General Fund
									</h1>
									<p className="text-[#ffffff] text-[12px] max-w-[80%] mx-auto">
										Help us respond quickly to urgent needs across all
										communities we support.
									</p>
								</div>
								<div className="bg-[#FAF8B3] p-2 rounded-xl my-4">
									<p className="text-[#3A3A3A] text-[12px] text-center">
										Your donation will be used wherever help is needed most.
									</p>
								</div>
								<PrimaryBtn
									text="Donate Now"
									className=" bg-white font-bold text-[#2A8C56] py-3 rounded-xl hover:scale-95 transition duration-500 my-4"
									icon={ArrowRight}
									iconPosition="right"
									onClick={() => {
										setIsGeneralDonation(true);
										onClose();
									}}
								/>
							</div>
							<div className="rounded-xl p-4 bg-[#00AB00]">
								<div className="flex flex-col text-center">
									<h1 className="text-[#ffffff] font-bold capitalize text-[18px] md:text-[26px] py-1">
										Support a Specific Project
									</h1>
									<p className="text-[#ffffff] text-[12px] max-w-[80%] mx-auto">
										Choose any of our ongoing programs and make an impact where
										it matters most.
									</p>
								</div>
								<div className="bg-[#FAF8B3] p-2 rounded-xl my-4">
									<p className="text-[#3A3A3A] text-[12px] text-center">
										Perfect if you want your donation to go toward a particular
										cause.
									</p>
								</div>
								<PrimaryBtn
									text="View Programs"
									className=" bg-white font-bold text-[#2A8C56] py-3 rounded-xl hover:scale-95 transition duration-500 my-4"
									icon={ArrowRight}
									iconPosition="right"
									onClick={() => {
										navigate("/programs");
										onClose();
									}}
								/>
							</div>
						</div>
					</div>
				</>
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
	console.log({ isSpecific });

	return (
		<>
			<RightSideModal
				isOpen={isOpen}
				onClose={onClose}
				type={type}
				width="max-w-5xl"
				disableExternalClose
				height=" max-h-[500px] md:max-h-[650px]"
				title={title}>
				<>
					<p className="text-[#3A3A3A] text-[14px] text-center max-w-lg mx-auto">
						{isSpecific
							? `Every contribution helps move this project closer to completion.`
							: `Your contribution helps us support communities wherever the need is
						greatest.`}
					</p>
					{isSpecific && (
						<>
							<div className="grid md:grid-cols-2 items-center pt-6 relative">
								{/* Image Column - Full height with background layer behind */}
								<div className="relative rounded-2xl h-full min-h-52">
									{/* Green background layer (behind the image) */}
									<div className="absolute inset-0 bg-[#2A8C56] z-0 w-full h-[110%] rounded-xl left-3 -top-2 md:-top-3" />

									{/* Actual image - covers the entire container */}
									<img
										src={
											isSpecific?.thumbnailFile?.secure_url ||
											programs?.[0]?.thumbnailFile?.secure_url
										}
										alt={isSpecific?.title || programs?.[0]?.title}
										className="absolute inset-0 w-full h-full object-fit z-10 rounded-2xl"
									/>
								</div>
								<div className="bg-[#D4E8DD]">
									<div className="p-3">
										<h3 className="text-[#1a1a1a] font-bold capitalize text-[20px] py-1">
											{isSpecific?.title}
										</h3>
										<p className="text-[#3A3A3A] text-[14px] pt-3 leading-6">
											{isSpecific?.description}
										</p>

										<>
											<div className="flex items-center gap-3 pb-3">
												{<span>Target:</span>}
												<div className="bg-[#D8EAE0] p-2 rounded-lg w-auto">
													<span>
														{nairaSignNeutral}
														{(isSpecific?.target || 0).toLocaleString()}
													</span>
												</div>
												<div className="block w-full">
													<div className="flex items-center gap-2 w-full">
														<div className="relative h-2 w-full rounded-full bg-[#E0D5E9]">
															<div
																className="h-full rounded-full bg-[#1C5D39]"
																style={{
																	width: `${isSpecific?.progress || 0}%`,
																}}></div>
														</div>
														<span>
															{(isSpecific?.progress || 0).toLocaleString()}%
														</span>
													</div>
												</div>
											</div>
										</>
									</div>
								</div>
							</div>
						</>
					)}
					<div className="p-10">
						<GeneralDonation isSpecific={isSpecific} onClose={onClose} />
					</div>
				</>
			</RightSideModal>
		</>
	);
};
