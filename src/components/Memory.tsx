import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const Memory = () => {
	return (
		<Card className="">
			<CardContent>
				<div className="grid grid-cols-3 gap-2">
					<div className="w-[180px] h-[200px]">
						<Image
							src={
								"https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg"
							}
							alt="Memory001"
							width={100}
							height={100}
							className="w-[100%] h-[100%] rounded-md"
						/>
					</div>
					<div className="col-span-2 flex ml-2 flex-col">
						<div className="flex gap-2">
							<div className="flex text-gray-100 justify-center items-center flex-col w-[60px] h-[60px] rounded bg-violet-300">
								<span className="text-lg font-semibold">
									{months[new Date().getUTCMonth()]}
								</span>
								<span className="text-2xl font-semibold">
									{new Date().getDate()}
								</span>
							</div>
							<div>
								<span className="text-2xl font-semibold">What to do next?</span>
							</div>
						</div>
						<div className="flex-1">
							<p className="text-sm font-medium text-gray-400">
								Would you like me to show an example of a sidebar menu with
								multiple Lottie icons (animated on hover) — something like a
								modern dashboard sidebar?
							</p>
						</div>
						<div>Comming soon...</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Memory;
