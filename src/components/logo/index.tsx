import { Link } from "react-router-dom";
import { LogoIcon } from "../../utils/icons";

const Brand = ({
	onClick,
	height,
}: {
	onClick?: () => void;
	height?: string;
}) => {
	return (
		<Link
			to={"/"}
			onClick={() => {
				if (onClick) onClick();
			}}>
			<LogoHandler height={height} />
		</Link>
	);
};

export default Brand;

export const LogoHandler = ({ height }: { height?: string }) => {
	return <LogoIcon className={height} />;
};
