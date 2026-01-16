import {
	X,
	Calendar,
	Flag,
	Tag as TagIcon,
	Plus,
	ListTodo,
	CheckCircle2,
} from "lucide-react";
import { Priority, SubTask } from "@/interface/jouranal";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
} from "./ui/dialog";
import { useState } from "react";

interface NewTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
	isOpen,
	onClose,
}) => {
	const [subtasks, setSubtasks] = useState<SubTask[]>([]);
	const [tags, setTags] = useState<string[]>([]);
	const [newTag, setNewTag] = useState("");

	const addTag = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && newTag.trim()) {
			if (!tags.includes(newTag.trim())) {
				setTags([...tags, newTag.trim()]);
			}
			setNewTag("");
		}
	};
	const addSubtask = () => {
		setSubtasks([
			...subtasks,
			{
				id: Math.random().toString(36).substr(2, 9),
				title: "",
				completed: false,
			},
		]);
	};

	const removeTag = (tag: string) => {
		setTags(tags.filter((t) => t !== tag));
	};

	const updateSubtask = (id: string, text: string) => {
		setSubtasks(subtasks.map((s) => (s.id === id ? { ...s, title: text } : s)));
	};
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogOverlay className="backdrop-blur-xl bg-white/80" />

			<DialogContent className="h-full">
				<DialogHeader>
					<DialogTitle>
						<div className="border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
									<Plus className="w-6 h-6" />
								</div>
								<h2 className="text-xl font-semibold text-gray-800">
									Create New Task
								</h2>
							</div>
						</div>
					</DialogTitle>
				</DialogHeader>
				<form
					action={() => {}}
					className="flex-1 overflow-y-auto p-2 space-y-8 scrollbar-hide"
				>
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
								Task Title
							</label>
						</div>
						<input
							autoFocus
							placeholder="What are we working on?"
							className="w-full text-2xl font-serif italic text-gray-800 bg-transparent border-none focus:ring-0 placeholder:text-gray-200"
						/>
					</div>

					<div className="space-y-2">
						<label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
							Description
						</label>
						<textarea
							placeholder="Add some context or details..."
							rows={2}
							className="w-full text-gray-600 bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
						/>
					</div>

					<div className="grid grid-cols-2 gap-6">
						<div className="space-y-2">
							<label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
								<Calendar className="w-3.5 h-3.5" /> Due Date
							</label>
							<input
								type="date"
								className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-100"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
								<Flag className="w-3.5 h-3.5" /> Priority
							</label>
							<select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-100">
								<option value={Priority.LOW}>Low Intensity</option>
								<option value={Priority.MEDIUM}>Focused</option>
								<option value={Priority.HIGH}>High Impact</option>
							</select>
						</div>
					</div>

					<div className="space-y-2">
						<label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
							<TagIcon className="w-3.5 h-3.5" /> Tags
						</label>
						<div className="flex flex-wrap gap-2 mb-2">
							{tags.map((tag) => (
								<span
									key={tag}
									className="flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full border border-indigo-100"
								>
									{tag}
									<X
										onClick={() => removeTag(tag)}
										className="w-3 h-3 cursor-pointer"
									/>
								</span>
							))}
						</div>
						<input
							value={newTag}
							onChange={(e) => {
								setNewTag(e.target.value);
							}}
							onKeyDown={addTag}
							placeholder="Press Enter to add tags..."
							className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm text-gray-600 focus:ring-2 focus:ring-indigo-100"
						/>
					</div>

					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
								<ListTodo className="w-3.5 h-3.5" /> Breakdown
							</label>
							<button
								onClick={addSubtask}
								type="button"
								className="text-xs font-semibold text-indigo-600 hover:underline"
							>
								+ Add Step
							</button>
						</div>
						<div className="space-y-2">
							{subtasks.map((sub, index) => (
								<div key={sub.id} className="flex items-center gap-3 group">
									<div className="w-2 h-2 rounded-full bg-gray-300" />
									<input
										value={sub.title}
										onChange={(e) => updateSubtask(sub.id, e.target.value)}
										placeholder={`Step ${index + 1}...`}
										className="flex-1 text-sm bg-transparent border-none p-0 focus:ring-0 text-gray-600 placeholder:text-gray-300"
									/>
									<button
										type="button"
										onClick={() =>
											setSubtasks(subtasks.filter((s) => s.id !== sub.id))
										}
										className="opacity-0 group-hover:opacity-100 transition-opacity"
									>
										<X className="w-4 h-4 text-gray-300" />
									</button>
								</div>
							))}
						</div>
					</div>
					<DialogFooter>
						<div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
							<button
								type="button"
								onClick={onClose}
								className="px-6 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
							>
								Cancel
							</button>
							<button className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 active:scale-95">
								<CheckCircle2 className="w-4 h-4" />
								Save Task
							</button>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
