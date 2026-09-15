import { useState } from "react";
import MakeDifference from "../../home/components/MakeDifference";
import { ChevronDown } from "lucide-react";
import faq from "../../../assets/svg/faq.svg";

const FAQs = () => {
	return (
		<div className=" px-10 md:px-40 py-10 md:py-24 bg-[#D4E8DD]">
			<div className="grid items-end gap-8">
				<div className="w-full md:max-w-xl m-h-16 md:min-h-24">
					<div className="flex flex-col">
						<h2 className="text-[#2A8C56] font-bold uppercase text-[16px]">
							faq
						</h2>
						<h1 className="text-[#1A1A1A] font-bold capitalize text-[32px] py-1">
							frequently asked questions
						</h1>
						<p className="text-[#3A3A3A] text-[16px]">
							Got questions about our podiatry services? Here are some quick
							answers to help you understand how we work and what to expect.
						</p>
					</div>
				</div>
			</div>
			<div className="pt-10">
				<div className="grid md:grid-cols-2 gap-10 pb-5">
					<div className="">
						<img
							src={faq}
							alt={"FAQs"}
							className="rounded-2xl min-h-[40vh] object-cover transition-all ease-in-out hover:scale-105 w-full duration-500"
							loading="lazy"
						/>
					</div>
					<FaqAccordion />
				</div>
				<MakeDifference isHome={false} />
			</div>
		</div>
	);
};

export default FAQs;

const faqData = [
	{
		question: "What is Green Bridge all about?",
		answer:
			"Green Bridge is a non-profit organization committed to promoting sustainable development through education, innovation, and community empowerment. We focus on creating lasting change by supporting initiatives that protect the environment and improve access to quality education.",
	},
	{
		question: "How can I get involved with Green Bridge?",
		answer:
			"You can get involved by volunteering, partnering with us on projects, or supporting our ongoing initiatives through donations. Simply visit the “Get Involved” section of our website to see available opportunities.",
	},
	{
		question: "How do I donate to specific projects?",
		answer:
			"Our Donate page allows you to choose from active programs, such as Students to School, GroundUp, or Sustainability Initiatives. You can select a project, view its details, and donate directly through our secure payment gateway (Paystack).",
	},
	{
		question: "Can organizations or schools partner with Green Bridge?",
		answer:
			"Yes! We welcome partnerships with schools, NGOs, and private organizations interested in education, STEM innovation, or sustainable development. Visit our “Partner With Us” page or reach out through the Contact Form to start the conversation.",
	},
	{
		question: "How do I know my donation is being used effectively?",
		answer:
			"Transparency is one of our core values. We provide regular updates, project reports, and media coverage to show how every donation supports real change in the communities we serve.",
	},
];

const FaqAccordion = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="w-full max-w-3xl mx-auto py-12 px-4">
			<div className="space-y-4">
				{faqData.map((item, index) => (
					<div
						key={index}
						className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-700">
						<button
							onClick={() => toggle(index)}
							aria-expanded={openIndex === index}
							aria-controls={`faq-answer-${index}`}
							className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-green-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 bg-[#1C5D39] duration-700">
							<span className="text-xl text-white font-bold">
								{item.question}
							</span>
							<ChevronDown
								className={`w-10 h-10 text-gray-500 transition-transform duration-300 ${
									openIndex === index ? "rotate-180" : ""
								} bg-white rounded-full`}
							/>
						</button>

						<div
							id={`faq-answer-${index}`}
							role="region"
							aria-labelledby={`faq-question-${index}`}
							className={`overflow-hidden transition-all ease-in-out  duration-700 ${
								openIndex === index
									? "max-h-96 opacity-100"
									: "max-h-0 opacity-0"
							}`}>
							<div className="px-6 py-4 bg-gray-50">
								<p className="text-gray-700">{item.answer}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
