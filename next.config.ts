import type { NextConfig } from "next";

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

export default nextConfig;
