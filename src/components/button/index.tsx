/* eslint-disable @typescript-eslint/no-explicit-any */
import * as LucideIcons from "lucide-react";
import ReactPaginate from "react-paginate";
import React from "react";
// import { useNavigate } from "react-router-dom";

interface PrimaryBtnProps {
	width?: string;
	bg?: string;
	color?: string;
	onClick?: (e: any) => void;
	loading?: boolean;
	text: string;
	icon?: any;
	iconPosition?: "left" | "right";
	type?: "submit" | "button" | "reset";
	disabled?: boolean;
	title?: string;
	className?: string;
	children?: React.ReactNode;
	loadingColor?: string;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
	width,
	bg,
	color,
	onClick,
	loading,
	text,
	icon,
	iconPosition = "left",
	disabled = false,
	title,
	className,
	type,
	children,
	loadingColor,
}) => {
	const IconComponent = icon;

	// const isValidIcon = IconComponent && typeof IconComponent === "function";

	return (
		<div>
			<button
				disabled={loading || disabled}
				onClick={onClick}
				style={{
					background: className ? "" : bg || "#000",
					color: className ? "" : color || "#FFFFFF",
				}}
				type={type || "submit"}
				title={title}
				className={`${
					width ?? "w-full"
				} disabled:cursor-not-allowed cursor-pointer disabled:opacity-25 flex justify-center items-center gap-2 ${
					className || "h-14 rounded-lg text-sm font-medium"
				}  ease-in-out transition-all`}>
				{loading ? (
					<LucideIcons.Loader
						className="animate-spin"
						size={20}
						color={loadingColor}
					/>
				) : (
					children || (
						<>
							{iconPosition === "left" && IconComponent && (
								<IconComponent size={20} />
							)}
							{text}
							{iconPosition === "right" && IconComponent && (
								<IconComponent size={20} />
							)}
						</>
					)
				)}
			</button>
		</div>
	);
};

export default PrimaryBtn;

type paginateType = {
	pageCount: number;
	handlePageClick: (e: any) => void;
};

export const MainPaginate = ({ handlePageClick, pageCount }: paginateType) => (
	<div className="flex justify-center items-center py-10">
		<ReactPaginate
			breakLabel="..."
			onPageChange={handlePageClick}
			pageRangeDisplayed={5}
			pageCount={pageCount}
			renderOnZeroPageCount={null}
			pageClassName="h-10 w-10 flex items-center justify-center rounded-full text-xl font-medium manrope border border-[#2A8C56] text-[#2A8C56] mx-2 cursor-pointer"
			className="flex items-center justify-center"
			previousClassName="hidden"
			nextClassName="hidden"
			activeClassName="bg-[#2A8C56] text-white"
		/>
	</div>
);


export const LoadMore = ({
	handleLoadMore,
	next,
	loading,
}: {
	next: boolean;
	loading: boolean;
	handleLoadMore?: (e: any) => void;
}) => {
	return (
		<>
			{!next ? (
				""
			) : (
				<PrimaryBtn
					onClick={handleLoadMore}
					text={loading ? "Loading..." : "Load More"}
					loading={loading}
					className="mx-auto"
					type={"button"}
					width={"w"}
				/>
			)}
		</>
	);
};
