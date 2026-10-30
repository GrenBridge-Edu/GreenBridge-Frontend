import { api } from "../apiClient";

export interface InitializeDonationPayload {
	fullname: string;
	email: string;
	amount: number;
	isAnonymous?: boolean;
	nextScreen?: string;
}

export interface InitializeProgramDonationPayload extends InitializeDonationPayload {
	program: string;
}

export interface PaymentInitializationResponse {
	message?: string;
	data?: {
		authorization_url?: string;
		access_code?: string;
		reference?: string;
	};
}

export interface FinalizePaymentPayload {
	reference: string;
}

export interface FinalizePaymentResponse {
	message?: string;
	success?: boolean;
	data?: unknown;
}

const paymentsApi = {
	initializeGeneralDonation: (
		payload: InitializeDonationPayload,
	): Promise<PaymentInitializationResponse> =>
		api.put<PaymentInitializationResponse>(
			"/v1/payments/initialize/general",
			payload,
		),

	initializeProgramDonation: (
		payload: InitializeProgramDonationPayload,
	): Promise<PaymentInitializationResponse> =>
		api.put<PaymentInitializationResponse>(
			"/v1/payments/initialize/program",
			payload,
		),

	finalize: (
		payload: FinalizePaymentPayload,
	): Promise<FinalizePaymentResponse> =>
		api.put<FinalizePaymentResponse>("/v1/payments/finalize", payload),
};

export default paymentsApi;
