/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import React from "react";
import { NumericFormat } from "react-number-format";
import PhoneInput from "react-phone-number-input/input";
import { toast } from "react-toastify";

export interface InputProps {
	footer?: string;
	label?: string;
	bg?: string;
	name?: string;
	setState?: (e: any) => void;
	onChange?: (e: any) => void;
	// onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | ((e:any)=> void);
	placeholder?: string;
	value?: any;
	readOnly?: boolean;
	noFormat?: boolean;
	percentage?: boolean;
	allowLeadingZeros?: boolean;
	type?: string;
	options?: any[];
	prefixType?: string;
	style?: object;
	className?: string;
	disabled?: boolean;
	required?: boolean;
	maxLength?: number;
	allowedTypes?: string[];
	accept?: string;
	span?: () => void;
	max?: any;
	id?: string;
	checked?: boolean;
	list?: string;
	dataList?: any[];
	min?: any;
	labelColor?: string;
}

const TextInput: React.FC<InputProps> = ({
	name,
	label,
	placeholder,
	onChange,
	value,
	type,
	options,
	required,
	disabled,
	className,
	style,
	...restProps
}) => {
	return (
		<div className="form-group">
			<label
				className={`block text-sm font-medium ${
					restProps?.labelColor
						? `text-[${restProps?.labelColor}]`
						: "text-gray-700"
				} mb-2`}
				htmlFor={name}>
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</label>
			{type === "textarea" ? (
				<textarea
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					style={style}
					className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className} resize-none min-h-24`}
					{...restProps}
				/>
			) : type === "select" ? (
				<select
					name={name}
					value={value}
					onChange={onChange}
					required={required}
					disabled={disabled || restProps?.readOnly}
					style={style}
					className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}>
					{placeholder && <option value="">{placeholder}</option>}
					{options?.map(opt => (
						<option key={opt?.value} className="capitalize" value={opt?.value}>
							{opt?.label}
						</option>
					))}
				</select>
			) : type === "number" ? (
				<>
					<NumericFormat
						required={required}
						disabled={disabled}
						style={style}
						className={`${
							className || ""
						} w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400 placeholder:text-sm outline-none outline-0`}
						value={value}
						displayType="input"
						thousandSeparator={!restProps?.allowLeadingZeros}
						// onValueChange={onChange}
						onValueChange={val => {
							if (onChange)
								onChange({
									target: {
										value: restProps?.allowLeadingZeros
											? val?.value
											: val?.floatValue,
										name,
									},
								});
						}}
						min={0}
						maxLength={restProps?.maxLength}
						inputMode="decimal"
						renderText={value => <span>{value}</span>}
						allowNegative={false}
						allowLeadingZeros={restProps?.allowLeadingZeros}
						prefix={
							restProps?.noFormat
								? ""
								: !restProps?.percentage
								? `${restProps?.prefixType || "₦"} `
								: ""
						}
						suffix={
							restProps?.noFormat
								? ""
								: restProps?.percentage
								? ` ${restProps?.prefixType || "%"} `
								: ""
						}
						placeholder={placeholder}
						readOnly={restProps?.readOnly}
					/>
				</>
			) : type === "tel" ? (
				<>
					<PhoneInput
						placeholder={placeholder}
						value={value}
						onChange={val => {
							if (onChange)
								onChange({
									target: {
										value: val,
										name,
									},
								});
						}}
						required={required}
						disabled={disabled}
						style={style}
						className={
							className ||
							"outline-none outline-0 border rounded-md h-10 border-[#00094133] px-4 w-full placeholder:text-gray-400 placeholder:text-sm min-w-24"
						}
						limitMaxLength={true}
						name={name}
					/>
				</>
			) : (
				<input
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					style={style}
					className={` ${
						className ||
						"border border-[#EFF3FA] w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
					}`}
					{...restProps}
				/>
			)}
			{restProps?.dataList &&
			restProps?.dataList?.length > 0 &&
			restProps?.list ? (
				<>
					<small className="tw-block tw-text-xs tw-text-secondary">
						Please select from the available dropdown option that'll appear as
						you type{" "}
					</small>
					<datalist id={restProps?.list}>
						{restProps?.dataList?.map((item, index) => (
							<option
								value={item?.description}
								key={index}
								title={item?.place_id}>
								{item?.description}
							</option>
						))}
					</datalist>
				</>
			) : null}
		</div>
	);
};

interface PasswordInputProps {
	label?: string;
	name: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	showForgotPasswordLink?: boolean;
	onForgotPasswordClick?: () => void;
	className?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
	label,
	name,
	value,
	onChange,
	placeholder,
	required = false,
	disabled = false,
	showForgotPasswordLink = false,
	onForgotPasswordClick,
	className,
}) => {
	const [show, setShow] = useState(false);

	return (
		<div className="form-group">
			<label className="text-sm font-medium text-primary-light">
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</label>
			<div className="relative h-14 w-full">
				<input
					type={show ? "text" : "password"}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					className={` ${
						className ||
						"border border-[#EFF3FA] w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
					}`}
				/>
				<div
					onClick={() => setShow(!show)}
					className="absolute cursor-pointer top-2.5 right-3">
					{show ? <EyeClosed color="#E6ECF3" /> : <Eye color="#E6ECF3" />}
				</div>
			</div>
			{showForgotPasswordLink && (
				<p
					onClick={onForgotPasswordClick}
					className="text-right mt-1 cursor-pointer font-semibold text-primary-light">
					Forgot Password?
				</p>
			)}
		</div>
	);
};

interface SelectInputProps {
	label: string;
	name: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: { label: string; value: string | number }[];
	placeholder?: string;
	className?: string;
	style?: React.CSSProperties;
	required?: boolean;
	disabled?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({
	label,
	name,
	value,
	onChange,
	options,
	placeholder,
	className = "",
	style,
	required = false,
	disabled = false,
}) => {
	return (
		<div className="form-group">
			<label className="text-sm font-medium text-primary-light">
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</label>
			<select
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				disabled={disabled}
				style={{ border: "1px solid #D3DDEA", ...style }}
				className={`h-14 w-full pl-6 rounded-lg capitalize text-sm font-normal text-primary-medium ${className}`}>
				<option value="">{placeholder || "Select"}</option>
				{options.map(opt => (
					<option key={opt.value} className="capitalize" value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default TextInput;

export const FileInput = ({
	name,
	onChange,
	value,
	allowedTypes = ["image"],
	className,
	accept = "image/*,video/*",
	label,
	required,
	style,
	disabled,
	placeholder,
	span,
}: InputProps) => {
	const ref = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		ref.current?.click();
	};

	const handleChangeImage = (e: any) => {
		const file = e?.target.files[0];
		let err = "";
		if (!file) err = `File, ${file?.name} does not exist`;
		if (!allowedTypes.some(type => file.type.includes(type)))
			err = `File, ${file?.name} format not supported`;
		console.log({ err, file });
		if (err) {
			return toast.error(err);
		} else {
			if (onChange) onChange(file);
		}
	};

	return (
		<div className="form-group">
			<label
				htmlFor={name}
				className="block text-sm font-medium text-gray-700 mb-2">
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</label>
			<div
				onClick={e => {
					e?.stopPropagation();
					handleClick();
				}}
				style={!className ? { border: "1px solid #2A8C56", ...style } : style}
				className={`${
					className ||
					"flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-green-300 bg-gray-50 text-gray-500 transition-colors hover:border-[#2A8C56] hover:text-[#2A8C56]"
				} ${value ? "p-5 min-h-40" : ""}`}>
				{value && typeof value !== "string" ? (
					<>
						{value && value?.resource_type?.includes("video") ? (
							<video
								src={
									value?.playback_url && typeof value?.playback_url === "string"
										? value?.playback_url
										: value?.value && typeof value?.secure_url === "string"
										? value?.secure_url
										: URL.createObjectURL(value)
								}
								controls
								className="img-fluid w-full h-full"
								style={{
									objectFit: "contain",
								}}
							/>
						) : value && value?.resource_type?.includes("image") ? (
							<img
								src={
									value?.secure_url && typeof value?.secure_url === "string"
										? value?.secure_url
										: URL.createObjectURL(value)
								}
								alt="Course"
								className="img-fluid w-full h-full"
								style={{
									objectFit: "contain",
								}}
							/>
						) : (
							<>
								{span ? span() : <></>}
								<span className="mt-2 text-base">{value?.name}</span>
							</>
						)}
					</>
				) : (
					<>
						{span ? span() : <></>}
						<span className="mt-2 text-base">
							{span ? <></> : placeholder || `Upload image or video`}
						</span>
					</>
				)}
				<input
					type="file"
					title="Upload file"
					id="file"
					name={name}
					onChange={handleChangeImage}
					ref={ref}
					className="hidden"
					accept={accept}
					required={required}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

interface Option {
	label: string;
	value: string;
}

interface MultiSelectDropdownProps {
	options?: Option[];
	placeholder?: string;
	className?: string;
	onChange?: (selected: string[] | string) => void;
	label?: string;
	defaultValue?: string[] | string;
	defaultType?: "checkbox" | "radio";
	isOthersAddable?: boolean;
	required?: boolean;
	innerClassName?: string;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
	options: initialOptions = [],
	placeholder = "Select options",
	className = "",
	onChange,
	label,
	defaultValue = [],
	defaultType = "checkbox",
	isOthersAddable,
	innerClassName,
	required,
}) => {
	type selectType = string[] | string;
	const [options, setOptions] = useState<Option[]>(initialOptions);
	const [selectedValues, setSelectedValues] =
		useState<selectType>(defaultValue);
	const [isOpen, setIsOpen] = useState(false);
	// const [inputValue, setInputValue] = useState(""); // NEW
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [showOthersInput, setShowOthersInput] = useState(false);
	const [othersValue, setOthersValue] = useState("");
	const othersInputRef = useRef<HTMLLIElement | null>(null);

	useEffect(() => {
		if (showOthersInput && othersInputRef.current) {
			othersInputRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}, [showOthersInput]);

	const handleSelect = (value: string) => {
		if (value === "__others__") {
			setShowOthersInput(true);
			return;
		}
		setShowOthersInput(false);

		if (defaultType === "radio") {
			setSelectedValues(value);
		} else {
			setSelectedValues(prev =>
				(prev as string[]).includes(value)
					? (prev as string[]).filter(item => item !== value)
					: [...(prev as string[]), value]
			);
		}
	};

	const handleAddOthersOption = () => {
		const trimmed = othersValue.trim();
		if (!trimmed) return;

		if (!options.find(opt => opt.value === trimmed)) {
			const newOption = { label: trimmed, value: trimmed };
			setOptions(prev => [...prev, newOption]);
		}

		handleSelect(trimmed);
		setOthersValue("");
		setShowOthersInput(false);
	};

	useEffect(() => {
		onChange?.(selectedValues);
	}, [selectedValues]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const mergedOptions = [
		...options,
		...(Array.isArray(selectedValues) ? selectedValues : [selectedValues])
			.filter(val => !options.some(opt => opt.value === val))
			.map(val => ({ label: val, value: val })),
	];

	console.log({ selectedValues, defaultValue });

	return (
		<div className={`relative w-full ${className}`} ref={dropdownRef}>
			{label && (
				<label className="text-sm font-medium text-primary-light">
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}
			<div
				className={`w-full p-3 ${
					innerClassName || "mt-2 border border-gray-200"
				} shadow-sm rounded-lg flex justify-between items-center cursor-pointer bg-white`}
				onClick={() => setIsOpen(!isOpen)}>
				<span className="truncate">
					{defaultType === "checkbox"
						? (selectedValues as string[]).join(", ") || placeholder
						: selectedValues || placeholder}
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className={`w-5 h-5 transition-transform ${
						isOpen ? "rotate-180" : "rotate-0"
					}`}
					viewBox="0 0 20 20"
					fill="currentColor">
					<path
						fillRule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</div>

			{isOpen && (
				<div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
					<ul className="max-h-48 overflow-y-auto p-2 space-y-2">
						{mergedOptions.length > 0 ? (
							mergedOptions.map(option => (
								<li key={option.value} className="flex items-center space-x-2">
									<input
										type={defaultType}
										id={option.value}
										value={option.value}
										checked={
											defaultType === "radio"
												? selectedValues === option.value
												: (selectedValues as string[]).includes(option.value)
										}
										onChange={() => {
											handleSelect(option.value);
											if (defaultType === "radio") setIsOpen(!isOpen);
										}}
										className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
									/>
									<label
										htmlFor={option.value}
										className="text-gray-800 cursor-pointer">
										{option.label}
									</label>
								</li>
							))
						) : (
							<li className="text-gray-500 p-2 text-center">
								No options available
							</li>
						)}
						{isOthersAddable && (
							<>
								{/* Others Option */}
								<li className="flex items-center space-x-2">
									<input
										type={defaultType}
										id="__others__"
										value="__others__"
										checked={showOthersInput}
										onChange={() => handleSelect("__others__")}
										className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
									/>
									<label
										htmlFor="__others__"
										className="text-gray-800 cursor-pointer">
										Others
									</label>
								</li>

								{showOthersInput && (
									<li className="p-1" ref={othersInputRef}>
										<input
											type="text"
											value={othersValue}
											onChange={e => setOthersValue(e.target.value)}
											onKeyDown={e => {
												if (e.key === "Enter") {
													e.preventDefault();
													handleAddOthersOption();
												}
											}}
											placeholder="Type and press Enter"
											className="w-full p-2 text-sm border border-gray-300 rounded"
										/>
									</li>
								)}
							</>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};
