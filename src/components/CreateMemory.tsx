import { useTransition } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent } from "./ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { MemorySchema } from "@/schema/memory";
import { createMemory } from "@/lib/memoryService";
import z from "zod";
import { toast } from "sonner";
import Loading from "@/app/(authenticated)/loading";

const CreateMemory = () => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof MemorySchema>>({
		defaultValues: {
			title: "",
			content: "",
			tags: "",
		},
	});

	const saveEntry = (data: z.infer<typeof MemorySchema>) => {
		startTransition(async () => {
			try {
				await createMemory(data);
				form.reset();
				toast.success("Memory saved successfully!");
			} catch (error) {
				toast.error(`Failed to save memory: ${JSON.stringify(error)}`);
			}
		});
	};

	return (
		<Dialog defaultOpen={true}>
			<DialogContent className="h-full min-w-4xl">
				<div className="h-full bg-slate-50 flex flex-col md:flex-row relative">
					<main className="flex-1 p-6 md:p-12 overflow-y-auto h-full">
						{isPending ? (
							<Loading />
						) : (
							<form onSubmit={form.handleSubmit(saveEntry)}>
								<div className="relative h-full max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
									<div className="space-y-6 relative h-full">
										<Controller
											name="title"
											control={form.control}
											render={({ field }) => (
												<input
													{...field}
													type="text"
													placeholder="Give your entry a title..."
													className="w-full text-4xl font-serif font-bold bg-transparent border-none outline-none placeholder:text-slate-300 focus:ring-0"
												/>
											)}
										/>

										<Controller
											name="content"
											control={form.control}
											render={({ field }) => (
												<Textarea
													{...field}
													placeholder="How are you really feeling today?"
													className="w-full min-h-[400px] text-lg bg-transparent border-none outline-none resize-none placeholder:text-slate-300 focus:ring-0 leading-relaxed shadow-none"
												/>
											)}
										/>
										<div className="flex gap-4 sticky bottom-0 p-4 glass rounded-3xl border border-white/50 shadow-2xl z-20">
											<Button
												type="submit"
												className="flex-1"
												size="lg"
												variant="secondary"
											>
												Save Entry
											</Button>
											<Button variant="outline" size="lg">
												Cancel
											</Button>
										</div>
									</div>
								</div>
							</form>
						)}
					</main>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CreateMemory;
