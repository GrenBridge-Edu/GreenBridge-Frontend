import { Controller, useForm } from "react-hook-form";
import getInvolvedForm1 from "../../../assets/images/getInvolvedForm1.png";
import PrimaryBtn from "../../../components/button";
import TextInput from "../../../components/inputs/myinput";
import { useApiCall } from "../../../data/useFetcher";

const JoinOurTeam = () => {
	type FormType = {
		firstName: string;
		coverLetter: string;
		email: string;
		telephone: string;
		lastName: string;
		positionOfInterest: string;
	};
	const def = {
			email: "",
			firstName: "",
			lastName: "",
			telephone: "",
			positionOfInterest: "",
			coverLetter: "",
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
				url: "/api/v1/support/join-our-team",
				type: "post",
				data,
				setResponse: () => {
					reset(def);
				},
			});
		};

	return (
		<div className=" px-10 md:px-40 py-10 md:py-24 relative">
			<div className="grid md:grid-cols-2 items-end gap-8">
				<div className=" md:absolute md:right-5 md:-top-20 md:z-35">
					<div className="w-full md:max-w-xl m-h-16 md:min-h-24">
						<span className="hidden md:flex" />
						<div className="flex flex-col">
							<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
								Join our team
							</h1>
							<p className="text-[#3A3A3A] text-[16px]">
								Use your skills, passion, and creativity to make a difference.
								Whether in outreach, media, logistics, or teaching, your
								contribution helps us reach more lives.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="pt-10">
				<div className="grid md:grid-cols-4 rounded-4xl">
					<div className="rounded-t-4xl md:rounded-t-none md:rounded-l-4xl h-full min-h-64 md:min-h-80">
						{/* Actual image - covers the entire container */}
						<img
							src={getInvolvedForm1}
							alt={"Join Our Team"}
							className=" w-full h-full object-cover rounded-t-4xl md:rounded-t-none md:rounded-l-4xl"
						/>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className=" md:col-span-3 border-2 border-[#D2D2D2] rounded-b-4xl md:rounded-b-none md:rounded-r-4xl md:rounded-br-4xl bg-[#D4E8DD] p-8 md:p-12">
						<h1 className="text-[#1A1A1A] font-bold text-[32px] py-1">
							Submit your application
						</h1>
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-4">
								<div>
									<Controller
										name="firstName"
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
												className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2"
												labelColor="#fff"
											/>
										)}
									/>
									{errors.firstName && (
										<p className="text-[#dc2626] text-xs">
											{errors.firstName.message}
										</p>
									)}
								</div>
								<div>
									<Controller
										name="lastName"
										control={control}
										rules={{
											required: "This field is required",
										}}
										render={({ field: { value, onChange, name } }) => (
											<TextInput
												value={value}
												onChange={onChange}
												placeholder="Your Last name"
												name={name}
												label="Last Name"
												className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2"
												labelColor="#fff"
											/>
										)}
									/>
									{errors.lastName && (
										<p className="text-[#dc2626] text-xs">
											{errors.lastName.message}
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
							</div>
							<div className="space-y-4">
								<div>
									<Controller
										name="positionOfInterest"
										control={control}
										rules={{
											required: "This field is required",
										}}
										render={({ field: { value, onChange, name } }) => (
											<TextInput
												value={value}
												onChange={onChange}
												placeholder="Select Position of interest"
												name={name}
												label="Position Of Interest"
												type="select"
												className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2"
												labelColor="#fff"
												options={[
													"Education & Taining",
													"Sustainability and Environment",
													"Media & Communications",
													"Project & Field Operations",
													"Technology & Innovation",
												]?.map(it => {
													return {
														value: it,
														label: it,
													};
												})}
											/>
										)}
									/>
									{errors.positionOfInterest && (
										<p className="text-[#dc2626] text-xs">
											{errors.positionOfInterest.message}
										</p>
									)}
								</div>
								<div>
									<Controller
										name="coverLetter"
										control={control}
										rules={{
											required: "This field is required",
										}}
										render={({ field: { value, onChange, name } }) => (
											<TextInput
												className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2 placeholder::text-[#3A3A3A] min-h-40 md:min-h-60"
												value={value}
												onChange={onChange}
												placeholder="Why would you like to join us..."
												name={name}
												label="Cover Letter"
												type="textarea"
												labelColor="#fff"
											/>
										)}
									/>
									{errors.coverLetter && (
										<p className="text-[#dc2626] text-xs">
											{errors.coverLetter.message}
										</p>
									)}
								</div>
							</div>
						</div>
						<div className="mt-6">
							<PrimaryBtn
								disabled={!!loading}
								loading={!!loading}
								width="w"
								text="Send Application"
								className="bg-[#2A8C56] py-3 text-white rounded-2xl min-h-12 px-10 hover:scale-105"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default JoinOurTeam;
