"use client";
import React, { useState, useEffect } from "react";

const Loading: React.FC = () => {
	const [messageIndex, setMessageIndex] = useState(0);
	const messages = [
		"Calibrating your space...",
		"Gathering your memories...",
		"Setting the mood...",
		"Finding your flow...",
		"Preparing your aura...",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setMessageIndex((prev) => (prev + 1) % messages.length);
		}, 1500);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative bg-transparent z-[100] w-full h-full flex flex-col items-center justify-center overflow-hidden">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
				<div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 via-purple-100 to-yellow-100 rounded-full blur-[100px] animate-pulse opacity-40"></div>
				<div className="absolute inset-0 bg-gradient-to-bl from-blue-100 via-transparent to-indigo-50 rounded-full blur-[120px] animate-spin-slow opacity-30"></div>
			</div>

			<div className="relative flex flex-col items-center space-y-8 animate-in fade-in zoom-in-95 duration-1000">
				<div className="relative group">
					<div className="absolute inset-0 bg-indigo-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
					<div className="relative w-20 h-20 bg-indigo-600 rounded-[28px] flex items-center justify-center shadow-2xl shadow-indigo-200">
						<i className="fa-solid fa-feather-pointed text-white text-4xl animate-pulse"></i>
					</div>
				</div>

				<div className="text-center space-y-2">
					<h1 className="text-4xl font-bold tracking-tight serif italic text-slate-900">
						Aura
					</h1>
					<div className="h-4 flex items-center justify-center overflow-hidden">
						<p className="text-sm font-medium text-slate-400 animate-in slide-in-from-bottom-2 duration-500 key={messageIndex}">
							{messages[messageIndex]}
						</p>
					</div>
				</div>

				<div className="w-48 h-[2px] bg-slate-100 rounded-full overflow-hidden mt-8">
					<div className="h-full bg-indigo-600 rounded-full animate-loader-progress"></div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
