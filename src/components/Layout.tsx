import type { ReactNode } from "react";
import PublicNavBar from "./shared/PublicNavBar";
import Footer from "./shared/Footer";
import { useDonation } from "../hooks/useDonation";
import DonationModal from "./modals/DonationModal";
import { useLocation } from "react-router-dom";

const Layout = ({ children }: { children: ReactNode }) => {
	const { isModalOpen, title, closeDonationModal } = useDonation(),
		{ pathname } = useLocation();

	return (
		<div className="flex min-h-screen flex-col">
			<PublicNavBar />

			<main className="flex-1">{children}</main>

			<Footer isContact={pathname === "/contact"} />

			<DonationModal
				isOpen={isModalOpen}
				onClose={closeDonationModal}
				title={title}
			/>
		</div>
	);
};

export default Layout;
