import { siteConfig } from "../../data/Config";

interface LogoProps {
	src?: string;
	height?: number;
	className?: string;
}

const Logo = ({ src, height = 32, className = "" }: LogoProps) => {
	const logoSrc = src ?? siteConfig.branding.logo;
	const logoAlt = siteConfig.branding.logoAlt;

	return (
		<img
			src={logoSrc}
			alt={logoAlt}
			height={height}
			style={{
				height,
				width: "auto",
				display: "block",
			}}
			className={className}
		/>
	);
};

export default Logo;
