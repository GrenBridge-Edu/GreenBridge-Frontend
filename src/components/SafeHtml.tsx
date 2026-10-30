import DOMPurify from "dompurify";
import type { CSSProperties } from "react";

interface SafeHtmlProps {
	html: string;
	className?: string;
	style?: CSSProperties;
}

const SafeHtml = ({ html, className = "", style }: SafeHtmlProps) => {
	const sanitizedHtml = DOMPurify.sanitize(html);

	return (
		<div
			className={`safe-html min-w-0 max-w-full overflow-hidden break-words ${className}`}
			style={style}
			dangerouslySetInnerHTML={{
				__html: sanitizedHtml,
			}}
		/>
	);
};

export default SafeHtml;
