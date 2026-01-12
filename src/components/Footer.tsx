const Footer = () => {
	return (
		<footer className="py-12 border-t border-slate-100 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row justify-between items-center gap-8">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
							<i className="fa-solid fa-feather-pointed text-white text-sm"></i>
						</div>
						<span className="text-xl font-serif font-bold tracking-tight text-slate-800">
							Aura
						</span>
					</div>
					<div className="flex gap-8 text-slate-500 font-medium">
						<a href="#" className="hover:text-indigo-600 transition-colors">
							Privacy
						</a>
						<a href="#" className="hover:text-indigo-600 transition-colors">
							Terms
						</a>
						<a href="#" className="hover:text-indigo-600 transition-colors">
							Twitter
						</a>
						<a href="#" className="hover:text-indigo-600 transition-colors">
							Support
						</a>
					</div>
					<p className="text-slate-400 text-sm">
						© 2024 Aura Journal Inc. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
