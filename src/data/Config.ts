import axios from "axios";

export const TOKEN = "AUTH_TOKEN";

export const SetAuthToken = (token?: string | null) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = token;
		axios.defaults.headers.common["frontend-source"] = "website";
	} else {
		delete axios.defaults.headers.common["Authorization"];
		delete axios.defaults.headers.common["frontend-source"];
	}
};

let host = window.location.hostname;
export const useURL =
	import.meta.env.DEV && import.meta.env.VITE_INTEGRATION
		? `http://${host}:7755`
		: // ? "http://localhost:7755"
		  import.meta.env.VITE_BASE_URL;

export const SetDefaultHeaders = () => {
	axios.defaults.baseURL = useURL;
	axios.defaults.headers.common["frontend-source"] = "website";
};
