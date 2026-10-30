type IconProps = React.SVGProps<SVGSVGElement>;

export const Twitter = (props: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		{...props}>
		<g fill="currentColor">
			<path d="M1 2h2.5l15 20h-2.5ZM5.5 2h2.5l15 20h-2.5Z">
				<animate
					fill="freeze"
					attributeName="d"
					dur="0.4s"
					values="M1 2h2.5l0 0h-2.5ZM5.5 2h2.5l-0.8 0h-2.5Z;M1 2h2.5l15 20h-2.5ZM5.5 2h2.5l15 20h-2.5Z"></animate>
			</path>
			<path d="M3 2h5v0h-5ZM16 22h5v0h-5Z">
				<animate
					fill="freeze"
					attributeName="d"
					begin="0.4s"
					dur="0.4s"
					to="M3 2h5v2h-5ZM16 22h5v-2h-5Z"></animate>
			</path>
			<path d="M18.5 2h3.5l0 0h-3.5Z">
				<animate
					fill="freeze"
					attributeName="d"
					begin="0.5s"
					dur="0.4s"
					to="M18.5 2h3.5l-17 20h-3.5Z"></animate>
			</path>
		</g>
	</svg>
);

export const Github = (props: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		{...props}>
		<g
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}>
			<path
				strokeDasharray={32}
				d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3">
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					dur="0.6s"
					values="32;0"></animate>
			</path>
			<path
				strokeDasharray={10}
				strokeDashoffset={10}
				d="M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.63 -1.09 -1.66 -2.31 -2.31">
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					begin="0.7s"
					dur="0.2s"
					to={0}></animate>
			</path>
		</g>
	</svg>
);

export const Facebook = (props: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		{...props}>
		<g
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={4}>
			<path strokeDasharray={24} d="M17 4l-2 0c-2.5 0 -4 1.5 -4 4v12">
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					dur="0.5s"
					values="24;0"></animate>
			</path>
			<path strokeDasharray={10} strokeDashoffset={10} d="M8 12h7">
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					begin="0.6s"
					dur="0.2s"
					to={0}></animate>
			</path>
		</g>
	</svg>
);

export const Youtube = (props: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		{...props}>
		<path
			fill="none"
			stroke="currentColor"
			strokeDasharray={60}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 5c9 0 9 0 9 7c0 7 0 7 -9 7c-9 0 -9 0 -9 -7c0 -7 0 -7 9 -7Z">
			<animate
				fill="freeze"
				attributeName="stroke-dashoffset"
				dur="0.6s"
				values="60;0"></animate>
		</path>
		<path fill="currentColor" d="M10 8.5l6 3.5l-6 3.5Z" opacity={0}>
			<set fill="freeze" attributeName="opacity" begin="0.6s" to={1}></set>
			<animate
				fill="freeze"
				attributeName="d"
				begin="0.6s"
				dur="0.2s"
				values="M12 11l0 1l0 1Z;M10 8.5l6 3.5l-6 3.5Z"></animate>
		</path>
	</svg>
);

export const Instagram = (props: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		{...props}>
		<g
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}>
			<path
				strokeDasharray={66}
				d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z">
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					dur="0.6s"
					values="66;0"></animate>
			</path>
			<path
				strokeDasharray={28}
				strokeDashoffset={28}
				d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4">
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					begin="0.7s"
					dur="0.6s"
					to={0}></animate>
			</path>
		</g>
		<circle cx={17} cy={7} r={1.5} fill="currentColor" opacity={0}>
			<animate
				fill="freeze"
				attributeName="opacity"
				begin="1.3s"
				dur="0.2s"
				to={1}></animate>
		</circle>
	</svg>
);

export const TikTok = (props: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		{...props}>
		<path
			fill="currentColor"
			d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z"
		/>
	</svg>
);

export const Whatsapp = (props: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		{...props}>
		<path
			fill="currentColor"
			d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.91 9.91 0 0 0 4.79 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67a8.18 8.18 0 0 1 5.83 2.41c1.56 1.56 2.42 3.63 2.42 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.4-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.19-.32a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23ZM8.68 7.01c-.17 0-.41.06-.63.29c-.21.24-.83.8-.83 1.95c0 1.15.85 2.26.97 2.42c.12.16 1.65 2.67 4.09 3.63c.57.24 1.02.38 1.37.49c.57.18 1.1.15 1.51.09c.46-.07 1.42-.58 1.62-1.14c.2-.56.2-1.03.14-1.14c-.06-.11-.22-.17-.47-.29c-.24-.13-1.42-.71-1.64-.79c-.22-.08-.38-.12-.54.12c-.16.25-.62.79-.76.95c-.14.16-.28.18-.52.06c-.24-.13-1-.37-1.91-1.18c-.71-.63-1.18-1.4-1.32-1.65c-.14-.24-.01-.38.11-.5c.11-.11.24-.28.37-.42c.12-.14.16-.24.24-.4c.08-.16.04-.3-.02-.42c-.06-.12-.54-1.34-.76-1.83c-.19-.46-.4-.42-.55-.43a9.65 9.65 0 0 0-.47-.01Z"
		/>
	</svg>
);

export const LinkedInIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true">
		<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM3.555 9h3.564v11.452H3.555V9ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
	</svg>
);
