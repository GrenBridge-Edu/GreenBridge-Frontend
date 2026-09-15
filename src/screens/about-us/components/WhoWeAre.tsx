import homeProgram1 from "../../../assets/images/homeProgram1.png";
import about1 from "../../../assets/images/about1.png";

const WhoWeAre = () => {
	return (
		<div className=" px-10 md:px-40 py-10 md:py-30 relative">
			<div className="grid md:grid-cols-2 items-end gap-8">
				<div className="">
					<h2 className="text-[#2A8C56] font-bold uppercase text-[16px]">
						about us
					</h2>
					<h1 className="text-[#1A1A1A] font-bold uppercase text-[32px] py-1">
						who we are
					</h1>
					<p className="text-[#3A3A3A] text-[16px] leading-8">
						We are an NGO on a mission to cultivate comprehensive learning
						experiences while championing sustainable development across Africa
						and on a global scale. Our goal is to inspire young individuals and
						empower their minds to be able to independently develop sustainable
						solutions within their communities and future careers. By giving
						them access to the knowledge and tools for sustainable development,
						we empower them to shape the change they want to see, to see their
						communities and environment differently, and to build them up while
						growing academically and intellectually. We aim to nurture this
						spirit of innovation so it creates a ripple effect among young
						people.
					</p>
					<div className="py-4"></div>
				</div>
			</div>
			<div className=" md:absolute md:right-5 md:-top-20 md:z-30 md:w-[40vw] w-full">
				<div className="relative rounded-2xl h-full min-h-64 md:min-h-80">
					{/* Green background layer (behind the image) */}
					<div className="absolute inset-0 bg-[#2A8C56] z-0 w-full md:w-[85%] h-[90%] rounded-xl -left-5 -top-2 md:-top-3 md:ml-auto" />

					{/* Actual image - covers the entire container */}
					<img
						src={about1}
						alt={"About Us"}
						className="absolute inset-0 w-full md:w-5/6 h-5/6 object-cover z-10 rounded-2xl md:ml-auto"
					/>
				</div>
				<div className="relative rounded-2xl h-full min-h-64 md:min-h-80">
					{/* Green background layer (behind the image) */}
					<div className="absolute inset-0 bg-[#2A8C56] z-0 w-full md:w-[85%] h-[90%] rounded-xl -left-5 -top-2 md:-top-3" />

					{/* Actual image - covers the entire container */}
					<img
						src={homeProgram1}
						alt={"About Us"}
						className="absolute inset-0 w-full md:w-5/6 h-5/6 object-cover z-10 rounded-2xl"
					/>
				</div>
			</div>
		</div>
	);
};

export default WhoWeAre;
