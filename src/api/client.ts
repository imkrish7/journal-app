import axios from "axios";

export const config = {
	BASE_URL: process.env.NEXT_PUBLIC_API_ENDPOINT,
	authToken: "JOURNAL_AUTH",
};

export const client = axios.create({
	baseURL: config.BASE_URL,
});

client.interceptors.request.use(function (_config) {
	_config["headers"]["Authorization"] = localStorage.getItem(config.authToken);

	return _config;
});
