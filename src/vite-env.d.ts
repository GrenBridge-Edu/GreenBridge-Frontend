/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
	readonly VITE_BASE_URL?: string;
	readonly VITE_INTEGRATION?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}