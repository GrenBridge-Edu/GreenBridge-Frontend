const CurvePatternTop = () => {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute bottom-0 right-0 z-30 w-2/3">
			<div className="mb-[-1px] w-full overflow-hidden">
				<div
					className="h-20 bg-white sm:h-28 lg:h-40"
					style={{
						borderTopLeftRadius: "2200px 600px",
						clipPath: "polygon(0 100%, 100% 100%, 100% 0, 48% 0, 0 100%)",
					}}
				/>
			</div>
		</div>
	);
};

export const CurvePatternBottom = () => {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute -bottom-24 right-0 z-30 w-2/3 sm:-bottom-28 lg:-bottom-40">
			<div className="mb-[-1px] w-full overflow-hidden">
				<div
					className="h-20 bg-white sm:h-28 lg:h-40"
					style={{
						borderBottomLeftRadius: "2200px 600px",
						clipPath: "polygon(100% 0, 100% 100%, 48% 100%, 0 0, 0 0)",
					}}
				/>
			</div>
		</div>
	);
};

export default CurvePatternTop;
