// LEGACY MEMORY
// : (
// 									<div className="space-y-12">
// 										<div className="flex justify-between items-start">
// 											<div className="space-y-2">
// 												<p className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
// 													{activeEntry.date}
// 												</p>
// 												<h1 className="text-5xl font-serif font-bold text-slate-900 leading-tight">
// 													{activeEntry.title || "Untitled"}
// 												</h1>
// 												<Badge
// 													variant="secondary"
// 													className="mt-2 text-sm px-4 py-1"
// 												>
// 													Mood: {activeEntry.mood}
// 												</Badge>
// 											</div>
// 											<div className="flex gap-2">
// 												<Button
// 													variant="outline"
// 													size="icon"
// 													onClick={() => setIsEditing(true)}
// 													className="rounded-xl"
// 												>
// 													<i className="fa-solid fa-pen-to-square"></i>
// 												</Button>
// 												<Button
// 													variant="outline"
// 													size="icon"
// 													onClick={() => deleteEntry(activeEntry.id)}
// 													className="rounded-xl hover:text-red-600 hover:border-red-200"
// 												>
// 													<i className="fa-solid fa-trash"></i>
// 												</Button>
// 											</div>
// 										</div>

// 										<div className="text-xl text-slate-700 leading-relaxed whitespace-pre-wrap font-light">
// 											{activeEntry.content}
// 										</div>

// 										{/* {(activeEntry.aiInsight || activeEntry.aiSummary) && (
// 									<Card className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 border-indigo-100 space-y-6">
// 										<div className="flex items-center gap-2 text-indigo-600">
// 											<i className="fa-solid fa-sparkles animate-pulse"></i>
// 											<span className="font-bold uppercase tracking-widest text-xs">
// 												Aura Reflection
// 											</span>
// 										</div>
// 										{activeEntry.aiSummary && (
// 											<div className="space-y-2">
// 												<h4 className="font-bold text-slate-900">
// 													The Core Narrative
// 												</h4>
// 												<p className="text-slate-600 leading-relaxed">
// 													{activeEntry.aiSummary}
// 												</p>
// 											</div>
// 										)}
// 										{activeEntry.aiInsight && (
// 											<div className="space-y-2">
// 												<h4 className="font-bold text-slate-900">
// 													Growth Catalyst
// 												</h4>
// 												<p className="text-slate-700 italic leading-relaxed border-l-4 border-indigo-200 pl-4 bg-white/40 p-3 rounded-r-xl">
// 													"{activeEntry.aiInsight}"
// 												</p>
// 											</div>
// 										)}
// 										{activeEntry.tags && activeEntry.tags.length > 0 && (
// 											<div className="flex flex-wrap gap-2 pt-2">
// 												{activeEntry.tags.map((tag) => (
// 													<Badge
// 														key={tag}
// 														variant="outline"
// 														className="bg-white/50 border-indigo-100 text-indigo-600"
// 													>
// 														#{tag}
// 													</Badge>
// 												))}
// 											</div>
// 										)}
// 									</Card>
// 								)} */}
// 									</div>
// 								)}
// 							</div>
// 						) : (
// 							<div className="h-full flex flex-col items-center justify-center text-center space-y-6 max-w-xl mx-auto opacity-80">
// 								<div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mb-4 transform hover:scale-110 transition-transform">
// 									<i className="fa-solid fa-feather-pointed text-4xl text-indigo-600"></i>
// 								</div>
// 								<h2 className="text-3xl font-serif font-bold text-slate-900">
// 									Begin Your Reflection
// 								</h2>
// 								<Card className="p-6 bg-white border-dashed border-indigo-200 shadow-none">
// 									<p className="text-slate-600 leading-relaxed italic text-lg">
// 										{inspiration}
// 									</p>
// 								</Card>
// 								<Button
// 									onClick={createNewEntry}
// 									variant="secondary"
// 									size="lg"
// 									className="mt-4 px-10"
// 								>
// 									Write Your First Page
// 								</Button>
// 							</div>
// 						)}
