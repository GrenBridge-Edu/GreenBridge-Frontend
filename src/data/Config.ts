/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

// ─── Environment ───────────────────────────────────────────────────────────

export const env = import.meta.env;

export const isDev = env.DEV ?? false;

// ─── Site Configuration ────────────────────────────────────────────────────

export type SiteVariant = "default";

export interface SiteNavLink {
	label: string;
	to: string;
}

export interface SiteNavigationConfig {
	primary: SiteNavLink[];
	more: SiteNavLink[];
}

export interface SiteConfig {
	variant: SiteVariant;

	site: {
		name: string;
		domain: string;
	};

	features: {
		frozenFoodPromo: boolean;
	};

	navigation: SiteNavigationConfig;

	campaign?: {
		name: string;
	};

	branding: {
		logo: string;
		logoAlt: string;
		ogImage: string;
		useDefaultBranding: boolean;
	};
}

const NAV_LINKS = {
	home: {
		label: "Home",
		to: "/",
	},

	aboutUs: {
		label: "About Us",
		to: "/about-us",
	},

	programs: {
		label: "Programs",
		to: "/programs",
	},

	resources: {
		label: "Resources",
		to: "/resources",
	},

	getInvolved: {
		label: "Get Involved",
		to: "/get-involved",
	},

	contact: {
		label: "Contact Us",
		to: "/contact",
	},
} satisfies Record<string, SiteNavLink>;

const HOSTNAME_VARIANTS: Record<string, SiteVariant> = {
	"greenbridgeinitiatives.com": "default",
	"www.greenbridgeinitiatives.com": "default",
};

const DEFAULT_SITE_CONFIG: SiteConfig = {
	variant: "default",

	site: {
		name: "Green Bridge",
		domain: "greenbridgeinitiatives.com",
	},

	features: {
		frozenFoodPromo: false,
	},

	navigation: {
		primary: [
			NAV_LINKS.home,
			NAV_LINKS.aboutUs,
			NAV_LINKS.programs,
			NAV_LINKS.resources,
			NAV_LINKS.getInvolved,
			NAV_LINKS.contact,
		],

		more: [],
	},

	branding: {
		logo: "/logo.png",
		logoAlt: "Green Bridge",
		ogImage: "/favicon.ico",
		useDefaultBranding: true,
	},
};

const SITE_CONFIGS: Record<SiteVariant, SiteConfig> = {
	default: DEFAULT_SITE_CONFIG,
};

const getSiteVariant = (): SiteVariant => {
	/**
	 * VITE_SITE_VARIANT takes precedence.
	 *
	 * This allows us to test a particular site locally without
	 * having to modify the hostname.
	 */
	const envVariant = env.VITE_SITE_VARIANT;

	if (envVariant === "default") {
		return envVariant;
	}

	/**
	 * Production fallback.
	 */
	const hostname = window.location.hostname.toLowerCase();

	return HOSTNAME_VARIANTS[hostname] ?? "default";
};;

export const siteConfig: SiteConfig =
	SITE_CONFIGS[getSiteVariant()] ?? DEFAULT_SITE_CONFIG;

// ─── Base URL ──────────────────────────────────────────────────────────────

const host = window.location.hostname;

export const useURL =
	env.DEV && env.VITE_INTEGRATION
		? `http://${host.includes("localhost") ? "localhost" : host}:7755`
		: (env.VITE_BASE_URL ?? "");

// ─── Axios ─────────────────────────────────────────────────────────────────

export const SetDefaultHeaders = () => {
	axios.defaults.baseURL = useURL;
	axios.defaults.headers.common["frontend-source"] = "website";
	axios.defaults.withCredentials = true;
};

// ─── Zustand Helpers ───────────────────────────────────────────────────────

export const encodedLocalStorage = createJSONStorage(() => ({
	getItem: (key: string) => {
		const v = localStorage.getItem(key);

		if (!v) return null;

		try {
			return atob(v);
		} catch {
			return null;
		}
	},

	setItem: (key: string, value: string) => {
		try {
			localStorage.setItem(key, btoa(value));
		} catch {
			/* silent */
		}
	},

	removeItem: (key: string) => localStorage.removeItem(key),
}));

export const withDevtools = <T extends object>(
	fn: Parameters<typeof devtools<T>>[0],
	name: string,
) => (isDev ? devtools(fn, { name }) : fn);

export const withPersist = <T extends object>(
	fn: Parameters<typeof persist<T>>[0],
	data: { name: string; [x: string]: unknown },
): any => persist(fn, { ...data, storage: encodedLocalStorage });
