"use client";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";

export default function Home() {
	return (
		<div className="pt-20">
			{/* Hero Section */}
			<Hero />
			<Features />
			<Testimonials />
			<CTA />
			<Footer />
		</div>
	);
}
