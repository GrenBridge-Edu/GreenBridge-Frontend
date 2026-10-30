import LegalPageLayout from "../../components/shared/LegalPageLayout";
import SafeHtml from "../../components/SafeHtml";
import Loader from "../../components/Loader";
import { useLegalDocQuery } from "../../data/hooks/useLegal";
import Reveal from "../../components/shared/Reveal";

const TermsPage = () => {
	const { data: doc, isLoading } = useLegalDocQuery("volunteer-policy");

	return (
		<LegalPageLayout title={doc?.title ?? "Volunteer Policy"}>
			{isLoading || !doc ? (
				<Loader />
			) : (
				<Reveal distance={18}>
					<SafeHtml
						html={doc.content}
						className="prose prose-sm sm:prose-base max-w-none"
					/>
				</Reveal>
			)}
		</LegalPageLayout>
	);
};
export default TermsPage;
