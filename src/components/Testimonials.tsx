import Image from "next/image";
import React from "react";

const Testimonials = () => {
	return (
		<section className="py-24 bg-slate-50 relative overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
				<i className="fa-solid fa-quote-left text-6xl text-indigo-200 mb-8"></i>
				<p className="text-3xl font-serif italic text-slate-800 max-w-3xl mx-auto mb-12 leading-snug">
					Aura has completely transformed my relationship with my own thoughts.
					The AI insights often reveal patterns I hadn&apos;t noticed
					myself&quot;
				</p>
				<div className="flex items-center justify-center gap-4">
					<Image
						src="https://picsum.photos/seed/user1/100/100"
						className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
						alt="User"
						width={100}
						height={100}
					/>
					<div className="text-left">
						<p className="font-bold text-slate-900 text-lg">Sarah Jenkins</p>
						<p className="text-slate-500">Creative Director</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
