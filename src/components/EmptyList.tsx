const EmptyList = ({
	message = "No items found.",
	span,
	className = "",
}: {
	message?: string;
	span?: any;
	className?: string;
}) => {
	return (
		<div
			className={`flex flex-col items-center justify-center p-6 text-center text-gray-500 w-full min-h-[50vh] ${className}`}>
			{span ? (
				span()
			) : (
				<>
					<svg
						className="w-16 h-16 mb-4 text-gray-300"
						fill="none"
						stroke="currentColor"
						strokeWidth={1.5}
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 3h18M4 7h16M5 11h14M6 15h12M7 19h10"
						/>
					</svg>
					<p className="text-lg font-medium">{message}</p>
				</>
			)}
		</div>
	);
};

export default EmptyList;
