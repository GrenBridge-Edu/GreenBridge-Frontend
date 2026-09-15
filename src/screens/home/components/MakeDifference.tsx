import homeDonate from "../../../assets/images/homeDonate.png";
import PrimaryBtn from "../../../components/button";

const MakeDifference = ({ isHome = true }: { isHome?: boolean }) => {
	return (
		<section className={`${isHome ? "pb-75  px-10 md:px-40 " : ""}`}>
			<div
				className={` bg-white p-10 min-h-[300px] shadow border border-gray-50 w-full rounded-3xl ${
					isHome
						? "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-7xl "
						: ""
				}`}>
				<div className="grid grid-cols-4 gap-8">
					<div className="">
						<h3 className="text-[#1A1A1A] font-bold capitalize text-[24px] py-1">
							Make a Difference Today
						</h3>
						<p className="text-[#3A3A3A] text-[14px] py-3 leading-5">
							Your donation helps us provide quality education and sustainable
							solutions to communities in need. Every contribution counts. Your
							donation helps us provide quality education and sustainable
							solutions to communities in need. Every contribution counts.
						</p>
						<PrimaryBtn
							// disabled={!!loading}
							// loading={!!loading}
							// width="w"
							text="Donate now"
							className="bg-[#2A8C56] py-3 text-white rounded-2xl min-h-12 px-10 hover:scale-105 ease-in-out transition-all"
						/>
					</div>
					<div className=" col-span-3">
						<img
							src={homeDonate}
							alt={"Make Difference"}
							className=" rounded-2xl h-[40vh] object-cover transition-all ease-in-out hover:scale-105 w-full duration-500"
							loading="lazy"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MakeDifference;
