import {
	IStreamMessage,
	IStreamMessageType,
	SSE_DATA_PREFIX,
	SSE_DONE_MESSAGE,
} from "@/interface/chat";

export const createParser = () => {
	let buffer = "";

	const parse = (chunk: string): IStreamMessage[] => {
		const lines = (buffer + chunk).split("\n");
		buffer = lines.pop() || "";

		return lines
			.map((line) => {
				const trimmed = line.trim();

				if (!trimmed || !trimmed.startsWith(SSE_DATA_PREFIX)) return null;

				const data = trimmed.substring(SSE_DATA_PREFIX.length);
				if (data === SSE_DONE_MESSAGE) return { type: IStreamMessageType.Done };

				try {
					const parsed = JSON.parse(data) as IStreamMessage;
					return Object.values(parsed).includes(parsed.type) ? parsed : null;
				} catch (error) {
					console.error(error);
					return {
						type: IStreamMessageType.Error,
						error: "Failed to parse the message",
					};
				}
			})
			.filter((msg): msg is IStreamMessage => msg !== null);
	};

	return { parse };
};
