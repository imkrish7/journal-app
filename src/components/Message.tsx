import React, { FC, useCallback } from "react";
import RobotLottie from "./icons/RobotLottie";
import { Avatar, AvatarImage } from "./ui/avatar";
import { IEvent } from "@/interface/todo";
import Link from "next/link";
import Todo from "./Todo";

interface IProps {
	_id: string;
	content: string;
	role: "USER" | "AI" | string;
	createdAt: number;
	userAvatarLink: string | undefined;
	type: "ERROR" | "VALID" | "QUESTION" | string;
	event: IEvent | null;
}

const formatMessage = (content: string): string => {
	content = content.replace(/\\\\/g, "\\");
	content = content.replace(/\\n/g, "\n");
	content = content.replace(/---START---\n?/g, "").replace(/\n?---END---/g, "");
	return content.trim();
};

const Message: FC<IProps> = ({
	role,
	userAvatarLink,
	content,
	type,
	event,
}) => {
	const getEvent = useCallback(() => {
		if (event) {
			switch (event.name) {
				case "create_todo": {
					return (
						<Link href={`/todo/${event.arguments.id}`}>
							<Todo data={event.arguments} />
						</Link>
					);
				}
				default: {
					return "";
				}
			}
		}
	}, [event]);
	return (
		<div
			className={`flex flex-col items-end ${
				role == "AI" ? "items-end" : "items-start"
			}`}
		>
			<div className={`w-10 h-10 rounded-full bg-gray-200 p-1`}>
				{role === "AI" ? (
					<RobotLottie />
				) : (
					<Avatar>
						<AvatarImage
							src={
								userAvatarLink
									? userAvatarLink
									: "https://github.com/shadcn.png"
							}
						/>
					</Avatar>
				)}
			</div>
			<div
				className={`w-[50%] rounded-md flex ${
					role === "AI" ? "justify-end" : "justify-start"
				} `}
			>
				<div
					className={`px-2 py-1 rounded-md  backdrop-blur-3xl inline-flex ${
						type == "QUESTION" ? "bg-purple-200" : "bg-white/50"
					}`}
				>
					<div className={`flex flex-col`}>
						{type !== "ERROR" && (
							<span
								className={`text-sm font-normal text-gray-600 inline-flex ${
									type == "QUESTION" ? "text-purple-600 font-semibold" : ""
								}`}
							>
								{content}
								{event && getEvent()}
							</span>
						)}

						<div
							className={`flex ${
								role === "AI" ? "justify-end" : "justify-start"
							}`}
						>
							{type === "ERROR" ? (
								<div
									dangerouslySetInnerHTML={{ __html: formatMessage(content) }}
								/>
							) : (
								<span className="text-xs font-medium text-gray-400">
									{`${new Date().getHours()}:${new Date().getMinutes()}`}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Message;
