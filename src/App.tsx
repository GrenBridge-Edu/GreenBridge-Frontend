import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import localeData from "dayjs/plugin/localeData";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Routers from "./Router";
import { SetDefaultHeaders } from "./data/Config";
import { registerNetworkListeners } from "./data/stores/networkStore";
import { registerOutboxSyncListener } from "./data/outbox/outbox";
import { QueryPersistenceProvider } from "./data/queryPersistence";

dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

SetDefaultHeaders();

registerNetworkListeners();
registerOutboxSyncListener();

// eslint-disable-next-line react-refresh/only-export-components
export const hidePreloader = () => {
	const el = document.getElementById("preloader");

	if (el) {
		el.classList.add("hidden");

		setTimeout(() => {
			el.remove();
			document.body.style.overflow = "auto";
		}, 700);
	}
};

const App = () => {
	useEffect(() => {
		hidePreloader();
	}, []);

	return (
		<QueryPersistenceProvider>
			<Router>
				<Routers />
			</Router>

			{(import.meta as unknown as { env: { DEV: boolean } }).env.DEV && (
				<ReactQueryDevtools initialIsOpen={false} />
			)}
		</QueryPersistenceProvider>
	);
};

export default App;
