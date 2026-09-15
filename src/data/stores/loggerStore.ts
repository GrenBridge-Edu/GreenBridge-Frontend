import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { DeleteData, EditData } from "./authStore";

interface LoggerState {
	data: dataType | null;
	mainSearch: dataType | null;
	status: string;
	isFound: boolean;
	getSearchLogger: (payload: any) => void;
	getSearch: (payload: any) => void;
	resetLoggerSearch: () => void;
	setCurrentLogger: (payload: any) => void;
	getLogger: (payload: any) => void;
	addLogger: (payload: any) => void;
	deleteLogger: (payload: any) => void;
	updateLogger: (payload: any) => void;
	getDynamicLogger: (payload: any, prop: string) => void;
	addDynamicLogger: (payload: any, prop: string) => void;
	deleteDynamicLogger: (payload: any, prop: string) => void;
	updateDynamicLogger: (payload: any, prop: string) => void;
	subjectFail: () => void;
	logoutLogger: () => void;
}

const LoggerStore = (set: any): LoggerState => ({
	data: null,
	status: "",
	isFound: false,
	mainSearch: null,
	getSearchLogger: (payload: any) => {
		set(
			(state: any) => ({
				mainSearch:
					payload?.search === state?.search
						? payload?.data || payload
						: state?.mainSearch,
				isFound: true,
			}),
			false,
			"getSearchLogger"
		);
	},
	getSearch: (payload: any) => {
		set({ search: payload?.data || payload }, false, "getSearch");
	},
	resetLoggerSearch: () => {
		set(
			{ search: "", mainSearch: null, isFound: null },
			false,
			"resetLoggerSearch"
		);
	},
	getLogger: (payload: any) => {
		set({ data: payload?.data || payload }, false, "getLogger");
	},
	getDynamicLogger: (payload: any, prop: string) => {
		set({ [prop]: payload?.data || payload }, false, "getDynamicLogger");
	},
	setCurrentLogger: (payload: any) => {
		set(
			() => ({
				currentSelected: payload?._id || payload,
			}),
			false,
			"setCurrentLogger"
		);
	},
	addLogger: (payload: any) => {
		let data = payload?.data || payload;

		set(
			(state: any) => ({
				data: {
					...state?.data,
					docs: state?.data?.docs ? [data, ...state?.data?.docs] : [data],
					totalDocs: state?.data?.totalDocs ? 1 + state?.data?.totalDocs : 1,
					docsTotal: state?.data?.docsTotal ? 1 + state?.data?.docsTotal : 1,
				},
				status: "added",
			}),
			false,
			"addLogger"
		);
	},
	addDynamicLogger: (payload: any, prop: string) => {
		let data = payload?.data || payload;
		set(
			(state: any) => ({
				[prop]: {
					...state?.[prop],
					docs: state?.[prop]?.docs ? [data, ...state?.[prop]?.docs] : [data],
					totalDocs: state?.[prop]?.totalDocs
						? 1 + state?.[prop]?.totalDocs
						: 1,
					docsTotal: state?.[prop]?.docsTotal
						? 1 + state?.[prop]?.docsTotal
						: 1,
				},
				status: "added",
			}),
			false,
			"addDynamicLogger"
		);
	},
	deleteLogger: (payload: any) => {
		let data = payload?.data || payload;
		set(
			(state: any) => ({
				data: {
					...state?.data,
					docs: DeleteData(state?.data?.docs, data),
					totalDocs: state?.data?.totalDocs ? state?.data?.totalDocs - 1 : 0,
					docsTotal: state?.data?.docsTotal ? state?.data?.docsTotal - 1 : 0,
				},
				status: "deleted",
			}),
			false,
			"deleteLogger"
		);
	},
	deleteDynamicLogger: (payload: any, prop: string) => {
		let data = payload?.data || payload;
		set(
			(state: any) => ({
				[prop]: {
					...state?.[prop],
					docs: DeleteData(state?.[prop]?.docs, data),
					totalDocs: state?.[prop]?.totalDocs
						? state?.[prop]?.totalDocs - 1
						: 0,
					docsTotal: state?.[prop]?.docsTotal
						? state?.[prop]?.docsTotal - 1
						: 0,
				},
				status: "deleted",
			}),
			false,
			"deleteDynamicLogger"
		);
	},
	updateLogger: (payload: any) => {
		let data = payload?.data || payload;
		set(
			(state: any) => ({
				data: {
					...state?.data,
					docs: EditData(state?.data?.docs, data),
				},
				status: "updated",
			}),
			false,
			"editLogger"
		);
	},
	updateDynamicLogger: (payload: any, prop: string) => {
		let data = payload?.data || payload;
		set(
			(state: any) => ({
				[prop]: {
					...state?.[prop],
					docs: EditData(state?.[prop]?.docs, data),
				},
				status: "updated",
			}),
			false,
			"updateDynamicLogger"
		);
	},
	subjectFail: () => {
		set({ status: "", isFound: null });
	},
	logoutLogger: () => {
		set({
			status: "",
			isFound: null,
			data: null,
			mainSearch: null,
			allLogger: null,
		});
	},
});

export const useProgramsStore = create(
	devtools(
		persist(LoggerStore, {
			name: "programs",
		})
	)
);

export const useResourcesStore = create(
	devtools(
		persist(LoggerStore, {
			name: "resources",
		})
	)
);
