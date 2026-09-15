/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export const USER_ROLES = ["screens", "admin", "superadmin"] as const;

export type UserRole = (typeof USER_ROLES)[number];

interface User {
	role: UserRole;
}

const EXCLUDED_FOLDERS = ["components", "assets", "utils", "common"];

const ALL_ROUTE_MODULES = import.meta.glob<{
	default: React.ComponentType<any>;
}>("/src/**/*.{js,jsx,ts,tsx}");

const isInExcludedFolder = (filePath: string) => {
	return EXCLUDED_FOLDERS.some(folder =>
		new RegExp(`/(${folder})/`).test(filePath)
	);
};

const filterModules = (role: UserRole) => {
	return Object.fromEntries(
		Object.entries(ALL_ROUTE_MODULES).filter(
			([path]) => path.startsWith(`/src/${role}/`) && !isInExcludedFolder(path)
		)
	);
};

const getRouteGlobsByUser = (user: User) => {
	const role = USER_ROLES?.includes(user?.role ?? "") ? user!.role : "screens";

	return filterModules(role);
};

// cache to prevent remounting React.lazy components
const componentCache = new Map<
	string,
	React.LazyExoticComponent<React.ComponentType<any>>
>();

export const getRoutesForUser = (user: User) => {
	const modules = getRouteGlobsByUser(user);

	return Object.entries(modules).map(([filePath, loader]) => {
		if (!componentCache.has(filePath)) {
			componentCache.set(filePath, React.lazy(loader));
		}

		const routePath = filePath
			?.replace(new RegExp(`^\\/src\\/(${USER_ROLES.join("|")})`), "")
			?.replace(/\.(js|jsx|ts|tsx)$/, "")
			?.replace(/\/index$/, "")
			?.replace(/\[([^\]]+)\]/g, ":$1");

		return {
			path: routePath || "/",
			element: componentCache.get(filePath)!,
		};
	});
};
