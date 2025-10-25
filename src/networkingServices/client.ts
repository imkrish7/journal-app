import axios from "axios";

export const config = {
	BASE_URL: "", //process.env.NEXT_PUBLIC_API_ENDPOINT,
	authToken: "JOURNAL_AUTH",
};

export const client = axios.create({
	baseURL: config.BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	withCredentials: true,
});

client.interceptors.request.use(function (_config) {
	_config["headers"]["Authorization"] = `Bearer ${localStorage.getItem(
		config.authToken
	)}`;

	return _config;
});
