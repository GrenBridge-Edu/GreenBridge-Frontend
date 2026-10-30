/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * PageRender — file-based routing engine
 *
 * Role → folder mapping:
 *   "pages"   → src/pages/**   (authenticated app routes)
 *   "screens" → src/screens/** (public / guest routes)

 * Folders listed in EXCLUDED are skipped (components, hooks, utils, etc.)
 * Component instances are cached to prevent remounting on re-renders.
 */

import React from "react";

export const USER_ROLES = ["screens"] as const;
export type UserRole = (typeof USER_ROLES)[number];

interface User {
	role: UserRole;
}

const EXCLUDED = [
	"components",
	"assets",
	"utils",
	"common",
	"hooks",
	"types",
	"_",
	"data",
];

// Vite resolves all source files at build time
const ALL_MODULES = import.meta.glob<{ default: React.ComponentType<any> }>(
  "/src/**/*.{js,jsx,ts,tsx}",
);

const isExcluded = (path: string) =>
	EXCLUDED.some(f => new RegExp(`/(${f})/`).test(path)) ||
	// Exclude shared barrel files (auth.screens.tsx, chats.pages.tsx, etc.)
	/\/[a-z]+\.(screens|pages)\.(tsx|ts|js|jsx)$/.test(path);

const filterModules = (role: UserRole) =>
	Object.fromEntries(
		Object.entries(ALL_MODULES).filter(
			([p]) => p.startsWith(`/src/${role}/`) && !isExcluded(p),
		),
	);

const componentCache = new Map<
	string,
	React.LazyExoticComponent<React.ComponentType<any>>
>();

export const getRoutesForUser = (user: User) => {
  const role = USER_ROLES.includes(user?.role as any) ? user.role : "screens";
	const modules = filterModules(role);

  return Object.entries(modules).map(([filePath, loader]) => {
		if (!componentCache.has(filePath)) {
			componentCache.set(filePath, React.lazy(loader));
		}

		const routePath = filePath
			.replace(new RegExp(`^\\/src\\/(${USER_ROLES.join("|")})`), "")
			.replace(/\.(js|jsx|ts|tsx)$/, "")
			.replace(/\/index$/, "")
			.replace(/\[([^\]]+)\]/g, ":$1");

		return {
			path: routePath || "/",
			element: componentCache.get(filePath)!,
		};
	});
};
