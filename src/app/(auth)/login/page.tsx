"use client";
import RobotLottie from "@/components/icons/RobotLottie";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/auth";
import z from "zod";

const Page = () => {
	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleLogin = (data: z.infer<typeof loginSchema>) => {
		console.log(data);
	};
	return (
		<div className="w-full min-h-inherit flex items-center justify-center">
			<Card className="w-5xl p-0 border-0 shadown-0">
				<CardContent className="grid grid-cols-2 h-[550px] p-0">
					<div className="w-full background rounded-l-md h-full flex flex-col items-center justify-center">
						<div className="text-4xl my-2">
							<span className="text-gray-100 font-semibold">Welcome back</span>
						</div>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(handleLogin)}>
								<div className="flex relative mt-4 flex-col gap-4">
									<FormField
										control={form.control}
										name="email"
										render={() => (
											<FormItem>
												<FormLabel className="text-gray-100">Email</FormLabel>
												<FormControl>
													<div className="flex w-sm">
														<Input placeholder="Email..." />
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
											<FormItem>
												<FormLabel className="text-gray-100">
													Password
												</FormLabel>
												<FormControl>
													<div className="flex w-sm">
														<Input placeholder="********************" />
													</div>
												</FormControl>
												<FormDescription />
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="flex w-sm">
										<Button className="bg-gray-100 text-gray-400">Login</Button>
									</div>
									<span className="absolute bottom-8 right-0">
										<Link
											className="text-gray-100 font-semibold underline"
											href={"/forget-password"}
										>
											Forgot Password?
										</Link>
									</span>
								</div>
							</form>
						</Form>
						<div className="flex">
							<span className="text-gray-100 font-semibold gap-1 flex">
								Don't have account?
								<Link className="underline text-blue-500" href={"/signup"}>
									Signup
								</Link>
							</span>
						</div>
					</div>
					<div className=" relative background rounded-r-md">
						<div className="bg-gray-100 w-full sm:w-40 h-40 rounded-full absolute top-1 opacity-20 max-sm:right-0 sm:left-56 z-0"></div>
						<div className="bg-gray-100 rounded-md w-full sm:w-40 h-24 absolute top-0 -left-0 opacity-20 z-0"></div>
						<div className="bg-gray-100 rounded-t-[100px] w-full sm:w-30 h-40 absolute top-40 -left-0 opacity-20 z-0"></div>
						<div className="w-full relative backdrop-blur-3xl"></div>
						<div className="bg-gray-100 w-full sm:w-40 h-40 rounded-full absolute bottom-40 opacity-20 right-0  z-0"></div>
						<div className="bg-gray-100 rounded-md w-full sm:w-50 h-20 absolute bottom-0 right-40 opacity-20 z-0"></div>
						<div className="bg-gray-100 rounded-t-[100px] w-full sm:w-30 h-40 absolute bottom-0 right-0 opacity-20 z-0"></div>
						<RobotLottie />
					</div>
				</CardContent>
			</Card>
			<div className="background w-full sm:w-40 h-40 rounded-full absolute animate-bounce top-1 opacity-20 max-sm:right-0 sm:left-16 z-0"></div>
			<div className="background rounded-md w-full sm:w-40 h-24 rotate-45 absolute top-30 -left-0 opacity-20 z-0"></div>
			<div className="background rounded-tl-[100px] rounded-br-[100px] rounded-md w-full sm:w-40 h-40 absolute bottom-0 left-0 opacity-20 z-0"></div>

			<div className="background -rotate-45 rounded-t-[100px] rounded-b-[100px] w-full sm:w-30 h-40 absolute bottom-10 right-10 opacity-20 z-0"></div>

			<div className="background animate-pulse w-full sm:w-40 h-40 rounded-full absolute bottom-40 opacity-20 right-0  z-0"></div>
		</div>
	);
};

export default Page;
