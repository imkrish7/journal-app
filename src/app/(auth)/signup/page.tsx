"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schema/auth";

const Page = () => {
	const form = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});
	return (
		<div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 relative overflow-hidden">
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] opacity-40"></div>
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-[120px] opacity-40"></div>

			<div className="w-full max-w-md px-4 relative z-10 animate-fade-in">
				<Card className="glass shadow-2xl border-white/50">
					<CardHeader className="text-center pt-10">
						<div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 shadow-lg shadow-indigo-200">
							<i className="fa-solid fa-feather-pointed text-white text-3xl"></i>
						</div>
						<CardTitle className="text-3xl mb-2">Join Aura</CardTitle>
						<CardDescription className="text-base">
							Start your journey of self-discovery today.
						</CardDescription>
					</CardHeader>

					<CardContent className="px-8 pb-10">
						<div className="w-full rounded-md sm:rounded-l-md sm:h-full flex flex-col items-center justify-center">
							<Form {...form}>
								<form className="w-full px-4 flex justify-center">
									<div className="flex w-full relative flex-col">
										<FormField
											control={form.control}
											name="name"
											render={() => (
												<FormItem className="w-full">
													<FormLabel className="text-sm font-semibold text-slate-700 ml-1">
														Name
													</FormLabel>
													<FormControl>
														<div className="flex w-full relative">
															<i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
															<Input className="pl-11" placeholder="John doe" />
														</div>
													</FormControl>
													<FormDescription />
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="email"
											render={() => (
												<FormItem className="w-full">
													<FormLabel className="text-sm font-semibold text-slate-700 ml-1">
														Email
													</FormLabel>
													<FormControl>
														<div className="flex w-full relative">
															<i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
															<Input className="pl-11" placeholder="Email..." />
														</div>
													</FormControl>
													<FormDescription />
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="password"
											render={() => (
												<FormItem className="w-full">
													<FormLabel className="text-sm font-semibold text-slate-700 ml-1">
														Password
													</FormLabel>
													<FormControl>
														<div className="flex w-full relative">
															<i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

															<Input
																type="password"
																className="pl-11"
																placeholder="********************"
															/>
														</div>
													</FormControl>
													<FormDescription />
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="flex w-full">
											<Button type="submit" className="w-full mt-2" size="lg">
												{/* <i className="fa-solid fa-circle-notch animate-spin mr-2"></i> */}
												Create Account
											</Button>
										</div>
									</div>
								</form>
							</Form>
							<div className="mt-8 text-center">
								<p className="text-slate-500 text-sm">
									Already have an account?
									<Link
										href="/login"
										className="ml-2 font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
									>
										Log in here
									</Link>
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Page;
