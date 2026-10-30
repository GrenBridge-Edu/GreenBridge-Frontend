/* eslint-disable react-hooks/purity */
/**
 * Jubilingroagro – Shared UI primitives
 * Tailwind v4 compatible.
 * Theme colours use CSS variables or inline styles.
 */
import { Loader2, Eye, EyeOff, X } from "lucide-react";
import { createPortal } from "react-dom";
import React, {
	forwardRef,
	useEffect,
	useId,
	useRef,
	useState,
	type ChangeEvent,
	type CSSProperties,
	type InputHTMLAttributes,
	type ReactNode,
} from "react";
import { NumericFormat } from "react-number-format";
import PhoneInput, { type Country } from "react-phone-number-input/input";

// ─── Button ──────────────────────────────────────────────────────────────────

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "ghost"
	| "danger"
	| "outline";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	fullWidth?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

const BTN_BASE =
	"group relative inline-flex items-center justify-center overflow-hidden font-semibold select-none " +
	"transition-[background-color,color,border-color,box-shadow,transform,opacity] duration-200 ease-out " +
	"hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
	"disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:transform-none";

const BTN_SIZE: Record<ButtonSize, string> = {
	sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
	md: "px-5 py-2.5 text-sm rounded-xl gap-2",
	lg: "px-7 py-3.5 text-base rounded-xl gap-2",
};

const BTN_VARIANT_CLASS: Record<ButtonVariant, string> = {
	primary:
		"text-white focus-visible:ring-green-500 hover:brightness-105 hover:shadow-lg",
	secondary:
		"focus-visible:ring-green-500 hover:border-[var(--color-brand-primary)] hover:shadow-md",
	outline:
		"focus-visible:ring-green-500 hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-bg-elevated)]",
	ghost: "focus-visible:ring-green-500 hover:bg-[var(--color-bg-elevated)]",
	danger:
		"text-white focus-visible:ring-red-500 hover:brightness-105 hover:shadow-md",
};

const BTN_VARIANT_STYLE: Record<ButtonVariant, React.CSSProperties> = {
	primary: {
		background: "var(--color-brand-primary)",
		color: "var(--color-text-inverse)",
		boxShadow: "var(--shadow-brand)",
	},
	secondary: {
		background: "var(--color-bg-elevated)",
		color: "var(--color-text-primary)",
		border: "1px solid var(--color-border)",
	},
	outline: {
		background: "transparent",
		color: "var(--color-text-primary)",
		border: "1px solid var(--color-border)",
	},
	ghost: {
		background: "transparent",
		color: "var(--color-text-secondary)",
	},
	danger: {
		background: "var(--color-error)",
		color: "#fff",
	},
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "primary",
			size = "md",
			loading,
			fullWidth,
			leftIcon,
			rightIcon,
			disabled,
			className = "",
			children,
			style,
			type = "button",
			...props
		},
		ref,
	) => (
		<button
			ref={ref}
			type={type}
			disabled={disabled || loading}
			aria-busy={loading || undefined}
			className={[
				BTN_BASE,
				BTN_VARIANT_CLASS[variant],
				BTN_SIZE[size],
				fullWidth ? "w-full" : "",
				className,
			]
				.filter(Boolean)
				.join(" ")}
			style={{ ...BTN_VARIANT_STYLE[variant], ...style }}
			{...props}>
			{loading ? (
				<Loader2
					size={size === "sm" ? 14 : 16}
					className="shrink-0 animate-spin"
					aria-hidden
				/>
			) : leftIcon ? (
				<span
					className="shrink-0 transition-transform duration-200 group-hover:scale-105"
					aria-hidden>
					{leftIcon}
				</span>
			) : null}

			<span>{children}</span>

			{!loading && rightIcon && (
				<span
					className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
					aria-hidden>
					{rightIcon}
				</span>
			)}
		</button>
	),
);

Button.displayName = "Button";

