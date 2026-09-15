import { Check, Trash } from "lucide-react";
import RightSideModal from "./rightsidemodal";
import PrimaryBtn from "../button";

interface DeleteModalProps {
	isConfirm?: boolean;
	isOpen: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	btnText?: string;
	isLoading?: string;
	description?: string;
	type?: "right" | "center";
}

const DeleteModal = ({
	isOpen,
	onClose,
	title,
	isLoading,
	onSubmit,
	description,
	btnText,
	isConfirm,
	type = "center",
}: DeleteModalProps) => {
	return (
		<>
			<RightSideModal
				isOpen={isOpen}
				onClose={onClose}
				type={type}
				title={title}>
				<>
					{!["Logout", "Update"]?.includes(btnText as string) && (
						<div
							style={{
								border: isConfirm ? "8px solid #c8f9e2" : "8px solid #f9c8c8",
							}}
							className={`size-24 mx-auto rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-12 hover:scale-110 ${
								isConfirm
									? "text-green-500 bg-[#d1fad8]"
									: "text-red-500 bg-[#fad1d1]"
							}`}>
							{isConfirm ? (
								<Check
									className={`w-32 h-32 text-green-500 animate-wiggle-infinite`}
								/>
							) : (
								<Trash
									className={`w-32 h-32 text-red-500 animate-wiggle-infinite`}
								/>
							)}
						</div>
					)}
					<p className="text-sm mt-4 font-normal text-center text-es-gray-100">
						{description ||
							`Action done cannot be reversible, Proceed to to delete?`}
					</p>
					<div className="mt-8  gap-8 items-center grid grid-cols-2">
						<PrimaryBtn
							className="w-full max-w-xs rounded-xl border-[#2A8C56] border-2 py-4 text-lg font-semibold text-[#2A8C56] shadow-sm hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 px-10"
							text="Close"
							width="w-full"
							disabled={!!isLoading}
							onClick={onClose}
							type="button"
						/>
						<PrimaryBtn
							text={btnText || "Delete"}
							width="w-full"
							loading={!!isLoading}
							disabled={!!isLoading}
							type="button"
							onClick={onSubmit}
							className={`w-full max-w-xs rounded-xl ${
								isConfirm
									? "bg-[#2A8C56] hover:bg-primary-600"
									: "bg-[#D1443E] hover:bg-[#B71926]"
							}  py-4 text-lg font-semibold text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 px-10`}
						/>
					</div>
				</>
			</RightSideModal>
		</>
	);
};

export default DeleteModal;
