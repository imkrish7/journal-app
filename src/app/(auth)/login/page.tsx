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
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/auth";
import z from "zod";
import { toast } from "sonner";
import { loginAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

const Page = () => {
	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const handleLogin = (data: z.infer<typeof loginSchema>) => {
		startTransition(async () => {
			try {
				const response = await loginAction(data);

				if (response.success) {
					toast.success("Login Successful");
					router.push("/dashboard");
				} else {
					toast.error("Failed to login");
				}
			} catch (error) {
				console.error(error);
				toast.error("Login Failed");
			}
		});
	};

	return (
		<div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 relative overflow-hidden">
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] opacity-40"></div>
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-[120px] opacity-40"></div>

			<div className="w-full max-w-md px-4 relative z-10 animate-fade-in">
				<Card className="glass shadow-2xl border-white/50 w-full">
					<CardHeader className="text-center pt-10">
						<div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 shadow-lg shadow-indigo-200">
							<i className="fa-solid fa-feather-pointed text-white text-3xl"></i>
						</div>
						<CardTitle className="text-3xl mb-2">Welcome Back</CardTitle>
						<CardDescription className="text-base">
							Your sanctuary for thought awaits.
						</CardDescription>
					</CardHeader>

					<CardContent className="px-8 pb-10 w-full">
						<div className="w-full">
							<Form {...form}>
								<form
									className="w-full px-4 flex justify-center mt-4"
									onSubmit={form.handleSubmit(handleLogin)}
								>
									<div className="flex w-full relative flex-col gap-4">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem className="w-full">
													<FormLabel className="text-sm font-semibold text-slate-700">
														Username
													</FormLabel>
													<FormControl>
														<div className="flex w-full relative">
															<i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
															<Input
																className="pl-11"
																placeholder="Email..."
																{...field}
															/>
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
											render={({ field }) => (
												<FormItem className="w-full">
													<FormLabel className="text-sm font-semibold text-slate-700">
														Password
													</FormLabel>
													<FormControl>
														<div className="flex w-full relative">
															<i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
															<Input
																type="password"
																placeholder="********************"
																{...field}
																className="pl-11"
															/>
														</div>
													</FormControl>
													<FormDescription />
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className="flex w-full">
											<Button className="w-full mt-2">Login</Button>
										</div>
									</div>
								</form>
							</Form>
							<div className="mt-8 text-center">
								<p className="text-slate-500 text-sm">
									Don&apos;t have an account?
									<Link
										href="/signup"
										className="ml-2 font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
									>
										Sign up free
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
