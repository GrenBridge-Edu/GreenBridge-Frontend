import { Loader2 } from "lucide-react";

interface LoaderProps {
	className?: string;
}

const Loader = ({ className = "" }: LoaderProps) => (
	<div
		role="status"
		aria-label="Loading…"
		className={`flex items-center justify-center ${className}`}
		style={{
			minHeight: className.includes("h-screen") ? "100vh" : 120,
		}}>
		<div className="flex flex-col items-center gap-3">
			<div
				className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 motion-safe:animate-pulse"
				style={{
					background: "var(--gradient-brand)",
					boxShadow: "var(--shadow-brand)",
				}}
				aria-hidden="true">
				<svg
					width="26"
					height="26"
					viewBox="0 0 24 24"
					fill="none"
					aria-hidden="true">
					<path
						d="M12 3C9.5 6.2 6 9.6 6 14a6 6 0 0 0 12 0c0-4.4-3.5-7.8-6-11Z"
						fill="white"
					/>
					<path
						d="M9.5 14.5c0 1.8 1.1 3.2 2.8 3.7"
						stroke="var(--color-brand-primary)"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			</div>

			<Loader2
				size={19}
				className="animate-spin"
				style={{ color: "var(--color-brand-primary)" }}
				aria-hidden="true"
			/>
		</div>
	</div>
);

export default Loader;
