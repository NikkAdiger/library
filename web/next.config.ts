import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	experimental: {},
};

export default nextConfig;

