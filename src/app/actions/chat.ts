// import { cookies } from "next/headers";

// const processStream = async (
// 	reader: ReadableStreamDefaultReader<Uint8Array>,
// 	onChunk: (chunk: string) => Promise<void>
// ) => {
// 	try {
// 		while (true) {
// 			const { done, value } = await reader.read();

// 			if (done) break;

// 			await onChunk(new TextDecoder().decode(value));
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		reader.releaseLock();
// 	}
// };

// export const chatAction = async (userMessage: string) => {
// 	let fullResponse = "";

// 	try {
// 		const requestBody = {
// 			user_message: userMessage,
// 		};

// 		const response = await fetch("/api/chat", {
// 			method: "POST",
// 			body: JSON.stringify(requestBody),
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});

// 		if (!response.ok) throw new Error(await response.text());
// 		if (!response.body) throw new Error("No response body available");

// 		// const parser = createParser();
// 		const reader = response.body.getReader();

// 		await processStream(reader, async (chunk) => {
// 			const messages = parser.parse(chunk);

// 			for (const msg of messages) {
// 				switch (msg.type) {
// 					case IStreamMessageType.Token:
// 						if ("token" in msg) {
// 							fullResponse += msg.token;
// 							setStreamResponse((prev) => prev + msg.token);
// 						}
// 						break;
// 					case IStreamMessageType.ToolStart:
// 						if ("tool" in msg) {
// 							setCurrentTool({
// 								name: msg.tool,
// 								input: msg.input,
// 							});

// 							fullResponse += formatTerminalOutput(
// 								msg.tool,
// 								msg.input,
// 								"processing..."
// 							);

// 							setStreamResponse(fullResponse);
// 						}
// 						break;
// 					case IStreamMessageType.ToolEnd:
// 						if ("tool" in msg && currentTool) {
// 							const lastTerminalIndex = fullResponse.lastIndexOf(
// 								"<div class='bg-[#1e1e1e]'"
// 							);

// 							if (lastTerminalIndex !== -1) {
// 								fullResponse =
// 									fullResponse.substring(0, lastTerminalIndex) +
// 									formatTerminalOutput(msg.tool, msg.type, msg.output);
// 								setStreamResponse(fullResponse);
// 							}
// 							setCurrentTool(null);
// 						}
// 						break;
// 					case IStreamMessageType.Event:
// 						if ("data" in msg) {
// 							setEventData({
// 								...msg.data.event,
// 							});
// 						}
// 						break;
// 					case IStreamMessageType.Interrupt:
// 						if ("question" in msg) {
// 							setQuestion(msg.question);
// 							setStreamResponse("");
// 						}
// 						break;
// 					case IStreamMessageType.Done:
// 						const _message: IMessage = {
// 							_id: `temp_assitants_${Date.now()}`,
// 							content: fullResponse,
// 							role: "AI",
// 							userAvatarLink: "",
// 							createdAt: Date.now(),
// 							type: "VALID",
// 						};

// 						setMessages((prev) => [...prev, _message]);

// 						setStreamResponse("");
// 						break;

// 					case IStreamMessageType.Error:
// 						if ("error" in msg) {
// 							toast.error(msg.error);

// 							throw new Error(msg.error);
// 						}
// 						break;
// 				}
// 			}
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		const errorMessage = {
// 			content: formatTerminalOutput(
// 				"error",
// 				"Failed to process message",
// 				error instanceof Error ? error.message : "Unknown error"
// 			),
// 			userAvatarLink: "",
// 			role: "AI",
// 			_id: `temp_assitants_${Date.now()}`,
// 			createdAt: Date.now(),
// 			type: "ERROR",
// 		};
// 	}
// };

// // export const chatAction = async (requestPayload: { user_message: string }) => {
// // 	const proxyURL = "http://localhost:8000/agent/interaction";

// // 	const cookieStore = await cookies();
// // 	const allCookies = cookieStore.toString();
// // 	const response = await fetch(proxyURL, {
// // 		method: "POST",
// // 		headers: {
// // 			"Content-Type": "application/json",
// // 			Cookie: allCookies,
// // 		},
// // 		body: JSON.stringify(requestPayload),
// // 		cache: "no-store",
// // 	});

// // 	console.log(response);

// // 	if (!response.body) {
// // 		return {
// // 			error: "Internal server error",
// // 			stream: null,
// // 		};
// // 	}

// // 	return {
// // 		error: null,
// // 		stream: response,
// // 	};
// // };
