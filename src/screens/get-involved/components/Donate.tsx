import { Controller, useForm } from "react-hook-form";
import PrimaryBtn from "../../../components/button";
import TextInput from "../../../components/inputs/myinput";
import Checkbox from "@mui/material/Checkbox";
import { nairaSignNeutral, useApiCall } from "../../../data/useFetcher";
import { toast } from "react-toastify";

const Donate = () => {
	return (
		<div className=" px-10 md:px-40 py-10 md:py-24 bg-[#D4E8DD]">
			<div className="grid items-end gap-8">
				<div className="w-full md:max-w-xl m-h-16 md:min-h-24">
					<div className="flex flex-col">
						<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
							Donate
						</h1>
						<p className="text-[#3A3A3A] text-[16px]">
							Every donation — no matter the size — helps power our education
							programs, sustainability projects, and community outreach efforts.
							Choose a project that speaks to your heart and give today.
						</p>
					</div>
				</div>
			</div>
			<div className="pt-10">
				<div className="grid md:grid-cols-4 rounded-4xl">
					<div className="border-2 border-[#D2D2D2] bg-white p-8 md:p-12   rounded-t-4xl md:rounded-t-none md:rounded-l-4xl md:col-span-3">
						<h1 className="text-[#1A1A1A] font-bold text-[32px] py-1">
							Make A General Donation
						</h1>
						<GeneralDonation />
					</div>
					<div className="rounded-b-4xl md:rounded-b-none md:rounded-r-4xl md:rounded-br-4xl h-full min-h-64 md:min-h-80 bg-[#1C5D39] p-4 md:p-8 text-white">
						<h1 className=" font-bold text-[30px] py-1">
							Want to support a specific cause like Send a Child to School or
							Electrify a Neighborhood?
						</h1>
						<p className="text-[14px]">
							Visit our Programs Page to choose the cause that speaks to your
							heart and make an impact where it matters most.
						</p>
						<div className="pt-6">
							<PrimaryBtn
								// disabled={!!loading}
								// loading={!!loading}
								width="w"
								text="Program Page"
								className="text-[#2A8C56] py-3 bg-white rounded-2xl min-h-12 px-10 hover:scale-105 font-bold"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Donate;

export const GeneralDonation = ({
	isSpecific,
	onClose,
}: {
	isSpecific?: any;
	onClose?: () => void;
}) => {
	type FormType = {
		email: string;
		fullname: string;
		amount: number;
		isAnonymous: boolean;
	};
	const def = {
			email: "",
			fullname: "",
			amount: 0,
			isAnonymous: false,
		},
		{
			control,
			handleSubmit,
			formState: { errors },
			setValue,
			watch,
			reset,
		} = useForm({
			defaultValues: def,
		}),
		amounts = [50000, 100000, 250000, 500000, 1000000, 2000000],
		thisAmount = watch("amount");

	const { loading, onSubmitAPI } = useApiCall(),
		onSubmit = async (data: FormType) => {
			let newData: FormType | any = {
				...data,
				nextScreen: `${window.location.origin}/confirmation/donation`,
			};
			if (isSpecific) newData.program = isSpecific?._id;
			else newData.isGeneral = true;

			if (!isSpecific) return toast.info("Implementation in progress");
			if (isSpecific)
				if (!isSpecific?._id) return toast.info("Implementation in progress");

			await onSubmitAPI({
				url: isSpecific
					? `/api/v1/payment/initialize/program`
					: `/api/v1/payment/initialize/general`,
				type: "put",
				data: newData,
				setResponse: (d: any) => {
					let newD = d?.data || d;
					console.log({ newD });
					setTimeout(() => {
						window.open(newD?.authorization_url, "_blank");
					}, 1500);
					reset(def);
					if (onClose) onClose();
				},
			});
		};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid gap-4 md:grid-cols-3 space-4">
					<div>
						<Controller
							name="fullname"
							control={control}
							rules={{
								required: "This field is required",
							}}
							render={({ field: { value, onChange, name } }) => (
								<TextInput
									value={value}
									onChange={onChange}
									placeholder="Your First name"
									name={name}
									label="First Name"
									className="bg-white py-4 w-full text-[#3A3A3A] px-2  rounded-lg border border-gray-100"
									labelColor="#fff"
								/>
							)}
						/>
						{errors.fullname && (
							<p className="text-[#dc2626] text-xs">
								{errors.fullname.message}
							</p>
						)}
					</div>
					<div>
						<Controller
							name="email"
							control={control}
							rules={{
								required: "This field is required",
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: "Invalid email format",
								},
							}}
							render={({ field: { value, onChange, name } }) => (
								<TextInput
									value={value}
									onChange={onChange}
									placeholder="Your email"
									name={name}
									label="Email Address"
									type="email"
									className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2 border border-gray-100"
									labelColor="#fff"
								/>
							)}
						/>
						{errors.email && (
							<p className="text-[#dc2626] text-xs">{errors.email.message}</p>
						)}
					</div>
					<div>
						<Controller
							name="isAnonymous"
							control={control}
							rules={{}}
							render={({ field: { value, onChange, name } }) => (
								<>
									<div className="">
										<label
											className="block text-sm font-medium text-gray-700 mb-2"
											htmlFor={name}>
											Anonymously
										</label>
										<div className="flex items-center  border border-gray-100 border-dashed py-2 rounded-lg">
											<Checkbox checked={value} onChange={onChange} />
											<span className=" capitalize">Donate Anonymously</span>
										</div>
									</div>
								</>
							)}
						/>
						{errors.isAnonymous && (
							<p className="text-[#dc2626] text-xs">
								{errors.isAnonymous.message}
							</p>
						)}
					</div>
				</div>
				<div className="">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Select Amount (NGN)
					</label>
					<div className="grid gap-4 grid-cols-2 md:grid-cols-3 space-4">
						{amounts?.map((amount, adx) => (
							<PrimaryBtn
								text={`${nairaSignNeutral}${amount.toLocaleString()}`}
								key={adx}
								className={`py-3 rounded-xl min-h-12 hover:scale-105 text-[12px] md:text-lg px-1 md:px-5 font-bold border ${
									thisAmount === amount
										? "text-[#2A8C56] bg-[#e7f8ee]"
										: "text-black border-[#D2D2D2] bg-gray-100"
								} duration-500`}
								onClick={() => setValue("amount", amount)}
								type="button"
							/>
						))}
					</div>
				</div>
				<div>
					<Controller
						name="amount"
						control={control}
						rules={{
							required: "This field is required",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email format",
							},
						}}
						render={({ field: { value, onChange, name } }) => (
							<TextInput
								value={value}
								onChange={onChange}
								placeholder="N5,000,000.00"
								name={name}
								label="Custom Amount"
								type="number"
								className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2 border border-gray-100"
								labelColor="#fff"
							/>
						)}
					/>
					{errors.amount && (
						<p className="text-[#dc2626] text-xs">{errors.amount.message}</p>
					)}
				</div>
				<div className="bg-[#FAF8B3] p-4 md:p-8 rounded-xl">
					<div className="grid md:grid-cols-4 gap-2 items-start">
						<h1 className="text-[#1A1A1A] font-bold text-[16px] py-1">
							Secure Payment:
						</h1>
						<p className="text-[#3A3A3A] text-[14px] md:col-span-3">
							Donations are processed securely through Paystack. You’ll be
							redirected to complete your payment.
						</p>
					</div>
				</div>
				<div className="pt-6">
					<PrimaryBtn
						disabled={!!loading}
						loading={!!loading}
						width="w"
						text="Proceed to Payment"
						className="bg-[#2A8C56] py-3 text-white rounded-2xl min-h-12 px-10 hover:scale-105"
					/>
				</div>
			</form>
		</>
	);
};