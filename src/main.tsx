import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.tsx";
import { registerSW } from "virtual:pwa-register";

registerSW({
	onRegistered(registration) {
		console.log("[PWA] Service worker registered", registration);
	},
	onRegisterError(error) {
		console.error("[PWA] Service worker registration failed", error);
	},
});


const root = document.getElementById("root");
if (!root) throw new Error("Root element #root not found");

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
