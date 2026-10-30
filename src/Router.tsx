import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { getRoutesForUser } from "./PageRender";
import { ToastContainer, Zoom } from "react-toastify";
import { Suspense, useEffect } from "react";
import OfflineBanner from "./components/OfflineBanner";
import Loader from "./components/Loader";
import Layout from "./components/Layout";
// import { useSEOMeta } from "./hooks/useSEOMeta";
import React from "react";

const Routers = () => {
	const { pathname } = useLocation();
	// useSEOMeta();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	const routes = getRoutesForUser({ role: "screens" });

	return (
		<>
			<ToastContainer
				theme="dark"
				transition={Zoom}
				position="top-center"
				autoClose={3500}
				hideProgressBar={false}
				closeOnClick
				pauseOnHover
			/>
			<OfflineBanner />
			<Layout>
				<Routes>
					<Route index element={<GuestIndex />} />
					{routes.map(route => (
						<Route
							key={route.path}
							path={route.path}
							element={
								<Suspense fallback={<Loader />}>
									<route.element key={route.path} />
								</Suspense>
							}
						/>
					))}
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Layout>
		</>
	);
};

export default Routers;

const LandingScreen = React.lazy(() => import("./screens/index"));
const GuestIndex = () => (
	<Suspense fallback={<Loader />}>
		<LandingScreen />
	</Suspense>
);
