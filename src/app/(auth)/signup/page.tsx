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
		<div className="w-full relative min-h-inherit flex items-center justify-center">
			<Card className="w-4xl absolute p-0 border-0 shadown-0">
				<CardContent className="grid grid-cols-2 h-[450px] p-0">
					<div className="w-full background rounded-l-md h-full flex flex-col items-center justify-center">
						<div className="text-4xl my-2">
							<span className="text-gray-100 font-semibold">Welcome</span>
						</div>
						<Form {...form}>
							<div className="flex relative mt-4 flex-col gap-4">
								<FormField
									control={form.control}
									name="name"
									render={() => (
										<FormItem>
											<FormLabel className="text-gray-100">Name</FormLabel>
											<FormControl>
												<div className="flex w-sm">
													<Input
														className="text-gray-100"
														placeholder="John doe"
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
									name="email"
									render={() => (
										<FormItem>
											<FormLabel className="text-gray-100">Email</FormLabel>
											<FormControl>
												<div className="flex w-sm">
													<Input
														className="text-gray-100"
														placeholder="Email..."
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
									render={() => (
										<FormItem>
											<FormLabel className="text-gray-100">Password</FormLabel>
											<FormControl>
												<div className="flex w-sm">
													<Input
														type="password"
														className="text-gray-100"
														placeholder="********************"
													/>
												</div>
											</FormControl>
											<FormDescription />
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex w-sm">
									<Button className="bg-gray-100 text-gray-400">Signup</Button>
								</div>
							</div>
						</Form>
						<div className="flex">
							<span className="text-gray-100 font-semibold gap-1 flex">
								Already have an account?
								<Link className="underline text-blue-500" href={"/login"}>
									Login
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
			<div className="background backdrop-blur-xs w-full sm:w-40 h-40 rounded-full absolute animate-bounce top-1 opacity-20 max-sm:right-0 sm:left-16 z-0"></div>
			<div className="background backdrop-blur-xs rounded-md w-full sm:w-40 h-24 rotate-45 absolute bottom-30 -left-0 opacity-20 z-0"></div>
			<div className="bg-red-300 backdrop-blur-xs animate-wiggle rounded-bl-[100px] w-full sm:w-40 h-40 absolute top-0 right-0 opacity-20 z-0"></div>
			<div className="background backdrop-blur-xs -rotate-45 rounded-t-[100px] w-full sm:w-30 h-40 absolute bottom-10 right-10 opacity-20 z-0"></div>
			<div className="background backdrop-blur-xs w-full sm:w-40 h-40 rounded-full absolute bottom-40 opacity-20 right-0  z-0"></div>
		</div>
	);
};

export default Page;
