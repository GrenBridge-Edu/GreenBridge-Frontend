import { useState } from "react";
import { ChevronDown } from "lucide-react";

import MakeDifference from "../../home/components/MakeDifference";
import Reveal from "../../../components/shared/Reveal";
import faq from "../../../assets/svg/faq.svg";
import { useContactSection } from "../../contact/data/contactContent";

const FAQ_DEFAULTS = {
	eyebrow: "faq",
	title: "frequently asked questions",
	description:
		"Find answers to common questions about Green Bridge, our programs, and how you can get involved.",
	items: [
		{
			question: "What is Green Bridge all about?",
			answer:
				"Green Bridge is a non-profit organization dedicated to promoting sustainable development and quality education.",
		},
		{
			question: "How can I get involved with Green Bridge?",
			answer:
				"You can get involved by volunteering, donating, partnering with us, or supporting our programs.",
		},
		{
			question: "How do I donate to specific projects?",
			answer:
				"Visit our Programs page to explore projects and find opportunities to support specific causes.",
		},
		{
			question: "Can organizations or schools partner with Green Bridge?",
			answer:
				"Yes. Organizations and schools can contact us to discuss partnership opportunities.",
		},
		{
			question: "How do I know my donation is being used effectively?",
			answer:
				"We are committed to using support responsibly to advance our educational and sustainability initiatives.",
		},
	],
};

interface FAQItem {
	question: string;
	answer: string;
}

const getText = (value: unknown, fallback = ""): string =>
	typeof value === "string" ? value : fallback;

const getFAQItems = (value: unknown): FAQItem[] => {
	if (!Array.isArray(value)) return [];

	return value
		.filter(
			(item): item is Record<string, unknown> =>
				typeof item === "object" && item !== null && !Array.isArray(item),
		)
		.map(item => ({
			question: getText(item.question).trim(),
			answer: getText(item.answer).trim(),
		}))
		.filter(item => item.question.length > 0);
};

const FaqAccordion = ({ items }: { items: FAQItem[] }) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = (index: number) => {
		setOpenIndex(currentIndex => (currentIndex === index ? null : index));
	};

	if (items.length === 0) {
		return (
			<div className="flex min-h-40 items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-600">
				There are no frequently asked questions available at the moment.
			</div>
		);
	}

	return (
		<div className="mx-auto w-full max-w-3xl px-0 py-6 md:px-4 md:py-12">
			<div className="space-y-4">
				{items.map((item, index) => {
					const isOpen = openIndex === index;
					const questionId = `faq-question-${index}`;
					const answerId = `faq-answer-${index}`;

					return (
						<div
							key={`${item.question}-${index}`}
							className="overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-md">
							<button
								id={questionId}
								type="button"
								onClick={() => toggle(index)}
								aria-expanded={isOpen}
								aria-controls={answerId}
								className="flex w-full items-center justify-between gap-4 bg-[#1C5D39] px-4 py-4 text-left transition-colors duration-300 hover:bg-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 md:px-6">
								<span className="text-base font-bold text-white md:text-xl">
									{item.question}
								</span>

								<ChevronDown
									aria-hidden="true"
									className={`size-9 shrink-0 rounded-full bg-white p-2 text-gray-700 transition-transform duration-300 ${
										isOpen ? "rotate-180" : ""
									}`}
								/>
							</button>

							<div
								id={answerId}
								role="region"
								aria-labelledby={questionId}
								aria-hidden={!isOpen}
								className={`grid bg-gray-50 transition-[grid-template-rows] duration-500 ease-in-out ${
									isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
								}`}>
								<div className="min-h-0 overflow-hidden">
									<div
										className={`px-4 md:px-6 transition-[padding] duration-500 ease-in-out ${
											isOpen ? "py-4" : "py-0"
										}`}>
										<p
											className={`whitespace-pre-line text-gray-700 transition-opacity duration-300 ${
												isOpen ? "opacity-100" : "opacity-0"
											}`}>
											{item.answer}
										</p>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const FAQs = () => {
	const { fields } = useContactSection("faqs", FAQ_DEFAULTS);

	const items = getFAQItems(fields.items);

	return (
		<div className="bg-[#D4E8DD]" id="faq">
			<div className="px-6 py-10 md:px-40 md:py-24">
				<Reveal distance={20}>
					<div className="grid items-end gap-8">
						<div className="min-h-16 w-full md:min-h-24 md:max-w-xl">
							<div className="flex flex-col">
								<h2 className="text-[16px] font-bold uppercase text-[#2A8C56]">
									{getText(fields.eyebrow, FAQ_DEFAULTS.eyebrow)}
								</h2>

								<h1 className="py-1 text-[32px] font-bold capitalize text-[#1A1A1A]">
									{getText(fields.title, FAQ_DEFAULTS.title)}
								</h1>

								<p className="text-[16px] text-[#3A3A3A]">
									{getText(fields.description, FAQ_DEFAULTS.description)}
								</p>
							</div>
						</div>
					</div>
				</Reveal>

				<div className="pt-10">
					<div className="grid gap-8 pb-5 md:grid-cols-2 md:gap-10">
						<Reveal distance={24}>
							<div>
								<img
									src={faq}
									alt="Frequently asked questions"
									className="min-h-[40vh] w-full rounded-2xl object-cover transition-transform duration-500 ease-in-out hover:scale-[1.02]"
									loading="lazy"
								/>
							</div>
						</Reveal>

						<Reveal delay={120} distance={24}>
							<FaqAccordion items={items} />
						</Reveal>
					</div>
				</div>
			</div>

			<MakeDifference isHome={false} />
		</div>
	);
};

export default FAQs;