// ─── Input ───────────────────────────────────────────────────────────────────

export type InputType =
	| "text"
	| "email"
	| "password"
	| "number"
	| "tel"
	| "url"
	| "search"
	| "date"
	| "datetime-local"
	| "time"
	| "month"
	| "week"
	| "color"
	| "file"
	| "hidden";

export interface InputChangeEvent<T = string | number | undefined> {
	target: {
		name?: string;
		value: T;
	};
}

export interface InputProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"type" | "value" | "onChange" | "defaultValue"
> {
	type?: InputType;
	label?: string;
	error?: string;
	hint?: string;
	leftAddon?: ReactNode;
	rightAddon?: ReactNode;
	value?: string | number | null;
	defaultValue?: string | number | null | undefined;
	onChange?: (
		event:
			| ChangeEvent<HTMLInputElement>
			| InputChangeEvent<string | number | undefined>,
	) => void;
	noFormat?: boolean;
	percentage?: boolean;
	allowLeadingZeros?: boolean;
	prefixType?: string;
	inputStyle?: CSSProperties;
	dataList?: Array<{
		description: string;
		place_id?: string;
		[key: string]: unknown;
	}>;
	list?: string;
	phoneCountry?: Country;
}

const makeChangeEvent = <T,>(name: string | undefined, value: T) => ({
	target: {
		name,
		value,
	},
});

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			error,
			hint,
			leftAddon,
			rightAddon,
			id,
			type = "text",
			className = "",
			value,
			onChange,
			disabled,
			required,
			name,
			placeholder,
			defaultValue,
			noFormat = false,
			percentage = false,
			allowLeadingZeros = false,
			prefixType,
			inputStyle,
			dataList,
			list,
			phoneCountry = "NG",
			...props
		},
		ref,
	) => {
		const generatedId = useId();
		const hasControlledValue = value !== undefined && value !== null;
		const inputValue = hasControlledValue ? value : undefined;
		const inputDefaultValue = hasControlledValue
			? undefined
			: (defaultValue ?? undefined);

		const inputId = id ?? `input-${generatedId}`;

		const [showPassword, setShowPassword] = useState(false);

		const isPassword = type === "password";
		const isNumber = type === "number";
		const isPhone = type === "tel";

		const errorId = error ? `${inputId}-error` : undefined;
		const hintId = hint ? `${inputId}-hint` : undefined;

		const describedBy =
			[errorId, hintId].filter(Boolean).join(" ") || undefined;

		const inputClassName = [
			"input-base",
			"transition-[border-color,box-shadow,background-color] duration-200 ease-out",
			error ? "input-error" : "",
			leftAddon ? "input-pl" : "",
			isPassword || rightAddon ? "input-pr" : "",
			className,
		]
			.filter(Boolean)
			.join(" ");

		const handleNativeChange = (event: ChangeEvent<HTMLInputElement>) => {
			onChange?.(event);
		};

		const handleNumberChange = (values: {
			value: string;
			floatValue?: number;
		}) => {
			if (!onChange) return;

			const nextValue = allowLeadingZeros ? values.value : values.floatValue;

			onChange(makeChangeEvent(name, nextValue));
		};

		const handlePhoneChange = (phone?: string) => {
			if (!onChange) return;

			onChange(makeChangeEvent(name, phone));
		};

		const numberPrefix = noFormat
			? ""
			: !percentage
				? `${prefixType || "₦"} `
				: "";

		const numberSuffix = noFormat
			? ""
			: percentage
				? ` ${prefixType || "%"} `
				: "";

		return (
			<div className="w-full space-y-1.5">
				{label && (
					<label
						htmlFor={inputId}
						className="block text-sm font-semibold"
						style={{ color: "var(--color-text-primary)" }}>
						{label}
						{required && (
							<span className="ml-1" style={{ color: "var(--color-error)" }}>
								*
							</span>
						)}
					</label>
				)}

				<div className="relative">
					{leftAddon && (
						<span
							className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2"
							style={{ color: "var(--color-text-muted)" }}
							aria-hidden>
							{leftAddon}
						</span>
					)}

					{isNumber ? (
						<NumericFormat
							id={inputId}
							name={name}
							value={inputValue}
							defaultValue={inputDefaultValue}
							disabled={disabled}
							required={required}
							placeholder={placeholder}
							className={inputClassName}
							style={inputStyle}
							thousandSeparator={!allowLeadingZeros && !noFormat}
							allowNegative={false}
							allowLeadingZeros={allowLeadingZeros}
							decimalScale={undefined}
							inputMode="decimal"
							prefix={numberPrefix}
							suffix={numberSuffix}
							onValueChange={handleNumberChange}
							readOnly={props.readOnly}
							aria-invalid={!!error}
							aria-describedby={describedBy}
							{...props}
						/>
					) : isPhone ? (
						<PhoneInput
							ref={ref}
							id={inputId}
							name={name}
							value={hasControlledValue ? String(value) : undefined}
							defaultCountry={phoneCountry}
							placeholder={placeholder}
							disabled={disabled}
							required={required}
							readOnly={props.readOnly}
							className={inputClassName}
							style={inputStyle}
							onChange={handlePhoneChange}
							limitMaxLength
							aria-invalid={!!error}
							aria-describedby={describedBy}
							{...props}
						/>
					) : (
						<input
							ref={ref}
							id={inputId}
							name={name}
							type={isPassword ? (showPassword ? "text" : "password") : type}
							value={inputValue}
							defaultValue={inputDefaultValue}
							disabled={disabled}
							required={required}
							placeholder={placeholder}
							aria-invalid={!!error}
							aria-describedby={describedBy}
							className={inputClassName}
							style={inputStyle}
							onChange={handleNativeChange}
							{...props}
						/>
					)}

					{isPassword && (
						<button
							type="button"
							onClick={() => setShowPassword(current => !current)}
							disabled={disabled}
							aria-label={showPassword ? "Hide password" : "Show password"}
							className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[var(--color-text-muted)] transition-[color,background-color,transform] duration-200 hover:scale-105 hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] disabled:opacity-50">
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					)}

					{rightAddon && !isPassword && (
						<span
							className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
							style={{ color: "var(--color-text-muted)" }}
							aria-hidden>
							{rightAddon}
						</span>
					)}
				</div>

				{dataList?.length && list ? (
					<>
						<small
							className="block text-xs"
							style={{ color: "var(--color-text-muted)" }}>
							Please select from the available dropdown option that'll appear as
							you type
						</small>

						<datalist id={list}>
							{dataList.map((item, index) => (
								<option
									key={item.place_id ?? index}
									value={item.description}
									title={item.place_id}>
									{item.description}
								</option>
							))}
						</datalist>
					</>
				) : null}

				{error && (
					<p
						id={errorId}
						role="alert"
						className="animate-fade-in text-xs font-medium"
						style={{ color: "var(--color-error)" }}>
						{error}
					</p>
				)}

				{hint && !error && (
					<p
						id={hintId}
						className="text-xs"
						style={{ color: "var(--color-text-muted)" }}>
						{hint}
					</p>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";

// ─── Textarea ────────────────────────────────────────────────────────────────

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, error, id, className = "", ...props }, ref) => {
		const generatedId = useId();
		const taId = id ?? `ta-${generatedId}`;
		const errorId = error ? `${taId}-error` : undefined;

		return (
			<div className="w-full space-y-1.5">
				{label && (
					<label
						htmlFor={taId}
						className="block text-sm font-semibold"
						style={{ color: "var(--color-text-primary)" }}>
						{label}
					</label>
				)}

				<textarea
					ref={ref}
					id={taId}
					aria-invalid={!!error}
					aria-describedby={errorId}
					className={[
						"input-base textarea-base",
						"transition-[border-color,box-shadow,background-color] duration-200 ease-out",
						error ? "input-error" : "",
						className,
					]
						.filter(Boolean)
						.join(" ")}
					{...props}
				/>

				{error && (
					<p
						id={errorId}
						role="alert"
						className="text-xs font-medium animate-fade-in"
						style={{ color: "var(--color-error)" }}>
						{error}
					</p>
				)}
			</div>
		);
	},
);

