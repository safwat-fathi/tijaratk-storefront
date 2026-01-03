import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
		],
		// Allow localhost images in development
		unoptimized: process.env.NODE_ENV === "development",
	},
};

export default withNextIntl(nextConfig);
