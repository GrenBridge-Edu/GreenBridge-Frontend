import React from "react";
import { X } from "lucide-react";

interface RightSideModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
	type?: "right" | "center";
	noPadding?: boolean;
	width?: string;
	height?: string;
	disableExternalClose?:boolean
}

const RightSideModal: React.FC<RightSideModalProps> = ({
	isOpen,
	onClose,
	children,
	title = "Add New Project",
	type = "right",
	noPadding = false,
	width = "max-w-lg",
	height,
	disableExternalClose=false
}) => {
	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
				isOpen
					? "pointer-events-auto bg-[#2A3563]/40"
					: "pointer-events-none bg-transparent"
			}`}>
			{/* Backdrop */}
			<div className="absolute inset-0" onClick={()=>{if (!disableExternalClose) onClose();}} />

			{/* Modal content */}
			<div
				className={`relative bg-white rounded-lg shadow-xl transform transition-all ease-in-out
					${type === "right" ? "h-5/6 w-full max-w-md ml-auto" : `w-full ${width}`}
					${
						type === "right"
							? `${
									isOpen
										? "translate-x-0 opacity-100"
										: "translate-x-full opacity-0"
							  } duration-500`
							: `${
									isOpen
										? "opacity-100 scale-100 translate-y-0"
										: "opacity-0 scale-95 translate-y-4"
							  } duration-300`
					}
				`}>
				{/* Header */}
				<div className="flex justify-between items-center p-4 border-b border-border border-gray-300">
					<h2
						className={`text-lg font-semibold ${
							type === "center" && width !== "max-w-lg"
								? "text-center w-full"
								: ""
						}`}>
						{title}
					</h2>
					<button
						onClick={onClose}
						className="flex items-center gap-2 border border-[#D1443E] px-2 py-1 rounded-xl bg-[#D1443E1A] cursor-pointer">
						<X className="w-5 h-5 text-[#D1443E]" />
						<span className="text-[#D1443E]">Close</span>
					</button>
				</div>

				{/* Body */}
				<div
					className={`${
						noPadding ? "" : "p-4"
					} overflow-y-auto ${height || `max-h-[calc(100%-4rem)]`}`}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default RightSideModal;