Textarea.displayName = "Textarea";

// ─── Avatar ──────────────────────────────────────────────────────────────────

interface AvatarProps {
	src?: string | null;
	name?: string;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	className?: string;
	online?: boolean;
}

const AVATAR_SIZES = {
	xs: "w-6 h-6 text-[10px]",
	sm: "w-8 h-8 text-xs",
	md: "w-10 h-10 text-sm",
	lg: "w-12 h-12 text-base",
	xl: "w-16 h-16 text-xl",
};

export const Avatar = ({
	src,
	name,
	size = "md",
	className = "",
	online,
}: AvatarProps) => {
	const initials = name
		? name
				.split(" ")
				.map(word => word[0])
				.slice(0, 2)
				.join("")
				.toUpperCase()
		: "?";

	return (
		<div className={`relative shrink-0 ${className}`}>
			<div
				className={`${AVATAR_SIZES[size]} flex items-center justify-center overflow-hidden rounded-full font-bold transition-[box-shadow,transform] duration-200 hover:scale-105`}
				style={{
					background: src ? undefined : "var(--color-bg-elevated)",
					border: "1px solid var(--color-border)",
					color: "var(--color-brand-primary)",
				}}>
				{src ? (
					<img
						src={src}
						alt={name ?? "Avatar"}
						className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
						loading="lazy"
					/>
				) : (
					<span aria-label={name ?? "Avatar"}>{initials}</span>
				)}
			</div>

			{online !== undefined && (
				<span
					aria-label={online ? "Online" : "Offline"}
					className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2"
					style={{
						borderColor: "var(--color-bg-base)",
						background: online
							? "var(--color-brand-primary)"
							: "var(--color-text-muted)",
					}}
				/>
			)}
		</div>
	);
};

