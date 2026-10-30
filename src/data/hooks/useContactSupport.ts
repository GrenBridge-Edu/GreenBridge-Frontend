import { useMutation } from "@tanstack/react-query";

import contactSupportApi, {
	type ContactSupportPayload,
	type JoinOurTeamPayload,
	type PartnerWithUsPayload,
} from "../endpoints/contactSupport.api";

export const useContactSupportMutation = () => {
	return useMutation({
		mutationFn: (payload: ContactSupportPayload) =>
			contactSupportApi.submit(payload),
	});
};

export const useJoinOurTeamMutation = () => {
	return useMutation({
		mutationFn: (payload: JoinOurTeamPayload) =>
			contactSupportApi.joinOurTeam(payload),
	});
};

export const usePartnerWithUsMutation = () => {
	return useMutation({
		mutationFn: (payload: PartnerWithUsPayload) =>
			contactSupportApi.partnerWithUs(payload),
	});
};
