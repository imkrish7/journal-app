import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.pexels.com",
				port: "",
				search: "",
				pathname: "",
			},
			{
				protocol: "https",
				hostname: "images.pexels.com",
				port: "",
				search: "",
				pathname: "",
			},
		],
	},
	// rewrites: async () => {
	// 	return [
	// 		{
	// 			source: "/api/chat",
	// 			destination:
	// 				process.env.NEXT_PUBLIC_API_ENDPOINT + "/agent/interaction",
	// 		},
	// 	];
	// },
};

export default nextConfig;
