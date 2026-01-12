import Link from "next/link";
import React from "react";

interface NavbarProps {
	onNavigate: (page: "landing" | "app" | "login" | "signup") => void;
	currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({}) => {
	return (
		<nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-20">
					<Link
						className="flex items-center gap-2 cursor-pointer group"
						href="/"
					>
						<div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
							<i className="fa-solid fa-feather-pointed text-white text-xl"></i>
						</div>
						<span className="text-2xl font-serif font-bold tracking-tight text-slate-800">
							Aura
						</span>
					</Link>

					<div className="hidden md:flex items-center space-x-8">
						{/* <a
								href="#features"
								className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
							>
								Features
							</a> */}
						<Link
							href="/login"
							className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
						>
							Log In
						</Link>

						<Link
							href="/signup"
							className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95"
						>
							Get Started Free
						</Link>
					</div>

					<div className="md:hidden">
						<button className="text-slate-600 p-2">
							<i className="fa-solid fa-bars text-2xl"></i>
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
