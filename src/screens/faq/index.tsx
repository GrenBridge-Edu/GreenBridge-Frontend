import Hero from "../../components/shared/Hero";
import FAQs from "./components/FAQComponent";

const MainFAQs = () => {
	return (
		<>
			<Hero
				heading={"FAQs"}
				subtext=""
				backgroundImage={""}
				height="60vh"
				subtextVisibility={{ global: false }}
				animations={{
					background: true,
					content: true,
				}}
				isActive
			/>
			<FAQs />
		</>
	);
};

export default MainFAQs;
