import { useMutation } from "@tanstack/react-query";

import paymentsApi, {
	type InitializeDonationPayload,
	type InitializeProgramDonationPayload,
	type FinalizePaymentPayload,
} from "../endpoints/payments.api";

export const useInitializeGeneralDonationMutation = () => {
	return useMutation({
		mutationFn: (payload: InitializeDonationPayload) =>
			paymentsApi.initializeGeneralDonation(payload),
	});
};

export const useInitializeProgramDonationMutation = () => {
	return useMutation({
		mutationFn: (payload: InitializeProgramDonationPayload) =>
			paymentsApi.initializeProgramDonation(payload),
	});
};

export const useFinalizePaymentMutation = () => {
	return useMutation({
		mutationFn: (payload: FinalizePaymentPayload) =>
			paymentsApi.finalize(payload),
	});
};
