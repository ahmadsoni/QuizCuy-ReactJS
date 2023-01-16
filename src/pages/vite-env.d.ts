/// <reference types="vite/client" />

/// <reference types="vite/client" />

type ImportMetaEnv = {
	readonly VITE_APP_TITLE: string;
	// More env variables...
};

type ImportMeta = {
	readonly env: ImportMetaEnv;
};

