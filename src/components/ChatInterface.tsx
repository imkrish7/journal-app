import React, { FC, useState } from "react";
import RobotLottie from "./icons/RobotLottie";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface IProps {
	chatAction: (userMessage: string) => void;
}

const ChatInterface: FC<IProps> = ({ chatAction }) => {
	const [message, setMessage] = useState<string>();

	const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (message) {
			await chatAction(message);
		}
	};

	return (
		<form onSubmit={sendMessage} className="flex items-center gap-2 w-full">
			<div className="w-[60px] h-[60px]">
				<RobotLottie />
			</div>
			<Input
				className="flex flex-1 backdrop-blur-md bg-white/40 border-2 border-white"
				placeholder="Talk to me...."
				onChange={(event) => {
					setMessage(event.target.value);
				}}
			/>
			<Button>Send</Button>
		</form>
	);
};

export default ChatInterface;
