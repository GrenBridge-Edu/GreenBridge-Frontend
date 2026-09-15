/* eslint-disable react/prop-types */

const MainHeader = ({ text }: { text: string }) => {
	return (
		<div className="tw-w-full tw-h-24 tw-bg-white tw-border-b tw-flex tw-px-6 tw-justify-between tw-items-center tw-border-plain">
			<NavButton text={text} />
			<div className="lg:tw-flex tw-hidden tw-gap-3 tw-items-center"></div>
		</div>
	);
};

const NavButton = ({ text }: { text: string }) => {
	return (
		<div>
			<button className="tw-text-plain tw-text-xl tw-font-normal tw-capitalize rowdies tw-p-2 tw-rounded-lg hover:tw-bg-gray-100">
				{text}
			</button>
		</div>
	);
};
export default MainHeader;
