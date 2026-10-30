import { create } from "zustand";

interface DonationState {
	isModalOpen: boolean;
	title: string;
	openModal: (title?: string) => void;
	closeModal: () => void;
}

const DEFAULT_DONATION_TITLE = "How Would You Like To Donate";

const useDonationStore = create<DonationState>()(set => ({
	isModalOpen: false,
	title: DEFAULT_DONATION_TITLE,

	openModal: (title = DEFAULT_DONATION_TITLE) =>
		set({
			isModalOpen: true,
			title,
		}),

	closeModal: () =>
		set({
			isModalOpen: false,
		}),
}));

export default useDonationStore;
