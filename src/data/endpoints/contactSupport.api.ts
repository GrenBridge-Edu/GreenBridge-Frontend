import { api } from "../apiClient";

export interface ContactSupportPayload {
	fullname: string;
	email: string;
	message: string;
}

export interface JoinOurTeamPayload {
	firstName: string;
	lastName: string;
	email: string;
	telephone: string;
	positionOfInterest?: string;
	coverLetter?: string;
	others?: string;
}

export interface PartnerWithUsPayload {
	nameOfOrganisation: string;
	email: string;
	telephone: string;
	organizationType?: string;
	organisationType?: string;
	areaOfPartnership?: string;
	organisationAddress?: string;
	message?: string;
	others?: string;
}

export interface ContactSupportResponse {
	success?: boolean;
	message?: string;
	data?: unknown;
}

const contactSupportApi = {
	submit: async (
		payload: ContactSupportPayload,
	): Promise<ContactSupportResponse> => {
		return api.post<ContactSupportResponse>("/v1/contact-support", payload);
	},

	joinOurTeam: async (
		payload: JoinOurTeamPayload,
	): Promise<ContactSupportResponse> => {
		return api.post<ContactSupportResponse>(
			"/v1/contact-support/join-our-team",
			payload,
		);
	},

	partnerWithUs: async (
		payload: PartnerWithUsPayload,
	): Promise<ContactSupportResponse> => {
		return api.post<ContactSupportResponse>(
			"/v1/contact-support/partner-with-us",
			payload,
		);
	},
};

export default contactSupportApi;
