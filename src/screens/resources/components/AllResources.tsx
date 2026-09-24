import IconButton from "@mui/material/IconButton";
import { ListFilter } from "lucide-react";
import { ResourceComponent, resources } from "../../home/components/Resources";
import { useResourcesStore } from "../../../data/stores/loggerStore";
import { useEffect, useState } from "react";
import { apiCall } from "../../../data/useFetcher";

const AllResources = () => {
	const { getDynamicLogger } = useResourcesStore(),
		{ categories }: any = useResourcesStore(),
		[category, setCategory] = useState("");

	useEffect(() => {
		apiCall({
			type: "get",
			url: `/api/v1/resource/categories`,
			getter: (d: any) => getDynamicLogger(d, "categories"),
		});
	}, []);

	return (
		<div className=" px-10 md:px-40 py-10 md:py-24">
			<div className="grid md:grid-cols-2 items-end gap-8">
				<div className="flex flex-col">
					<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
						Resources
					</h1>
					<p className="text-[#3A3A3A] text-[16px]">
						Explore inspiring stories, visual insights, and updates from our
						journey toward sustainability and quality education for all.
					</p>
				</div>
				<div className=" md:absolute md:right-5">
					<div className="bg-[#D8EAE0] rounded-2xl w-full md:max-w-lg p-4 md:p-8 min-h-48">
						<p className="text-[#3A3A3A] text-[16px] pb-4">
							Quickly find specific resources to learn more about our impact or
							support your own initiatives.
						</p>
						<div className="relative">
							<div className="absolute cursor-pointer top-2 left-2">
								<IconButton>
									<ListFilter color="#3A3A3A" />
								</IconButton>
							</div>

							<select
								name="category"
								className="pl-15 border bg-[#f7f7f7] w-full p-4 rounded-xl
									focus:outline-none focus:ring-2 focus:ring-gray-300
									text-[#3A3A3A] placeholder:text-[#3A3A3A]
									focus:border-transparent border-gray-300 capitalize"
								value={category}
								onChange={e => setCategory(e?.target?.value)}>
								<option value="">Filter by Category</option>
								{(categories && Array.isArray(categories)
									? categories
									: []
								)?.map((category: any, cdx: number) => (
									<option value={category} key={cdx}>
										{category}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</div>
			<OurResources category={category} />
		</div>
	);
};

export default AllResources;

const OurResources = ({ category }: { category: string }) => {
	const { getLogger, data } = useResourcesStore();
	const [datum, setDatum] = useState<dataType | any>({ docs: [] });

	useEffect(() => {
		apiCall({
			type: "get",
			url: `/api/v1/resource/get-resources`,
			getter: (d: any) => getLogger(d),
			params: { category },
		});
	}, [category]);

	useEffect(() => {
		setDatum(data);
	}, [data]);

	if (!data || datum?.docs?.length === 0)
		return <MainOurResources resource={resources} />;

	return <MainOurResources resource={datum?.docs} />;
};

const MainOurResources = ({ resource }: { resource?: any[] }) => {
	return (
		<>
			<div className="grid md:grid-cols-3 gap-6 pt-10">
				{resource?.map((hero, hdx) => (
					<ResourceComponent key={hdx} hero={hero} />
				))}
			</div>
		</>
	);
};