import useDonationStore from "../data/stores/donationStore";

export const useDonation = () => {
	const isModalOpen = useDonationStore(state => state.isModalOpen);
	const title = useDonationStore(state => state.title);
	const openModal = useDonationStore(state => state.openModal);
	const closeModal = useDonationStore(state => state.closeModal);

	return {
		isModalOpen,
		title,
		openModal,
		closeModal,
		openDonationModal: openModal,
		closeDonationModal: closeModal,
	};
};
