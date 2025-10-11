import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { fullLogoFont } from "@/fonts";

const Features = () => {
	return (
		<div className="min-h-inherit w-full relative">
			<Card className="p-[80px] border-none shadow-none bg-transparent backdrop-blur-[10px] min-h-inherit opacity-50">
				<CardHeader>
					<CardTitle className="text-center flex flex-col gap-2">
						<span className={`${fullLogoFont.className} text-4xl`}>
							Your Companion
						</span>
						<span className="text-lg">Stuff you can do together.</span>
						<span className="">
							Drop memes, swap stories, vent, or vibe — your AI bestie gets your
							energy and keeps it real.
						</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-3 gap-2">
						<div className="bg-white relative rounded-md w-xs opacity-80 shadow ml-2 h-[200px] backdrop-blur-lg p-2 flex flex-col justify-center">
							<span className="text-lg font-semibold text-gray-500">
								Make it personal.
							</span>
							<span className="text-sm">
								Got a cool name in mind? Your AI bestie’s waiting for it.
							</span>
							<div className="bg-gray-500 backdrop-blur-xs w-full sm:w-8 h-8 rounded-full absolute animate-bounce top-1 opacity-40 max-sm:right-0 sm:left-16 z-0"></div>
							<div className="bg-green-400 backdrop-blur-xs rounded-md w-full sm:w-20 h-10 rotate-45 absolute bottom-0 -left-0 opacity-20 z-0"></div>
							<div className="bg-red-300 backdrop-blur-xs animate-wiggle rounded-bl-[100px] w-full sm:w-20 h-20 absolute top-0 right-0 opacity-20 z-0"></div>
							<div className="bg-indigo-300 backdrop-blur-xs -rotate-45 w-full sm:w-20 h-20 absolute bottom-10 right-10 opacity-40 z-0"></div>
						</div>
						<div className="bg-white rounded-md w-xs opacity-80 shadow ml-2 h-[200px] backdrop-blur-lg p-2 flex flex-col justify-center items center">
							<span className="text-lg font-semibold text-gray-500">
								Build a bond that remembers.
							</span>
							<span className="text-sm">
								Share memories, stories, and moments — your AI companion keeps
								them close, so every chat feels more personal.
							</span>
							<div className="bg-gray-500 backdrop-blur-xs w-full sm:w-8 h-8 rounded-full absolute animate-bounce top-1 opacity-40 max-sm:right-0 sm:left-16 z-0"></div>
							<div className="bg-amber-400 backdrop-blur-xs rounded-md w-full sm:w-20 h-10 absolute top-0 right-0 opacity-20 z-0"></div>
							<div className="bg-red-300 backdrop-blur-xs rounded-tl-[100px] w-full sm:w-20 h-20 absolute bottom-0 right-0 opacity-20 z-0"></div>
							<div className="bg-indigo-300 backdrop-blur-xs w-full sm:w-20 h-20 absolute bottom-0 left-0 opacity-40 z-0"></div>
						</div>
						<div className="bg-white rounded-md w-xs opacity-80 shadow ml-2 h-[200px] backdrop-blur-lg p-2 flex flex-col justify-center items center">
							<span className="text-lg font-semibold text-gray-500">
								Ask once, consider it done.
							</span>
							<span className="text-sm">
								Schedule reminders or tasks directly through your chat — your AI
								companion makes sure you never miss what matters.
							</span>
							<div className="bg-gray-500 backdrop-blur-xs w-full sm:w-8 h-8 rounded-full absolute animate-bounce top-1 opacity-40 max-sm:right-0 sm:left-16 z-0"></div>
							<div className="bg-red-400 backdrop-blur-xs rounded-md w-full sm:w-20 h-10 absolute top-10 right-10 opacity-20 z-0"></div>
							<div className="bg-red-300 backdrop-blur-xs rounded-tl-[100px] w-full sm:w-20 h-20 absolute bottom-0 left-10 opacity-20 z-0"></div>
							<div className="bg-indigo-300 backdrop-blur-xs w-full sm:w-20 h-20 absolute bottom-0 right-0 opacity-40 z-0"></div>
						</div>
					</div>
				</CardContent>
			</Card>
			<div className="bg-indigo-400 backdrop-blur-xs w-full sm:w-40 h-40 rounded-full absolute top-1 opacity-20 max-sm:right-0 sm:left-16 z-0"></div>
			<div className="bg-amber-400 backdrop-blur-xs rounded-md w-full sm:w-40 h-40 rotate-45 absolute bottom-30 -left-0 opacity-20 z-0"></div>
			<div className="bg-red-300 backdrop-blur-xs rounded-bl-[100px] w-full sm:w-40 h-40 absolute top-0 right-0 opacity-20 z-0"></div>
			<div className="bg-white backdrop-blur-xs w-full sm:w-40 h-40 rounded-full absolute bottom-40 opacity-20 right-0  z-0"></div>
		</div>
	);
};

export default Features;
