import React from "react";
import ChtaBotLottie from "./icons/ChatBotLottie";
import { fullLogoFont } from "@/fonts";

const Hero = () => {
	return (
		<div className="relative w-full min-h-inherit">
			<div className="z-1 absolute w-full md:w-3xl h-[100px] md:h-[450px] top-[50%] left-[50%] translate-[-50%] flex flex-col items-center justify-center">
				<div className="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-100 text-center flex flex-col gap-2">
					<span className="mb-2 flex gap-2 justify-center">
						Just
						<p className={`text-gradient ${fullLogoFont.className}`}>You</p>
						and
					</span>
					<span className="inline-flex items-center gap-2">
						your <p className={`gradient`}>AI</p>
						<p className={`${fullLogoFont.className}`}>Companion.</p>
					</span>
				</div>

				<div className="w-full mt-5 text-center md:w-xl lg:w-3xl sm:w-lg">
					<span className="text-xl md:text-xl lg:text-3xl text-gray-400">
						Connect with an AI that listens deeply, remembers your story, and
						helps you grow through real conversations.
					</span>
				</div>
			</div>
			<div className="absolute top-[50%] left-[50%] translate-[-50%] h-400 w-90 md:h-[800px]  md:w-[600px] lg:h-[800px] lg:w-[800px] -z-0">
				<ChtaBotLottie />
			</div>
			<div className="bg-gray-100 backdrop-blur-xs w-8 h-8 left-10 sm:w-40 sm:h-40 rounded-full absolute animate-bounce top-1 opacity-40 sm:left-16 z-0"></div>
			<div className="bg-green-200 backdrop-blur-xs w-8 h-4 rounded-md sm:w-40 sm:h-24 rotate-45 absolute bottom-0 -left-0 opacity-20 z-0"></div>
			<div className="bg-red-300 backdrop-blur-xs animate-wiggle rounded-bl-[100px] w-8 h-8 sm:w-40 sm:h-40 absolute top-0 right-0 opacity-20 z-0"></div>
			<div className="bg-gray-100 backdrop-blur-xs -rotate-45 rounded-t-[100px]  w-8 h-8 sm:w-30 sm:h-40 absolute bottom-10 right-10 opacity-40 z-0"></div>
			<div className="bg-gray-100 backdrop-blur-xs w-12 h-12 sm:w-40 sm:h-40 rounded-full absolute bottom-40 opacity-20 right-0  z-0"></div>
		</div>
	);
};

export default Hero;
