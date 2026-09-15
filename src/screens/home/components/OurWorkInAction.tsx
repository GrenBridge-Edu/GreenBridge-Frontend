import PrimaryBtn from "../../../components/button";
import homeProgram1 from "../../../assets/images/homeProgram1.png";
import homeProgram2 from "../../../assets/images/homeProgram2.png";
import homeProgram3 from "../../../assets/images/homeProgram3.png";
import dayjs from "dayjs";
import { apiCall, nairaSignNeutral } from "../../../data/useFetcher";
import { useProgramsStore } from "../../../data/stores/loggerStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OurWorkInAction = () => {
	const workActions = [
		{
			title: "Child to School",
			description:
				"Providing educational resources nd scholarships to underprivileged children, ensuring access to quality education for all.",
			createdAt: Date.now(),
			target: 5000000,
			thumbnailFile: { secure_url: homeProgram1 },
		},
		{
			title: "Ground Up",
			description:
				"Building sustainable infrastructure from the ground uo, focusing on renewable energy and eco-friendly construction",
			createdAt: Date.now(),
			target: 5000000,
			thumbnailFile: { secure_url: homeProgram2 },
		},
		{
			title: "Students to School",
			description:
				"Providing educational resources nd scholarships to underprivileged children, ensuring access to quality education for all.",
			createdAt: Date.now(),
			target: 5000000,
			thumbnailFile: { secure_url: homeProgram3 },
		},
	];

	const { getLogger, data } = useProgramsStore();
	const [datum, setDatum] = useState<dataType | any>({ docs: [] });

	useEffect(() => {
		apiCall({
			type: "get",
			url: `/api/v1/program/get-programs`,
			getter: (d: any) => getLogger(d),
		});
	}, []);

	useEffect(() => {
		setDatum(data);
	}, [data]);

	if (!data || datum?.docs?.length === 0)
		return <ActualWorks workActions={workActions} />;

	return <ActualWorks workActions={datum?.docs} />;
};

export default OurWorkInAction;

const ActualWorks = ({ workActions }: { workActions?: any[] }) => {
	const navigate = useNavigate();
	return (
		<>
			<div className=" px-10 md:px-40 py-10 md:py-24">
				<div className="grid md:grid-cols-2">
					<div className="flex flex-col">
						<h2 className="text-[#2A8C56] uppercase text-[16px]">
							Our Latest programs
						</h2>
						<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
							Our work in action
						</h1>
						<p className="text-[#3A3A3A] text-[16px]">
							Discover how we're creating sustainable change through education,
							infrastructure, and community empowerment
						</p>
					</div>
					<div className="hidden md:flex justify-end items-center">
						<PrimaryBtn
							// disabled={!!loading}
							// loading={!!loading}
							width="w"
							text="See all Programs"
							className="bg-[#2A8C56] py-3 text-white rounded-2xl min-h-12 px-10 hover:scale-105"
							onClick={() => navigate("/programs")}
						/>
					</div>
				</div>
				<div className="grid md:grid-cols-3 gap-6 pt-10">
					{workActions?.map((action, adx) => (
						<div className="border rounded-xl p-3 border-gray-100" key={adx}>
							<img
								src={action?.thumbnailFile?.secure_url}
								alt={action?.title}
								className=" rounded-t-xl pb-3 transition-all ease-in-out hover:scale-105 w-full duration-500 h-[250px] object-fit"
								loading="lazy"
							/>
							<h3 className="text-[#1A1A1A] font-bold capitalize text-[20px] py-1">
								{action?.title}
							</h3>
							<p className="text-[#3A3A3A] text-[14px] py-3">
								{action?.caption || action?.description}
							</p>
							<div className="flex items-center gap-3 pb-3">
								{adx % 2 !== 0 ? <span>Target:</span> : <span>Date:</span>}
								<div className="bg-[#D8EAE0] p-2 rounded-lg w-full">
									{adx % 2 !== 0 ? (
										<span>
											{nairaSignNeutral}
											{(action?.target || 0).toLocaleString()}
										</span>
									) : (
										<span>
											{dayjs(action?.createdAt).format("MMMM YYYY")} - Present
										</span>
									)}
								</div>
							</div>
							<PrimaryBtn
								// disabled={!!loading}
								// loading={!!loading}
								// width="w"
								text="Read more"
								className="bg-[#2A8C56] py-3 text-white rounded-2xl min-h-12 px-10 hover:scale-105"
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};