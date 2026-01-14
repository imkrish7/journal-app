import Link from "next/link";

const CTA = () => {
	return (
		<section className="py-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-300">
					<div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
					<div className="relative z-10 space-y-8">
						<h2 className="text-4xl lg:text-6xl font-serif font-bold">
							Begin your journey of self-discovery.
						</h2>
						<p className="text-xl text-indigo-100 max-w-2xl mx-auto">
							Join 50,000+ others who use Aura to bring clarity to their minds
							and purpose to their days.
						</p>
						<Link
							href="/signup"
							className="px-12 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all hover:scale-105 shadow-xl"
						>
							Try Aura Free
						</Link>
						<div className="h-2" />
						<p className="text-sm text-indigo-200">
							No credit card required • 14-day free trial
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CTA;
