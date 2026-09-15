import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./Router";
import { SetAuthToken, SetDefaultHeaders, TOKEN } from "./data/Config";
import useGenFetcher from "./data/useFetcher";
import { useEffect } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

SetDefaultHeaders();

if (localStorage.getItem(TOKEN)) {
	SetAuthToken(localStorage.getItem(TOKEN));
}

const App = () => {
	let { loadUser } = useGenFetcher();

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Router>
				<Routers />
			</Router>
		</>
	);
};

export default App;
