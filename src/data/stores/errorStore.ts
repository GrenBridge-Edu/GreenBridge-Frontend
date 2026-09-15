import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const ErrorStore = (set:any) => ({
	error: null,
	errorText: "",
	getErrorText: (payload:any) => {
		set({ errorText: payload }, false, "getErrorText");
	},
	returnErrors: (payload:any) => {
		set({ error: payload?.error || payload }, false, "returnErrors");
	},
	clearErrors: () => {
		set({ error: null, errorText: "" }, false, "clearErrors");
	},
});

const useErrorStore = create(
	devtools(
		persist(ErrorStore, {
			name: "error",
		})
	)
);

export default useErrorStore;
