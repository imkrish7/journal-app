import React, { FC, useState } from "react";
import { Button } from "./ui/button";
import RobotLottie from "./icons/RobotLottie";
import { Input } from "./ui/input";

interface IProps {
	chatAction: (userMessage: string) => void;
	haveMessages: boolean;
}

const ChatInterface: FC<IProps> = ({ chatAction, haveMessages = false }) => {
	const [message, setMessage] = useState<string>();

	const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (message) {
			await chatAction(message);
		}
	};

	console.log(haveMessages);

	return (
		<div className={`flex w-full justify-center`}>
			<div
				className={`flex flex-col  ${
					haveMessages ? "w-full" : "min-w-3xl sm:max-w-4xl"
				}`}
			>
				{!haveMessages && (
					<div className="flex flex-col justify-center items-center w-full">
						<div className="h-60 w-90">
							<RobotLottie />
						</div>
						<div>
							<h1 className="text-4xl font-bold font-serif">
								Hi, I&apos;m <span>Ylio</span>
							</h1>
							<h1 className="text-4xl font-bold font-serif">
								How can I help you?
							</h1>
						</div>
					</div>
				)}
				<form
					onSubmit={sendMessage}
					className={`relative mt-2 flex flex-col backdrop-blur-md gap-2 w-full h-20 bg-white rounded-md`}
				>
					<Input
						className="bg-white/40 border-none resize-none rounded-xl active:border-none focus-visible:ring-0"
						placeholder="Talk to me...."
						onChange={(event) => {
							setMessage(event.target.value);
						}}
					/>
					<div className="w-full flex justify-end">
						<Button type="submit">Send</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ChatInterface;
