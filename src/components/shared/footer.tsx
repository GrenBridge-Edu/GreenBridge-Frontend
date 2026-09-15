import {
	BsFacebook,
	BsInstagram,
	BsLinkedin,
	BsTwitterX,
	BsYoutube,
} from "react-icons/bs";
import { motion } from "framer-motion";
import Logo from "../logo";
import { links } from "./header";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import PrimaryBtn from "../button";
import TextInput from "../inputs/myinput";
import { useApiCall } from "../../data/useFetcher";

export default function Footer({ isContact = false }: { isContact?: boolean }) {
	return (
		<motion.footer
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
			transition={{ staggerChildren: 0.3 }}>
			{!isContact && <FooterNewsLetter />}
			<div className="p-3 md:p-6">
				<FooterQuickLinks />
				<LastFooterLine />
			</div>
		</motion.footer>
	);
}

// const fadeInUp = {
// 	hidden: { opacity: 0, y: 30 },
// 	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

const LastFooterLine = () => {
	return (
		<motion.div
			// variants={fadeInUp}
			className="flex justify-between flex-col md:flex-row items-center px-10 md:px-20 py-3 md:py-6 text-gray-500 gap-y-8 text-center md:text-left md:gap-0 border-t-2">
			<span>
				&copy; {new Date().getFullYear()} Green Bridge. All right reserved.
			</span>
			<span className="flex items-center gap-5">
				<a href="#terms-of-service">Terms of Service</a>
				<a href="#privacy-policy">Privacy Policy</a>
			</span>
		</motion.div>
	);
};

const FooterQuickLinks = () => {
	const contactInfo = [
			{ name: "Address", value: "23 Agric, Ikorodu, Lagos." },
			{ name: "Telephone", value: "+234 000 0000 00" },
			{ name: "Email", value: "info@greenbridge.com" },
		],
		socialLinks = [
			{ name: "LinkedIn", value: "", icon: <BsLinkedin color="#3A3A3A" /> },
			{ name: "Facebook", value: "", icon: <BsFacebook color="#3A3A3A" /> },
			{ name: "Instagram", value: "", icon: <BsInstagram color="#3A3A3A" /> },
			{ name: "Twitter(X)", value: "", icon: <BsTwitterX color="#3A3A3A" /> },
			{ name: "Youtube", value: "", icon: <BsYoutube color="#3A3A3A" /> },
		];
	return (
		<motion.div
			// variants={fadeInUp}
			className="grid grid-cols-2 md:grid-cols-4 items-start px-10 md:px-20 py-5 md:py-10 text-gray-500 gap-5">
			<div className=" col-span-2 md:col-span-1">
				<Logo height={"h-15 w-42"} />
				<p className="mulish italic text-[#3A3A3A]">
					Green Bridge is a non-profit organization promoting sustainable
					development through quality education, innovation, and community
					empowerment.
				</p>
			</div>
			<div className="space-y-4">
				<h3 className="mulish font-bold text-md text-[#3A3A3A] lg:text-xl">
					Quick Links
				</h3>
				<ul className="space-y-4">
					{links?.map((link, ldx) => (
						<li className="mulish text-[#3A3A3A]" key={ldx} title={link?.name}>
							{link?.name}
						</li>
					))}
				</ul>
			</div>
			<div className="space-y-4">
				<h3 className="mulish font-bold text-md text-[#3A3A3A] lg:text-xl">
					Contact
				</h3>
				<ul className="space-y-4">
					{contactInfo?.map((contact, cdx) => (
						<li
							className="mulish text-[#3A3A3A]"
							key={cdx}
							title={contact?.name}>
							{contact?.value}
						</li>
					))}
				</ul>
			</div>
			<div className=" col-span-2 md:col-span-1 space-y-4">
				<h3 className="mulish font-bold text-md text-[#3A3A3A] lg:text-xl">
					Social Links
				</h3>
				<div className="flex items-center gap-3 pb-3">
					{socialLinks?.map((social, sdx) => (
						<IconButton className="" title={social?.name} key={sdx}>
							{social?.icon}
						</IconButton>
					))}
				</div>
				<Link
					to={"/donate"}
					className={`w-auto max-w-xs rounded-xl py-3 text-lg font-semibold bg-[#2A8C56] text-white shadow-sm hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 px-8 hover:scale-105 transition`}>
					Make a donation
				</Link>
			</div>
		</motion.div>
	);
};

export const FooterNewsLetter = () => {
	type FormType = {
		fullname: string;
		message: string;
		email: string;
	};
	const def = {
			email: "",
			fullname: "",
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
				url: "/api/v1/support",
				type: "post",
				data,
				setResponse: () => {
					reset(def);
				},
			});
		};

	return (
		<motion.div
			// variants={fadeInUp}

			className="grid md:grid-cols-2 px-10 md:px-40 py-10 md:py-24 gap-y-10 md:gap-0 bg-[#1C5D39] text-white">
			<div>
				<p className="text-3xl font-bold md:w-2/3">
					Reach Out — Let’s Build a Greener Future Together.
				</p>
				<p className="md:w-1/2 mt-4">
					Have questions, feedback, or partnership ideas? Get in touch with the
					Green Bridge team — we’re always ready to connect. we’re always ready
					to connect. Get in touch with the Green Bridge team — we’re always
					ready to connect. we’re always ready to connect.
				</p>
			</div>
			<div>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid md:grid-cols-2 md:gap-4 space-y-4">
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
								<p className="text-[#dc2626] text-xs">{errors.email.message}</p>
							)}
						</div>
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
							<p className="text-[#dc2626] text-xs">{errors.message.message}</p>
						)}
					</div>

					<div className="mt-6">
						<PrimaryBtn
							disabled={!!loading}
							loading={!!loading}
							width="w"
							text="Send Message"
							className="bg-[#2A8C56] py-3 text-white rounded-2xl min-h-12 px-10 hover:scale-105"
						/>
					</div>
				</form>
			</div>
		</motion.div>
	);
};
