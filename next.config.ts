import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.pexels.com",
			},
			{
				protocol: "https",
				hostname: "images.pexels.com",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "/aida-public/**",
			},
		],
	},
	rewrites: async () => {
		return [
			{
				source: "/api/chat",
				destination:
					process.env.NEXT_PUBLIC_API_ENDPOINT + "/agent/interaction",
			},
		];
	},
};

export default nextConfig;