// ─── Badge ───────────────────────────────────────────────────────────────────

type BadgeVariant = "brand" | "success" | "warning" | "error" | "muted";

const BADGE_STYLE: Record<BadgeVariant, React.CSSProperties> = {
	brand: {
		background: "var(--color-brand-primary)",
		color: "var(--color-text-inverse)",
	},
	success: { background: "var(--color-success)", color: "#fff" },
	warning: {
		background: "var(--color-warning)",
		color: "var(--color-text-inverse)",
	},
	error: { background: "var(--color-error)", color: "#fff" },
	muted: {
		background: "var(--color-bg-elevated)",
		color: "var(--color-text-muted)",
	},
};

export const Badge = ({
	children,
	variant = "brand",
	className = "",
}: {
	children: React.ReactNode;
	variant?: BadgeVariant;
	className?: string;
}) => (
	<span
		className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-extrabold transition-[background-color,color] duration-200 ${className}`}
		style={BADGE_STYLE[variant]}>
		{children}
	</span>
);

// ─── Skeleton ────────────────────────────────────────────────────────────────

export const Skeleton = ({
	className = "",
	lines = 1,
}: {
	className?: string;
	lines?: number;
}) => (
	<div className="space-y-2" aria-busy="true" aria-label="Loading…">
		{Array.from({ length: lines }).map((_, index) => (
			<div
				key={index}
				className={`skeleton rounded-md ${className}`}
				style={{ height: 16 }}
			/>
		))}
	</div>
);

export const PostSkeleton = () => (
	<div
		className="rounded-2xl p-5"
		style={{
			background: "var(--color-bg-surface)",
			border: "1px solid var(--color-border)",
		}}
		aria-label="Loading post…"
		aria-busy="true">
		<div className="flex gap-3">
			<div className="skeleton h-11 w-11 shrink-0 rounded-full" />
			<div className="flex-1 space-y-3 pt-1">
				<div className="skeleton h-4 w-[30%] rounded-md" />
				<div className="skeleton h-3 w-full rounded-md" />
				<div className="skeleton h-3 w-[75%] rounded-md" />
			</div>
		</div>
	</div>
);

// ─── Modal ───────────────────────────────────────────────────────────────────

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	description?: string;
	children: React.ReactNode;
	maxWidth?: string;
}

const MODAL_TRANSITION_MS = 220;

export const Modal = ({
	open,
	onClose,
	title,
	description,
	children,
	maxWidth = "max-w-lg",
}: ModalProps) => {
	const generatedId = useId();
	const titleId = `modal-title-${generatedId}`;
	const descriptionId = `modal-desc-${generatedId}`;

	const panelRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const previouslyFocusedRef = useRef<HTMLElement | null>(null);

	const [isRendered, setIsRendered] = useState(open);
	const [isVisible, setIsVisible] = useState(false);

	// Keep the modal mounted long enough for its exit transition.
	useEffect(() => {
		if (open) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setIsRendered(true);

			const frame = window.requestAnimationFrame(() => {
				setIsVisible(true);
			});

			return () => window.cancelAnimationFrame(frame);
		}

		setIsVisible(false);

		if (!isRendered) return;

		const timeout = window.setTimeout(() => {
			setIsRendered(false);
		}, MODAL_TRANSITION_MS);

		return () => window.clearTimeout(timeout);
	}, [open, isRendered]);

	// Lock page scrolling, manage focus, and handle keyboard interactions.
	useEffect(() => {
		if (!open) return;

		previouslyFocusedRef.current =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const focusFrame = window.requestAnimationFrame(() => {
			const initialTarget =
				closeButtonRef.current ??
				panelRef.current?.querySelector<HTMLElement>(
					'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
				);

			(initialTarget ?? panelRef.current)?.focus();
		});

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				onClose();
				return;
			}

			if (event.key !== "Tab" || !panelRef.current) return;

			const focusable = Array.from(
				panelRef.current.querySelectorAll<HTMLElement>(
					'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
				),
			).filter(element => element.getClientRects().length > 0);

			if (!focusable.length) {
				event.preventDefault();
				panelRef.current.focus();
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			window.cancelAnimationFrame(focusFrame);
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleKeyDown);

			previouslyFocusedRef.current?.focus();
		};
	}, [open, onClose]);

	if (!isRendered) return null;

	return createPortal(
		<div
			className={[
				"fixed inset-0 z-[100] flex items-center justify-center p-4",
				"transition-[visibility] duration-200",
				isVisible ? "visible" : "invisible",
			].join(" ")}
			aria-hidden={!open}>
			{/* Backdrop */}
			<button
				type="button"
				tabIndex={open ? 0 : -1}
				aria-label="Close dialog"
				onClick={onClose}
				className={[
					"absolute inset-0 cursor-default",
					"transition-[opacity,backdrop-filter] duration-200 ease-out",
					isVisible ? "opacity-100" : "opacity-0",
				].join(" ")}
				style={{
					background: "rgba(0,0,0,0.58)",
					backdropFilter: isVisible ? "blur(5px)" : "blur(0px)",
					WebkitBackdropFilter: isVisible ? "blur(5px)" : "blur(0px)",
				}}
			/>

			{/* Panel */}
			<div
				ref={panelRef}
				role="dialog"
				aria-modal={open ? "true" : undefined}
				aria-labelledby={title ? titleId : undefined}
				aria-describedby={description ? descriptionId : undefined}
				tabIndex={-1}
				className={[
					"relative w-full rounded-3xl p-6 shadow-2xl",
					"transition-[opacity,transform] duration-[220ms] ease-out",
					isVisible
						? "translate-y-0 scale-100 opacity-100"
						: "translate-y-4 scale-[0.98] opacity-0",
					maxWidth,
				].join(" ")}
				style={{
					background: "var(--color-bg-surface)",
					border: "1px solid var(--color-border)",
					boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
				}}>
				{title && (
					<div className="mb-5 flex items-center justify-between gap-4">
						<h2
							id={titleId}
							className="text-xl font-extrabold"
							style={{ color: "var(--color-text-primary)" }}>
							{title}
						</h2>

						<button
							ref={closeButtonRef}
							type="button"
							onClick={onClose}
							aria-label="Close dialog"
							tabIndex={open ? 0 : -1}
							className="shrink-0 rounded-xl p-2 transition-[background-color,color,transform] duration-200 hover:rotate-90 hover:bg-[var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]"
							style={{ color: "var(--color-text-muted)" }}>
							<X size={20} />
						</button>
					</div>
				)}

				{description && (
					<p id={descriptionId} className="sr-only">
						{description}
					</p>
				)}

				{children}
			</div>
		</div>,
		document.body,
	);
};

// ─── EmptyState ──────────────────────────────────────────────────────────────

export const EmptyState = ({
	icon,
	title,
	description,
	action,
}: {
	icon: React.ReactNode;
	title: string;
	description?: string;
	action?: React.ReactNode;
}) => (
	<div
		className="group flex flex-col items-center justify-center rounded-3xl px-6 py-16 text-center transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-md"
		style={{
			background: "var(--color-bg-surface)",
			border: "1px solid var(--color-border)",
		}}>
		<div
			className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
			style={{
				background: "rgba(0,201,133,0.1)",
				color: "var(--color-brand-primary)",
			}}
			aria-hidden>
			{icon}
		</div>

		<h3
			className="mb-2 text-lg font-extrabold"
			style={{ color: "var(--color-text-primary)" }}>
			{title}
		</h3>

		{description && (
			<p
				className="mb-6 max-w-xs text-sm"
				style={{ color: "var(--color-text-secondary)" }}>
				{description}
			</p>
		)}

		{action}
	</div>
);

// ─── Spinner ─────────────────────────────────────────────────────────────────

export const Spinner = ({
	size = 24,
	className = "",
}: {
	size?: number;
	className?: string;
}) => (
	<Loader2
		size={size}
		className={`animate-spin ${className}`}
		style={{ color: "var(--color-brand-primary)" }}
		aria-label="Loading"
		role="status"
	/>
);

// ─── PageLoader ──────────────────────────────────────────────────────────────

export const PageLoader = () => (
	<div
		role="status"
		aria-label="Loading page"
		className="flex min-h-screen items-center justify-center"
		style={{ background: "var(--color-bg-base)" }}>
		<div className="flex flex-col items-center gap-4">
			<div
				className="flex h-12 w-12 items-center justify-center rounded-2xl"
				style={{
					background: "var(--gradient-brand)",
					boxShadow: "var(--shadow-brand)",
				}}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
					<path
						d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
						fill="white"
					/>
				</svg>
			</div>

			<Spinner size={20} />
		</div>
	</div>
);

// ─── Divider ─────────────────────────────────────────────────────────────────

export const Divider = ({ label }: { label?: string }) =>
	label ? (
		<div className="relative my-6 flex items-center">
			<div
				className="flex-1 border-t"
				style={{ borderColor: "var(--color-border)" }}
			/>

			<span
				className="mx-3 text-xs font-medium"
				style={{ color: "var(--color-text-muted)" }}>
				{label}
			</span>

			<div
				className="flex-1 border-t"
				style={{ borderColor: "var(--color-border)" }}
			/>
		</div>
	) : (
		<hr className="my-4" style={{ borderColor: "var(--color-border)" }} />
	);
