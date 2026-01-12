const Features = () => {
	return (
		<section id="features" className="py-24 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-3">
						Capabilities
					</h2>
					<p className="text-4xl font-serif font-bold text-slate-900">
						Designed for Reflection
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{[
						{
							icon: "fa-brain",
							title: "AI Insights",
							desc: "Gemini analyzes your tone and content to provide meaningful reflections and psychological themes.",
						},
						{
							icon: "fa-microphone-lines",
							title: "Multi-Modal",
							desc: "Journal through text, voice recordings, or photos. Aura understands them all seamlessly.",
						},
						{
							icon: "fa-shield-halved",
							title: "Private & Secure",
							desc: "Your thoughts are yours. Industry-leading encryption ensures your privacy is never compromised.",
						},
						{
							icon: "fa-chart-line",
							title: "Mood Tracking",
							desc: "Visualize your emotional landscape over time with intelligent mood graphs and pattern spotting.",
						},
						{
							icon: "fa-wand-magic-sparkles",
							title: "Guided Prompts",
							desc: "Never face a blank page. Get personalized prompts based on your recent entries and goals.",
						},
						{
							icon: "fa-calendar-check",
							title: "Daily Habits",
							desc: "Build consistency with gentle reminders and streaks that celebrate your personal growth journey.",
						},
					].map((f, i) => (
						<div
							key={i}
							className="p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50 transition-all group"
						>
							<div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
								<i
									className={`fa-solid ${f.icon} text-indigo-600 text-xl group-hover:text-white`}
								></i>
							</div>
							<h3 className="text-xl font-bold text-slate-900 mb-3">
								{f.title}
							</h3>
							<p className="text-slate-600 leading-relaxed">{f.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
