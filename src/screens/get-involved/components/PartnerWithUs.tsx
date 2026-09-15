import { Controller, useForm } from "react-hook-form";
import getInvolvedForm1 from "../../../assets/images/getInvolvedForm1.png";
import PrimaryBtn from "../../../components/button";
import TextInput from "../../../components/inputs/myinput";
import { useApiCall } from "../../../data/useFetcher";

const PartnerWithUs = () => {
	type FormType = {
		nameOfOrganisation: string;
		message: string;
		email: string;
		telephone: string;
		organizationType: string;
		areaOfPartnership: string;
	};
	const def = {
			email: "",
			nameOfOrganisation: "",
			organizationType: "",
			telephone: "",
			areaOfPartnership: "",
			message: "",
		},
		{
			control,
			handleSubmit,
			formState: { errors },
			reset,
		} = useForm({
			defaultValues: def,
		});

	const { loading, onSubmitAPI } = useApiCall(),
		onSubmit = async (data: FormType) => {
			await onSubmitAPI({
				url: "/api/v1/support/partner-with-us",
				type: "post",
				data,
				setResponse: () => {
					reset(def);
				},
			});
		};

	return (
		<div className=" px-10 md:px-40 py-10 md:py-24 relative">
			<div className="grid items-end gap-8">
				<div className="w-full md:max-w-xl m-h-16 md:min-h-24">
					<div className="flex flex-col">
						<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
							Partner with us
						</h1>
						<p className="text-[#3A3A3A] text-[16px]">
							We believe lasting change happens through collaboration. Partner
							with Green Bridge on sustainability programs, community projects,
							or educational initiatives — together, we can reach farther.
						</p>
					</div>
				</div>
			</div>
			<div className="pt-10">
				<div className="grid md:grid-cols-4 rounded-4xl">
					<div className="rounded-t-4xl md:rounded-t-none md:rounded-l-4xl h-full min-h-64 md:min-h-80">
						{/* Actual image - covers the entire container */}
						<img
							src={getInvolvedForm1}
							alt={"Partner with us"}
							className=" w-full h-full object-cover rounded-t-4xl md:rounded-t-none md:rounded-l-4xl"
						/>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className=" md:col-span-3 border-2 border-[#D2D2D2] rounded-b-4xl md:rounded-b-none md:rounded-r-4xl md:rounded-br-4xl bg-[#D4E8DD] p-8 md:p-12">
						<h1 className="text-[#1A1A1A] font-bold text-[32px] py-1">
							Partnership Request Form
						</h1>
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-4">
								<div>
									<Controller
										name="nameOfOrganisation"
										control={control}
										rules={{
											required: "This field is required",
										}}
										render={({ field: { value, onChange, name } }) => (
											<TextInput
												value={value}
												onChange={onChange}
												placeholder="Your organization name"
												name={name}
												label="Organization/Individual Name"
												className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2"
												labelColor="#fff"
											/>
										)}
									/>
									{errors.nameOfOrganisation && (
										<p className="text-[#dc2626] text-xs">
											{errors.nameOfOrganisation.message}
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
												className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2"
												labelColor="#fff"
											/>
										)}
									/>
									{errors.email && (
										<p className="text-[#dc2626] text-xs">
											{errors.email.message}
										</p>
									)}
								</div>
								<div>
									<Controller
										name="telephone"
										control={control}
										rules={{
											required: "This field is required",
										}}
										render={({ field: { value, onChange, name } }) => (
											<TextInput
												value={value}
												onChange={onChange}
												placeholder="Your Mobile number"
												name={name}
												label="Phone Number"
												type="tel"
												className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2"
												labelColor="#fff"
											/>
										)}
									/>
									{errors.telephone && (
										<p className="text-[#dc2626] text-xs">
											{errors.telephone.message}
										</p>
									)}
								</div>
								<div>
									<Controller
										name="organizationType"
										control={control}
										rules={{
											required: "This field is required",
										}}
										render={({ field: { value, onChange, name } }) => (
											<TextInput
												value={value}
												onChange={onChange}
												placeholder="Your Organization Type"
												name={name}
												label="Organization Type"
												className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2"
												labelColor="#fff"
											/>
										)}
									/>
									{errors.organizationType && (
										<p className="text-[#dc2626] text-xs">
											{errors.organizationType.message}
										</p>
									)}
								</div>
							</div>
							<div className="space-y-4">
								<div>
									<Controller
										name="areaOfPartnership"
										control={control}
										rules={{
											required: "This field is required",
										}}
										render={({ field: { value, onChange, name } }) => (
											<TextInput
												value={value}
												onChange={onChange}
												placeholder="Area of Partnership"
												name={name}
												label="Area of Partnership"
												className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2"
												labelColor="#fff"
											/>
										)}
									/>
									{errors.areaOfPartnership && (
										<p className="text-[#dc2626] text-xs">
											{errors.areaOfPartnership.message}
										</p>
									)}
								</div>
								<div>
									<Controller
										name="message"
										control={control}
										rules={{
											required: "This field is required",
										}}
										render={({ field: { value, onChange, name } }) => (
											<TextInput
												className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2 placeholder::text-[#3A3A3A] min-h-40 md:min-h-60"
												value={value}
												onChange={onChange}
												placeholder="Message/Proposal..."
												name={name}
												label="Message"
												type="textarea"
												labelColor="#fff"
											/>
										)}
									/>
									{errors.message && (
										<p className="text-[#dc2626] text-xs">
											{errors.message.message}
										</p>
									)}
								</div>
							</div>
						</div>
						<div className="pt-6">
							<PrimaryBtn
								disabled={!!loading}
								loading={!!loading}
								width="w"
								text="Submit Partnership Request"
								className="bg-[#2A8C56] py-3 text-white rounded-2xl min-h-12 px-10 hover:scale-105"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PartnerWithUs;
