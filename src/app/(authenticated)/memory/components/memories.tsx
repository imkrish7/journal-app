"use client";
import { getMemories } from "@/lib/memoryService";
import React, { useEffect, useTransition, useState } from "react";
import Loading from "../../loading";
import Memory from "@/components/Memory";
import { IMemory } from "@/interface/memory";
import { toast } from "sonner";

const Memories = () => {
	const [isPending, startTransition] = useTransition();
	const [memories, setMemories] = useState<IMemory[]>([]);

	useEffect(() => {
		startTransition(async () => {
			try {
				const result = await getMemories();
				setMemories(result.data);
			} catch (error) {
				console.error("Error fetching memories:", error);
				toast.error("Failed to fetch memories");
			}
		});
	}, []);

	return (
		<div className="w-full h-full">
			<div className="w-full h-full flex items-center gap-4 flex-col overflow-auto">
				{isPending ? (
					<Loading />
				) : (
					memories.map((memory) => {
						return <Memory memory={memory} key={memory.id} />;
					})
				)}
			</div>
		</div>
	);
};

export default Memories;
