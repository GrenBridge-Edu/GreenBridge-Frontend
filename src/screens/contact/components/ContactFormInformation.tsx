import IconButton from "@mui/material/IconButton";
import { Mail, MapPinHouse, Phone } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import PrimaryBtn from "../../../components/button";
import TextInput from "../../../components/inputs/myinput";
import {
	BsFacebook,
	BsInstagram,
	BsLinkedin,
	BsThreads,
	BsTwitterX,
} from "react-icons/bs";
import { useApiCall } from "../../../data/useFetcher";

const ContactFormInformation = () => {
	const contactDetails = [
		{
			title: "Email",
			value: "greenbridgeforschool@gmail.com",
			icon: Mail,
		},
		{
			title: "Phone",
			value: "+234 903 519 4844",
			icon: Phone,
		},
		{
			title: "Address",
			value: "23 Agric, Ikorodu, Lagos.",
			icon: MapPinHouse,
		},
	];
	type FormType = {
		fullname: string;
		message: string;
		address: string;
		email: string;
	};
	const def = {
			email: "",
			fullname: "",
			message: "",
			address: "",
		},
		{
			control,
			handleSubmit,
			formState: { errors },
			reset,
		} = useForm({
			defaultValues: def,
		}),
		socialLinks = [
			{
				name: "Threads",
				value: "",
				icon: <BsThreads color="#3A3A3A" className="text-3xl md:text-5xl" />,
			},
			{
				name: "Facebook",
				value: "",
				icon: <BsFacebook color="#3A3A3A" className="text-3xl md:text-5xl" />,
			},
			{
				name: "Twitter(X)",
				value: "",
				icon: <BsTwitterX color="#3A3A3A" className="text-3xl md:text-5xl" />,
			},
			{
				name: "Instagram",
				value: "",
				icon: <BsInstagram color="#3A3A3A" className="text-3xl md:text-5xl" />,
			},
			{
				name: "LinkedIn",
				value: "",
				icon: <BsLinkedin color="#3A3A3A" className="text-3xl md:text-5xl" />,
			},
		];

	const { loading, onSubmitAPI } = useApiCall(),
		onSubmit = async (data: FormType) => {
			await onSubmitAPI({
				url: "/api/v1/support",
				type: "post",
				data,
				setResponse: () => {
					reset(def);
				},
			});
		};

	return (
		<div className=" px-10 md:px-40 py-10 md:py-30 relative">
			<div className="grid md:grid-cols-2 items-end gap-8">
				<div className="">
					<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
						Contact Information
					</h1>
					<p className="text-[#3A3A3A] text-[16px]">
						Reach out to our team directly through any of the channels below.
						We’re always happy to connect, collaborate, and answer your
						questions.
					</p>
					<div className="py-4">
						{contactDetails?.map((contact, cdx) => {
							const Icon = contact?.icon;
							return (
								<div className="flex items-start gap-2 pb-4" key={cdx}>
									<div className="border border-dashed border-gray-200 rounded-md">
										<IconButton>
											<Icon color="#2A8C56" />
										</IconButton>
									</div>
									<div className="">
										<h1 className="text-[#1A1A1A] font-bold capitalize text-[18px] py-1">
											{contact?.title}:
										</h1>
										<p className="text-[#3A3A3A] text-[13px]">
											{contact?.value}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className=" md:absolute md:right-5 md:-top-20 md:z-35">
				<div className="w-full md:min-w-xl m-h-60 md:min-h-72 rounded-lg rounded-tl-[80px] bg-[#E1EFE7] p-6 md:p-12 ">
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
						<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
							Contact form
						</h1>
						<div>
							<div className="space-y-4">
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
												placeholder="Firstname LastName(Surname)"
												name={name}
												label="Full Name"
												className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2"
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
										name="address"
										control={control}
										rules={{}}
										render={({ field: { value, onChange, name } }) => (
											<TextInput
												value={value}
												onChange={onChange}
												placeholder="Your home address"
												name={name}
												label="Address"
												className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2"
												labelColor="#fff"
											/>
										)}
									/>
									{errors.address && (
										<p className="text-[#dc2626] text-xs">
											{errors.address.message}
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
												className="bg-white py-4 rounded-lg w-full text-[#3A3A3A] px-2 placeholder::text-[#3A3A3A]"
												value={value}
												onChange={onChange}
												placeholder="Type Your Message here..."
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

								<div className="pt-6">
									<PrimaryBtn
										disabled={!!loading}
										loading={!!loading}
										width="w"
										text="Send Message"
										className="bg-[#2A8C56] py-3 text-white rounded-2xl min-h-12 px-10 hover:scale-105"
									/>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="flex items-center gap-3 py-3 md:absolute md:-bottom-35 md:z-35 md:right-20 text-center mx-auto">
				{socialLinks?.map((social, sdx) => (
					<IconButton className="" title={social?.name} key={sdx}>
						{social?.icon}
					</IconButton>
				))}
			</div>
		</div>
	);
};

export default ContactFormInformation;
