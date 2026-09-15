const CurvePatternTop = () => {
	return (
		<div className=" absolute bottom-0 z-30 w-2/3 right-0">
			<div className="w-full -mb-1 overflow-hidden">
				<div
					className="h-24 sm:h-32 lg:h-40 bg-white"
					style={{
						borderTopLeftRadius: "2200px 600px",
						clipPath: "polygon(0 100%, 100% 100%, 100% 0, 48% 0, 0 100%)", // 48% looks even more natural
					}}
				/>
			</div>
		</div>
	);
};

export default CurvePatternTop;

export const CurvePatternBottom = () => {
	return (
		<div className=" absolute -bottom-38 z-30 w-2/3 right-0">
			<div className="w-full -mb-1 overflow-hidden">
				<div
					className="h-24 sm:h-32 lg:h-40 bg-white"
					style={{
						borderBottomLeftRadius: "2200px 600px",
						clipPath: "polygon(100% 0, 100% 100%, 48% 100%, 0 0, 0 0)", // 48% looks even more natural
					}}
				/>
			</div>
		</div>
	);
};
