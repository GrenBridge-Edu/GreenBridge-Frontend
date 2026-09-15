import Hero from "../../components/shared/Hero";
import getInvolvedBG from "../../assets/images/getInvolvedBG.jpg";
import CurvePatternTop, {
	CurvePatternBottom,
} from "../../components/shared/CurvePattern";
import ContactFormInformation from "./components/ContactFormInformation";
import FAQs from "./components/FAQs";

const Contact = () => {
	return (
		<>
			<main className="relative">
				<Hero
					backgroundImage={getInvolvedBG}
					heading="We’d Love to Hear From You"
					subtext="Whether you want to collaborate, volunteer, donate, or simply learn more about our work — your voice matters. Reach out and we’ll respond as soon as possible."
				/>
				<CurvePatternTop />
			</main>
			<section className="relative">
				<ContactFormInformation />
				<CurvePatternBottom />
			</section>
			<FAQs />
		</>
	);
};

export default Contact;
