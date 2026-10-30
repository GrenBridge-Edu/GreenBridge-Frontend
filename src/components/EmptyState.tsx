import type { ReactNode } from "react";

interface EmptyStateProps {
	icon: ReactNode;
	title: string;
	description?: string;
	action?: ReactNode;
}

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
	<div className="group flex flex-col items-center justify-center px-4 py-16 text-center">
		<div
			className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl p-4 transition-[transform,background-color,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-md motion-reduce:transition-none"
			style={{
				color: "var(--color-text-muted)",
				background: "var(--color-bg-elevated)",
			}}>
			<div className="h-full w-full transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none">
				{icon}
			</div>
		</div>

		<h3
			className="font-semibold transition-colors duration-200"
			style={{ color: "var(--color-text-primary)" }}>
			{title}
		</h3>

		{description && (
			<p
				className="mt-1 max-w-xs text-sm leading-relaxed"
				style={{ color: "var(--color-text-muted)" }}>
				{description}
			</p>
		)}

		{action && (
			<div className="mt-5 transition-transform duration-200 hover:-translate-y-0.5">
				{action}
			</div>
		)}
	</div>
);

export default EmptyState;
