import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface RightSideModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
	type?: "right" | "center";
	noPadding?: boolean;
	width?: string;
	height?: string;
	disableExternalClose?: boolean;
}

const RightSideModal = ({
	isOpen,
	onClose,
	children,
	title = "Add New Project",
	type = "right",
	noPadding = false,
	width = "max-w-lg",
	height,
	disableExternalClose = false,
}: RightSideModalProps) => {
	const titleId = useId();

	const dialogRef = useRef<HTMLElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	// Lock background scrolling and restore focus when the modal closes.
	useEffect(() => {
		if (!isOpen) return;

		const previousOverflow = document.body.style.overflow;
		const previousFocus =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;

		document.body.style.overflow = "hidden";
		closeButtonRef.current?.focus();

		return () => {
			document.body.style.overflow = previousOverflow;

			if (previousFocus?.isConnected) {
				previousFocus.focus();
			}
		};
	}, [isOpen]);

	// Escape handling and keyboard focus containment.
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				if (!disableExternalClose) {
					event.preventDefault();
					onClose();
				}
				return;
			}

			if (event.key !== "Tab") return;

			const focusableElements =
				dialogRef.current?.querySelectorAll<HTMLElement>(
					'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
				);

			if (!focusableElements?.length) {
				event.preventDefault();
				return;
			}

			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (event.shiftKey && document.activeElement === firstElement) {
				event.preventDefault();
				lastElement.focus();
			} else if (!event.shiftKey && document.activeElement === lastElement) {
				event.preventDefault();
				firstElement.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose, disableExternalClose]);

	const isRight = type === "right";

	return (
		<div
			className={`fixed inset-0 z-[100] flex ${
				isRight ? "justify-end" : "items-center justify-center"
			} transition-colors duration-300 ${
				isOpen
					? "pointer-events-auto bg-[#2A3563]/40"
					: "pointer-events-none bg-transparent"
			}`}
			aria-hidden={!isOpen}>
			{/* Backdrop */}
			<button
				type="button"
				tabIndex={isOpen ? 0 : -1}
				aria-label="Close modal"
				disabled={!isOpen || disableExternalClose}
				className={`absolute inset-0 cursor-default transition-opacity duration-300 ${
					isOpen
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0"
				}`}
				onClick={() => {
					if (!disableExternalClose) onClose();
				}}
			/>

			{/* Modal content */}
			<section
				ref={dialogRef}
				role="dialog"
				aria-modal={isOpen ? "true" : undefined}
				aria-labelledby={titleId}
				className={`relative z-10 flex min-h-0 flex-col overflow-hidden bg-white shadow-2xl transition-[transform,opacity] ${
					isRight
						? `h-[90dvh] w-full max-w-md rounded-l-2xl ${
								isOpen
									? "translate-x-0 opacity-100"
									: "translate-x-full opacity-0"
							} duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`
						: `mx-3 w-full ${width} max-h-[90dvh] rounded-2xl ${
								isOpen
									? "translate-y-0 scale-100 opacity-100"
									: "translate-y-5 scale-[0.98] opacity-0"
							} duration-300 ease-out`
				}`}
				style={{
					visibility: isOpen ? "visible" : "visible",
				}}>
				{/* Header */}
				<div className="flex shrink-0 items-center justify-between gap-4 border-b border-gray-100 bg-white px-5 py-4 sm:px-6">
					<h2
						id={titleId}
						className={`min-w-0 flex-1 text-lg font-bold text-[#1A1A1A] sm:text-xl ${
							type === "center" && width !== "max-w-lg" ? "text-center" : ""
						}`}>
						{title}
					</h2>

					<button
						ref={closeButtonRef}
						type="button"
						tabIndex={isOpen ? 0 : -1}
						onClick={onClose}
						disabled={!isOpen}
						className="flex shrink-0 items-center gap-2 rounded-lg border border-[#D1443E]/20 bg-[#D1443E]/10 px-3 py-2 text-[#D1443E] transition-colors duration-200 hover:bg-[#D1443E]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1443E] disabled:pointer-events-none"
						aria-label="Close dialog">
						<X size={18} />
						<span className="text-sm font-semibold">Close</span>
					</button>
				</div>

				{/* Scrollable body */}
				<div
					className={`min-h-0 flex-1 overflow-y-auto overscroll-contain ${
						noPadding ? "" : "p-4 sm:p-6"
					} ${height || ""}`}>
					{children}
				</div>
			</section>
		</div>
	);
};

export default RightSideModal;
