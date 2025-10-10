import React, { FC } from "react";
import RobotLottie from "./icons/RobotLottie";
import { Avatar, AvatarImage } from "./ui/avatar";

interface IProps {
	who: "AI" | "USER";
	userAvatarLink: string | undefined;
	message: string;
}

const Message: FC<IProps> = ({ who, userAvatarLink, message }) => {
	return (
		<div
			className={`flex flex-col items-end ${
				who == "AI" ? "items-end" : "items-start"
			}`}
		>
			<div className={`w-[40px] h-[40px] rounded-full bg-gray-200 p-1`}>
				{who === "AI" ? (
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
			<div className={`w-[50%]`}>
				<div
					className={`px-2 py-1 bg-violet-100 shadow-md shadow-violet-100 backdrop-blur-xs rounded-md inline-flex`}
				>
					<div className="flex flex-col">
						<span className={`text-sm font-normal text-violet-500 inline-flex`}>
							{message}
						</span>
						<div
							className={`flex ${
								who === "AI" ? "justify-end" : "justify-start"
							}`}
						>
							<span className="text-xs font-medium text-gray-400">
								{`${new Date().getHours()}:${new Date().getMinutes()}`}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Message;
