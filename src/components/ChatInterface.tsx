import React, { FC, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface IProps {
	chatAction: (userMessage: string) => void;
	haveMessages: boolean;
}

const ChatInterface: FC<IProps> = ({ chatAction, haveMessages = false }) => {
	const [message, setMessage] = useState<string>("");

	const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (message) {
			await chatAction(message);
		}
	};

	return (
		<div className={`flex w-full justify-center`}>
			<div
				className={`flex flex-col  ${
					haveMessages ? "w-full" : "w-full sm:max-w-4xl"
				}`}
			>
				{!haveMessages && (
					<div className="flex flex-col justify-center items-center w-full">
						<div className="text-center space-y-4 mb-12">
							<h1 className="text-5xl font-serif font-bold text-slate-900 leading-tight">
								Hi, I&apos;m Aura
							</h1>
							<p className="text-3xl font-serif text-slate-800">
								How can I help you?
							</p>
						</div>
					</div>
				)}
				<div className="w-full relative">
					<div className="glass p-1 rounded-3xl inset-shadow-sm shadow-xl shadow-slate-200/50 border border-white">
						<form
							onSubmit={sendMessage}
							className="flex items-center gap-4 bg-white rounded-[1.4rem] p-4 w-full"
						>
							<Input
								className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-slate-300 px-2 active:border-none focus-visible:ring-0"
								placeholder="Talk to me...."
								onChange={(event) => {
									setMessage(event.target.value);
								}}
							/>
							<Button
								className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-600 transition-all active:scale-95"
								type="submit"
							>
								Send
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatInterface;
