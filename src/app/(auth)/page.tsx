"use client";
import Features from "@/components/Features";
import Hero from "@/components/Hero";

export default function Home() {
	return (
		<div className="min-h-inherit w-full relative">
			{/* Hero Section */}
			<Hero />
			<Features />
		</div>
	);
}
