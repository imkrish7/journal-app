import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
	return (
		<section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
				<div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
				<div
					className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-40 animate-pulse"
					style={{ animationDelay: "2s" }}
				></div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
				<div className="text-center space-y-8 max-w-4xl mx-auto">
					<div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md border border-indigo-100 px-4 py-2 rounded-full text-indigo-600 font-semibold text-sm shadow-sm animate-fade-in">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
						</span>
						Gemini 3.0 Real-time Analysis Enabled
					</div>

					<h1 className="text-5xl lg:text-7xl font-serif font-bold text-slate-900 leading-[1.1] tracking-tight">
						A sanctuary for your <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] animate-gradient-x">
							unfiltered self.
						</span>
					</h1>

					<p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
						Experience the world&apos;s first intuitive journal that listens,
						understands, and grows with you. Turn daily reflections into deep
						personal breakthroughs.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
						<Link
							href="/login"
							className="w-full bg-indigo-500 font-bold text-slate-100 sm:w-auto px-12 py-7 rounded-2xl shadow-2xl shadow-indigo-200"
						>
							Start Your First Entry
						</Link>
						<Button
							className="w-full sm:w-auto px-10 py-7 rounded-2xl"
							size="lg"
							variant="outline"
						>
							Explore Features
						</Button>
					</div>
				</div>

				{/* New Hero Visual: The Insight Stack */}
				<div className="mt-24 relative max-w-4xl mx-auto h-[400px] md:h-[500px]">
					{/* Background Decorative Card (The "Past") */}
					<div className="absolute top-12 left-1/2 -translate-x-[60%] w-[90%] h-[300px] md:h-[400px] bg-slate-100/50 rounded-[2.5rem] border border-slate-200/50 -rotate-6 transition-transform duration-700 hover:-rotate-3"></div>

					{/* Main Journal Card */}
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[320px] md:h-[450px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden group">
						<Image
							src="https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=1200"
							alt="Cherry Blossoms"
							className="w-full h-48 md:h-64 object-cover transform transition-transform duration-1000 group-hover:scale-105"
							width={100}
							height={100}
						/>
						<div className="p-8 md:p-10">
							<div className="flex justify-between items-start mb-4">
								<div>
									<p className="text-indigo-600 font-bold uppercase tracking-widest text-[10px] mb-1">
										Last Entry • March 12, 2024
									</p>
									<h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
										A walk through the cherry blossoms...
									</h3>
								</div>
								<div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
									<i className="fa-solid fa-heart"></i>
								</div>
							</div>
							<p className="text-slate-500 leading-relaxed line-clamp-2 md:line-clamp-3 italic font-serif">
								The air was crisp and smelled of spring. Every petal falling
								felt like a small reminder that change can be beautiful if we
								allow it to be...
							</p>
						</div>
					</div>

					{/* Floating AI Insight Panel */}
					<div className="absolute -bottom-6 md:bottom-12 -right-4 md:right-0 w-64 md:w-80 glass p-6 rounded-3xl border border-white/40 shadow-2xl z-20 animate-float">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs">
								<i className="fa-solid fa-sparkles"></i>
							</div>
							<span className="font-bold text-slate-800 text-sm">
								Aura Insights
							</span>
						</div>

						<div className="space-y-4">
							<div className="space-y-1">
								<div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
									<span>Emotional Tone</span>
									<span className="text-indigo-600">92% Serene</span>
								</div>
								<div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
									<div className="h-full bg-indigo-500 w-[92%]"></div>
								</div>
							</div>

							<div className="flex flex-wrap gap-2">
								<span className="px-2 py-1 bg-white rounded-lg text-[10px] font-bold text-slate-600 border border-slate-100 shadow-sm">
									#Mindfulness
								</span>
								<span className="px-2 py-1 bg-white rounded-lg text-[10px] font-bold text-slate-600 border border-slate-100 shadow-sm">
									#Nature
								</span>
								<span className="px-2 py-1 bg-white rounded-lg text-[10px] font-bold text-slate-600 border border-slate-100 shadow-sm">
									#Spring
								</span>
							</div>

							<p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100/50 pt-3">
								This entry reflects a strong connection to environment. Consider
								exploring how nature affects your creativity next time.
							</p>
						</div>
					</div>

					{/* Floating Icon Badges */}
					<div
						className="absolute top-1/4 -left-8 md:-left-12 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 animate-float"
						style={{ animationDelay: "1s" }}
					>
						<i className="fa-solid fa-microphone text-indigo-600 text-xl"></i>
					</div>
					<div
						className="absolute top-1/2 -left-4 md:-left-6 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 animate-float"
						style={{ animationDelay: "1.5s" }}
					>
						<i className="fa-solid fa-camera text-purple-600 text-xl"></i>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
