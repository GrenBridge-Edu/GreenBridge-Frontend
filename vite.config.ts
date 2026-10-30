import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(), // Tailwind v4 — no PostCSS config needed
		VitePWA({
			strategies: "injectManifest", // was "strategy" — typo, wrong key entirely
			srcDir: "src",
			filename: "sw.ts",
			devOptions: {
				enabled: true,
				type: "module",
			},
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "apple-touch-icon.png", "robots.txt"],
			manifest: {
				name: "Green Bridge",
				short_name: "Green Bridge",
				description: "NGO — Sustainability",
				theme_color: "#00FFCC",
				background_color: "#1A1A1A",
				display: "standalone",
				orientation: "portrait-primary",
				start_url: "/",
				icons: [
					{ src: "favicon.ico", sizes: "192x192", type: "image/png" },
					{
						src: "favicon.ico",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "google-fonts",
							expiration: { maxAgeSeconds: 31_536_000 },
						},
					},
					{
						urlPattern: /^https?:\/\/.*\/api\//i,
						handler: "NetworkFirst",
						options: {
							cacheName: "api-cache",
							networkTimeoutSeconds: 10,
							expiration: { maxAgeSeconds: 3600 },
						},
					},
				],
			},
		}),
	],
	resolve: {
		alias: { "@": path.resolve(__dirname, "src") },
	},
	server: {
		port: 3002,
		proxy: {
			"/api": {
				target: "http://localhost:7755",
				changeOrigin: true,
			},
		},
	},
});
