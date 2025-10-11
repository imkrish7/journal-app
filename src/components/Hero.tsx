import React from "react";
import ChtaBotLottie from "./icons/ChatBotLottie";
import { fullLogoFont } from "@/fonts";

const Hero = () => {
	return (
		<div className="relative w-full">
			<div className="absolute w-4xl h-[450px] right-60 top-20 flex flex-col items-center justify-center">
				<div className="text-6xl font-bold text-gray-100 text-center flex flex-col gap-2">
					<span className="mb-2 flex gap-2 justify-center">
						Just
						<p className={`text-gradient ${fullLogoFont.className}`}>You</p>
						and
					</span>
					<span className="inline-flex items-center gap-2">
						your AI
						<p className={`${fullLogoFont.className}`}>Companion.</p>
					</span>
				</div>

				<div className="w-xl mt-5">
					<span className="text-xl text-gray-400">
						Connect with an AI that listens deeply, remembers your story, and
						helps you grow through real conversations.
					</span>
				</div>
			</div>
			<div className="">
				<ChtaBotLottie />
			</div>
			<div className="bg-gray-100 backdrop-blur-xs w-full sm:w-40 h-40 rounded-full absolute animate-bounce top-1 opacity-40 max-sm:right-0 sm:left-16 z-0"></div>
			<div className="bg-green-200 backdrop-blur-xs rounded-md w-full sm:w-40 h-24 rotate-45 absolute bottom-30 -left-0 opacity-20 z-0"></div>
			<div className="bg-red-300 backdrop-blur-xs animate-wiggle rounded-bl-[100px] w-full sm:w-40 h-40 absolute top-0 right-0 opacity-20 z-0"></div>
			<div className="bg-gray-100 backdrop-blur-xs -rotate-45 rounded-t-[100px] w-full sm:w-30 h-40 absolute bottom-10 right-10 opacity-40 z-0"></div>
			<div className="bg-gray-100 backdrop-blur-xs w-full sm:w-40 h-40 rounded-full absolute bottom-40 opacity-20 right-0  z-0"></div>
		</div>
	);
};

export default Hero;
