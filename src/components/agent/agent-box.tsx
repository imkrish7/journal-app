"use client";
import ChatInterface from "@/components/ChatInterface";
import Message from "@/components/Message";
import Todo from "@/components/Todo";
import { IMessage, IStreamMessageType } from "@/interface/chat";
import { IEvent } from "@/interface/todo";
import { createParser } from "@/lib/messageParser";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { formatTerminalOutput } from "./utils";

const AgentBox = () => {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [eventData, setEventData] = useState<IEvent | null>(null);
	const [question, setQuestion] = useState<string>("");
	const [error, setError] = useState<boolean>(false);
	const messageRef = useRef<HTMLDivElement | null>(null);
	const [currentTool, setCurrentTool] = useState<{
		name: string;
		input: unknown;
	} | null>(null);
	const [streamResponse, setStreamResponse] = useState("");

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

	// const chatAction = async (userMessage: string) => {
	// 	userMessage = userMessage.trim();
	// 	if (!userMessage || isLoading) return;

	// 	// 1. Setup Initial State
	// 	const optimisticMessage: IMessage = {
	// 		_id: `temp_${Date.now()}`,
	// 		content: userMessage,
	// 		role: "USER",
	// 		createdAt: Date.now(),
	// 		userAvatarLink: "",
	// 		type: "VALID",
	// 		event: null,
	// 	};

	// 	setMessages((prev) => [...prev, optimisticMessage]);
	// 	setStreamResponse("");
	// 	setIsLoading(true);
	// 	setQuestion("");
	// 	setCurrentTool(null);

	// 	// LOCAL TRACKING VARIABLES (Crucial for avoiding batching/stale state)
	// 	let localFullResponse = "";
	// 	let localCurrentTool: { name: string; input: unknown } | null = null;
	// 	let localEventData: IEvent | null = null;

	// 	try {
	// 		const response = await fetch("/api/chat", {
	// 			method: "POST",
	// 			body: JSON.stringify({ user_message: userMessage }),
	// 			headers: { "Content-Type": "application/json" },
	// 		});

	// 		if (!response.ok) throw new Error(await response.text());
	// 		if (!response.body) throw new Error("No response body");

	// 		const parser = createParser();
	// 		const reader = response.body.getReader();
	// 		const decoder = new TextDecoder();

	// 		setIsLoading(false); // Stop the "bouncing dots" as soon as stream starts

	// 		while (true) {
	// 			const { done, value } = await reader.read();
	// 			if (done) break;

	// 			const chunk = decoder.decode(value, { stream: true });
	// 			const parsedMessages = parser.parse(chunk);

	// 			for (const msg of parsedMessages) {
	// 				switch (msg.type) {
	// 					case IStreamMessageType.Token:
	// 						if ("token" in msg) {
	// 							localFullResponse += msg.token;
	// 							setStreamResponse(localFullResponse);
	// 						}
	// 						break;

	// 					case IStreamMessageType.ToolStart:
	// 						if ("tool" in msg) {
	// 							localCurrentTool = { name: msg.tool, input: msg.input };
	// 							setCurrentTool(localCurrentTool); // For UI outside stream

	// 							localFullResponse += formatTerminalOutput(
	// 								msg.tool,
	// 								msg.input,
	// 								"processing..."
	// 							);
	// 							setStreamResponse(localFullResponse);
	// 						}
	// 						break;

	// 					case IStreamMessageType.ToolEnd:
	// 						if ("tool" in msg) {
	// 							// Use localFullResponse instead of state
	// 							const lastTerminalIndex = localFullResponse.lastIndexOf(
	// 								"<div class='bg-[#1e1e1e]'"
	// 							);

	// 							if (lastTerminalIndex !== -1) {
	// 								localFullResponse =
	// 									localFullResponse.substring(0, lastTerminalIndex) +
	// 									formatTerminalOutput(msg.tool, msg.type, msg.output);
	// 								setStreamResponse(localFullResponse);
	// 							}
	// 							localCurrentTool = null;
	// 							setCurrentTool(null);
	// 						}
	// 						break;

	// 					case IStreamMessageType.Event:
	// 						if ("data" in msg) {
	// 							localEventData = msg.data.event;
	// 							setEventData(localEventData);
	// 						}
	// 						break;

	// 					case IStreamMessageType.Interrupt:
	// 						if ("question" in msg) {
	// 							setQuestion(msg.question);
	// 							// If it's an interrupt, we usually clear the working stream
	// 							setStreamResponse("");
	// 							localFullResponse = "";
	// 						}
	// 						break;

	// 					case IStreamMessageType.Done:
	// 						// Finalize the message into the messages array
	// 						const finalMessage: IMessage = {
	// 							_id: `ai_${Date.now()}`,
	// 							content: localFullResponse,
	// 							role: "AI",
	// 							userAvatarLink: "",
	// 							createdAt: Date.now(),
	// 							type: "VALID",
	// 							event: localEventData,
	// 						};
	// 						setMessages((prev) => [...prev, finalMessage]);

	// 						// Reset stream states
	// 						setStreamResponse("");
	// 						setEventData(null);
	// 						break;

	// 					case IStreamMessageType.Error:
	// 						if ("error" in msg) throw new Error(msg.error);
	// 						break;
	// 				}
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error("Streaming Error:", error);
	// 		// ... error handling logic
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	const chatAction = async (userMessage: string) => {
		userMessage = userMessage.trim();
		if (!userMessage || isLoading) return;
		const optimisticMessage = {
			_id: `temp_${Date.now()}`,
			content: userMessage,
			role: "USER",
			createdAt: Date.now(),
			userAvatarLink: "",
			type: "VALID",
			event: null,
		};

		setCurrentTool(null);
		setStreamResponse("");
		setIsLoading(true);
		setMessages([...messages, optimisticMessage]);

		try {
			const requestBody = {
				user_message: userMessage,
			};

			const response = await fetch("/api/chat", {
				method: "POST",
				body: JSON.stringify(requestBody),
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			});

			if (!response.ok) throw new Error(await response.text());
			if (!response.body) throw new Error("No response body available");

			const parser = createParser();
			const reader = response.body.getReader();

			setIsLoading(false);
			let fullResponse = "";
			let localEventData: IEvent | null = null;
			while (true) {
				const { done, value } = await reader.read();

				if (done) break;

				const chunk = new TextDecoder().decode(value);
				const _messages = parser.parse(chunk);

				for (const msg of _messages) {
					switch (msg.type) {
						case IStreamMessageType.Token:
							if ("token" in msg) {
								fullResponse += msg.token;
								setStreamResponse(fullResponse);
							}
							break;
						case IStreamMessageType.ToolStart:
							if ("tool" in msg) {
								setCurrentTool({
									name: msg.tool,
									input: msg.input,
								});

								fullResponse += formatTerminalOutput(
									msg.tool,
									msg.input,
									"processing..."
								);

								setStreamResponse(fullResponse);
							}
							break;
						case IStreamMessageType.ToolEnd:
							if ("tool" in msg && currentTool) {
								const lastTerminalIndex = fullResponse.lastIndexOf(
									"<div class='bg-[#1e1e1e]'"
								);

								if (lastTerminalIndex !== -1) {
									fullResponse =
										fullResponse.substring(0, lastTerminalIndex) +
										formatTerminalOutput(msg.tool, msg.type, msg.output);
									setStreamResponse(fullResponse);
								}
								setCurrentTool(null);
							}
							break;
						case IStreamMessageType.Event:
							if ("data" in msg) {
								localEventData = msg.data.event;
							}
							break;
						case IStreamMessageType.Interrupt:
							if ("question" in msg) {
								setQuestion(msg.question);
								setStreamResponse("");
							}
							break;
						case IStreamMessageType.Done:
							console.log("DATA", eventData);
							const _message: IMessage = {
								_id: `temp_assitants_${Date.now()}`,
								content: fullResponse,
								role: "AI",
								userAvatarLink: "",
								createdAt: Date.now(),
								type: "VALID",
								event: localEventData,
							};

							setMessages((prev) => [...prev, _message]);
							setEventData(null);
							setStreamResponse("");
							break;

						case IStreamMessageType.Error:
							if ("error" in msg) {
								toast.error(msg.error);
								throw new Error(msg.error);
							}
							break;
					}
				}
			}
		} catch (error) {
			console.log(error);
			const errorMessage = {
				content: formatTerminalOutput(
					"error",
					"Failed to process message",
					error instanceof Error ? error.message : "Unknown error"
				),
				userAvatarLink: "",
				role: "AI",
				_id: `temp_assitants_${Date.now()}`,
				createdAt: Date.now(),
				type: "ERROR",
				event: null,
			};

			setMessages((prev) => [...prev, errorMessage]);
			setStreamResponse("");
			setError(false);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		if (messageRef.current) {
			messageRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	const haveMessages = useMemo(() => {
		return messages.length > 0;
	}, [messages]);

	console.log(streamResponse);

	return (
		<div className="flex flex-col relative w-full h-full px-2 justify-center">
			{(haveMessages || streamResponse || error) && (
				<div className="flex-1 gap-2 flex flex-col overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
					{messages.map((_message) => {
						return <Message key={_message._id} {..._message} />;
					})}
					{eventData && <Todo data={eventData.arguments} />}
					{streamResponse.length > 0 && (
						<Message
							// key={uuidv4()}
							{...{
								content: streamResponse,
								userAvatarLink: "",
								role: "AI",
								_id: `temp_assitants_${uuidv4()}`,
								createdAt: Date.now(),
								type: "VALID",
								event: null,
							}}
						/>
					)}
					{error && (
						<Message
							{...{
								content: streamResponse,
								userAvatarLink: "",
								role: "AI",
								_id: `temp_assitants_${Date.now()}`,
								createdAt: Date.now(),
								type: "ERROR",
								event: null,
							}}
						/>
					)}
					{question && (
						<Message
							{...{
								content: question,
								userAvatarLink: "",
								role: "AI",
								_id: `temp_assitants_${Date.now()}`,
								createdAt: Date.now(),
								type: "QUESTION",
								event: null,
							}}
						/>
					)}
					{isLoading && !streamResponse && (
						<div className="flex justify-end animate-in fade-in-0">
							<div className="rounded-2xl px-4 py-3 bg-white text-gray-900 rounded-bl-none shadow-sm ring-1 ring-inset ring-gray-200">
								<div className="flex items-center gap-1.5">
									{[0.3, 0.15, 0].map((delay, i) => (
										<div
											key={i}
											className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"
											style={{ animationDelay: `-${delay}s` }}
										/>
									))}
								</div>
							</div>
						</div>
					)}
					<div ref={messageRef} />
				</div>
			)}
			<div className="h-5" />
			<div className="absolute bottom-10 contents flex-1 w-full mb-2">
				<ChatInterface haveMessages={haveMessages} chatAction={chatAction} />
			</div>
			<div className="h-5" />
		</div>
	);
};

export default AgentBox;
