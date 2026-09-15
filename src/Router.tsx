import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { getRoutesForUser } from "./PageRender";
import MainApp from "./screens";
import { ToastContainer, Zoom } from "react-toastify";
import { Suspense, useEffect, useState } from "react";
import Loader from "./components/Loader";
import HeaderComponent from "./components/shared/header";
import Footer from "./components/shared/footer";

const Routers = () => {
	const [routes, setRoutes] = useState<
			{
				path: string;
				element: React.LazyExoticComponent<React.ComponentType<any>>;
			}[]
		>([]),
		{ pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	useEffect(() => {
		setRoutes(getRoutesForUser({ role: "screens" }));
	}, []);

	if (routes?.length === 0) return <Loader />;

	return (
		<>
			<ToastContainer theme="colored" transition={Zoom} />
			<HeaderComponent />
			<Routes>
				<Route index element={<MainApp />} />
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
			<Footer isContact={pathname?.startsWith("/contact")} />
		</>
	);
};

export default Routers;
