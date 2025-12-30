"use client";
import ChatInterface from "@/components/ChatInterface";
import Message from "@/components/Message";
import { IStreamMessageType } from "@/interface/chat";
import { createParser } from "@/lib/messageParser";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IMessage {
	_id: string;
	content: string;
	role: "USER" | "AI" | string;
	createdAt: number;
	userAvatarLink: string | undefined;
	type: "ERROR" | "VALID" | string;
}

const formatToolOutput = (output: unknown): string => {
	if (typeof output === "string") return output;
	return JSON.stringify(output, null, 2);
};

const formatTerminalOutput = (
	tool: string,
	input: unknown,
	output: unknown
) => {
	const terminalHtml = `<div class="bg-[#1e1e1e] text-white font-mono p-2 rounded-md my-2 overflow-x-auto whitespace-normal max-w-[600px]">
      <div class="flex items-center gap-1.5 border-b border-gray-700 pb-1">
        <span class="text-red-500">●</span>
        <span class="text-yellow-500">●</span>
        <span class="text-green-500">●</span>
        <span class="text-gray-400 ml-1 text-sm">~/${tool}</span>
      </div>
      <div class="text-gray-400 mt-1">$ Input</div>
      <pre class="text-yellow-400 mt-0.5 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(
				input
			)}</pre>
      <div class="text-gray-400 mt-2">$ Output</div>
      <pre class="text-green-400 mt-0.5 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(
				output
			)}</pre>
    </div>`;

	return `---START---\n${terminalHtml}\n---END---`;
};

const Page = () => {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [question, setQuestion] = useState<string>("");
	const messageRef = useRef<HTMLDivElement | null>(null);
	const [currentTool, setCurrentTool] = useState<{
		name: string;
		input: unknown;
	} | null>(null);
	// const [streamResponse, setStreamResponse] = useState("");
	const streamResponse = useRef("");

	const processStream = async (
		reader: ReadableStreamDefaultReader<Uint8Array>,
		onChunk: (chunk: string) => Promise<void>
	) => {
		try {
			while (true) {
				const { done, value } = await reader.read();

				if (done) break;

				await onChunk(new TextDecoder().decode(value));
			}
		} catch (error) {
			console.error(error);
			reader.releaseLock();
		}
	};

	const chatAction = async (userMessage: string) => {
		setIsLoading(true);
		const optimisticMessage = {
			_id: `temp_${Date.now()}`,
			content: userMessage,
			role: "USER",
			createdAt: Date.now(),
			userAvatarLink: "",
			type: "VALID",
		};

		// setStreamResponse("");
		setCurrentTool(null);
		// setIsLoading(false);

		setMessages([...messages, optimisticMessage]);

		let fullResponse = "";

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
			});

			if (!response.ok) throw new Error(await response.text());
			if (!response.body) throw new Error("No response body available");

			const parser = createParser();
			const reader = response.body.getReader();

			setIsLoading(false);

			await processStream(reader, async (chunk) => {
				const messages = parser.parse(chunk);

				for (const msg of messages) {
					switch (msg.type) {
						case IStreamMessageType.Token:
							if ("token" in msg) {
								fullResponse += msg.token;
								// setStreamResponse((prev) => prev + msg.token);
								streamResponse.current += msg.token;
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

								// setStreamResponse(fullResponse);
								streamResponse.current = fullResponse;
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
									// setStreamResponse(fullResponse);
									streamResponse.current = fullResponse;
								}
								setCurrentTool(null);
							}
							break;
						case IStreamMessageType.Interrupt:
							if ("question" in msg) {
								setQuestion(msg.question);
								streamResponse.current = "";
							}
							break;
						case IStreamMessageType.Done:
							const _message: IMessage = {
								_id: `temp_assitants_${Date.now()}`,
								content: fullResponse,
								role: "AI",
								userAvatarLink: "",
								createdAt: Date.now(),
								type: "VALID",
							};

							setMessages((prev) => [...prev, _message]);
							// setStreamResponse("");
							streamResponse.current = "";
							break;

						case IStreamMessageType.Error:
							if ("error" in msg) {
								toast.error(msg.error);

								throw new Error(msg.error);
							}
							break;
					}
				}
			});
		} catch (error) {
			// setStreamResponse(
			// 	formatTerminalOutput(
			// 		"error",
			// 		"Failed to process message",
			// 		error instanceof Error ? error.message : "Unknown error"
			// 	)
			// );
			streamResponse.current = formatTerminalOutput(
				"error",
				"Failed to process message",
				error instanceof Error ? error.message : "Unknown error"
			);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		if (messageRef.current) {
			messageRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	console.log(streamResponse);
	return (
		<div className="flex flex-col relative h-[calc(100vh-theme(spacing.14))] w-full px-2">
			<div className="flex-1 gap-2 flex flex-col overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
				{messages.map((_message) => {
					return <Message key={_message._id} {..._message} />;
				})}
				{streamResponse.current && (
					<Message
						{...{
							content: streamResponse.current,
							userAvatarLink: "",
							role: "AI",
							_id: `temp_assitants_${Date.now()}`,
							createdAt: Date.now(),
							type: "VALID",
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
						}}
					/>
				)}
				{isLoading && !streamResponse.current && (
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
			<div className="h-15" />
			<div className="absolute bottom-0 contents flex-1 w-full">
				<ChatInterface chatAction={chatAction} />
			</div>
		</div>
	);
};

export default Page;
