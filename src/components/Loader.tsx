const Loader = ({className = ""}:{className?:string}) => {
	return (
		<div className={`flex min-h-[50vh] items-center justify-center ${className}`}>
			<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-black" />
		</div>
	);
};

export default Loader;
