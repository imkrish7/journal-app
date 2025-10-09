import Memory from "@/components/Memory";
import React from "react";

const page = () => {
	return (
		<div className="flex flex-col w-full items-center">
			<div className="w-xl flex flex-col">
				<div className="w-full border-b-2 pb-4 mb-4">
					<span className="text-2xl font-semibold">Memory</span>
				</div>
				<div className="flex flex-col">
					<Memory />
				</div>
			</div>
		</div>
	);
};

export default page;
