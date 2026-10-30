import { useQuery } from "@tanstack/react-query";
import { legalApi, type LegalSlugValue } from "../endpoints/legal.api";

export const useLegalDocQuery = (slug: LegalSlugValue) =>
	useQuery({
		queryKey: ["legal", slug] as const,
		queryFn: async () => (await legalApi.getBySlug(slug)).data,
	});

export const useLegalDocsListQuery = () =>
	useQuery({
		queryKey: ["legal", "list"] as const,
		queryFn: async () => (await legalApi.listAll()).data,
	});
