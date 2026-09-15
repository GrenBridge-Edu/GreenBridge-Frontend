import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { TOKEN } from "../Config";
interface AuthState {
	token: string | null;
	profile: UserProfile | null;
	isAuth: boolean;
	loading: boolean;
	isRegistered: boolean;
	isLoggedIn: boolean;
	isUpdated: boolean;
	isPassword: boolean | null;
	userType?: string;
	login: (payload: any) => void;
	setUser: (payload: any) => void;
	getUser: (payload: any) => void;
	getUserFail: () => void;
	getUserLoading: () => void;
	setPassword: () => void;
	setUserFail: () => void;
	logout: () => void;
}

const AuthStore = (set: any): AuthState => ({
	token: localStorage.getItem(TOKEN) || null,
	profile: null,
	isAuth: false,
	loading: true,
	isRegistered: false,
	isLoggedIn: false,
	isUpdated: false,
	isPassword: null,
	login: (payload: any) => {
		// console.log({ payload });
		localStorage.clear();
		localStorage.setItem(TOKEN, payload?.token);
		set(
			{
				profile: payload?.data || payload,
				token: payload?.token,
				isLoggedIn: true,
			},
			false,
			"login"
		);
	},
	setUser: (payload: any) => {
		set(
			{
				isUpdated: true,
				profile: payload?.data || payload,
			},
			false,
			"setUser"
		);
	},
	getUser: (payload: any) => {
		// console.log({ payload }, "isAuth");
		if (payload?.token) {
			localStorage.setItem(TOKEN, payload?.token);
		}
		set(
			{
				profile: payload?.data || payload,
				isAuth: payload?.data || payload ? true : false,
				loading: false,
			},
			false,
			"getUser"
		);
	},
	getUserFail: () => {
		set({ isAuth: false, loading: false, userType: "" });
	},
	getUserLoading: () => {
		set({ loading: true });
	},
	setPassword: () => {
		set({ isPassword: true });
	},
	setUserFail: () => {
		// console.log("hi here");
		set({
			isUpdated: false,
			isLoggedIn: false,
			isRegistered: false,
			isPassword: false,
		});
	},
	logout: () => {
		localStorage.removeItem(TOKEN);
		localStorage.clear();
		set(
			{
				isAuth: false,
				user: null,
				profile: null,
				token: null,
				userType: "",
			},
			false,
			"logout"
		);
	},
});

export type payData = {
	_id: string;
	createdAt: number;
};

export const MergedData = (data: payData[], payload: payData[]) => {
	let ids = new Set(payload.map(d => d._id));
	let updatateData = [...payload, ...data.filter(d => !ids.has(d._id))];
	return updatateData?.sort((a, b) => a.createdAt - b.createdAt);
};

export const EditData = (data: payData[], payload: payData) => {
	const updatateData =
		data?.length > 0
			? data.map(item => (item._id !== payload._id ? item : payload))
			: data;
	return updatateData;
};

export const DeleteData = (data: payData[], payload: payData) => {
	const filterItem =
		data?.length > 0 ? [...data.filter(item => item._id !== payload._id)] : [];
	return filterItem;
};

const useAuthStore = create(
	devtools(
		persist(AuthStore, {
			name: "hizuma-auth",
		})
	)
);

export default useAuthStore;
