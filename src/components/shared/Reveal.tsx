import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	distance?: number;
	duration?: number;
	once?: boolean;
}

const Reveal = ({
	children,
	className = "",
	delay = 0,
	distance = 24,
	duration = 700,
	once = true,
}: RevealProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (reduceMotion) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);

					if (once) {
						observer.disconnect();
					}
				} else if (!once) {
					setVisible(false);
				}
			},
			{
				threshold: 0.12,
				rootMargin: "0px 0px -40px 0px",
			},
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, [once]);

	return (
		<div
			ref={ref}
			className={`transition-[opacity,transform] ease-[cubic-bezier(0.22,1,0.36,1)] ${
				visible ? "opacity-100" : "opacity-0"
			} ${className}`}
			style={{
				transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
				transitionDuration: `${duration}ms`,
				transitionDelay: `${delay}ms`,
			}}>
			{children}
		</div>
	);
};

export default Reveal;
