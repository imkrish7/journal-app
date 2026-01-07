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
		<div className="w-full relative flex min-h-inherit items-center justify-center">
			<Card className="w-[350px] background sm:w-2xl lg:w-4xl py-2 sm:p-0 border-0 shadow-none flex justify-center gap-0">
				<CardContent className="w-full grid grid-cols-1 p-2 md:grid-cols-2 md:h-[450px] lg:p-0 items-center">
					<div className="w-full rounded-md sm:rounded-l-md sm:h-full flex flex-col items-center justify-center">
						<div className="text-4xl my-2">
							<span className="text-gray-100 font-semibold">Welcome back</span>
						</div>
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
												<FormLabel className="text-gray-100">
													Username
												</FormLabel>
												<FormControl>
													<div className="flex w-full">
														<Input placeholder="Email..." {...field} />
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
												<FormLabel className="text-gray-100">
													Password
												</FormLabel>
												<FormControl>
													<div className="flex w-full">
														<Input
															type="password"
															placeholder="********************"
															{...field}
														/>
													</div>
												</FormControl>
												<FormDescription />
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="flex w-full sm:w-sm">
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
								Don&apos;t have account?
								<Link className="underline text-blue-500" href={"/signup"}>
									Signup
								</Link>
							</span>
						</div>
					</div>
					<div className="hidden md:block relative background h-full w-full rounded-r-md">
						<div className="bg-gray-100 sm:w-20 sm:h-20 lg:w-30 lg:h-30 rounded-full absolute top-0 opacity-20 md:left-56 z-0"></div>
						<div className="bg-gray-100 rounded-md sm:h-10 w-20 lg:w-30 lg:h-24 absolute top-0 left-0 opacity-20 z-0"></div>
						<div className="bg-gray-100 rounded-t-[100px] sm:h-10 sm:w-10 lg:w-20 lg:h-30 absolute top-40 left-0 opacity-20 z-0"></div>
						<div className="bg-gray-100 sm:w-20 sm:h-20 lg:w-30 lg:h-30 rounded-full absolute bottom-40 opacity-20 right-0  z-0"></div>
						<div className="bg-gray-100 rounded-md sm:h-10 lg:w-50 lg:h-20 absolute bottom-0 right-40 opacity-20 z-0"></div>
						<div className="bg-gray-100 rounded-t-[100px] sm:w-10 sm:h-15 lg:w-20 lg:h-30 absolute bottom-0 right-0 opacity-20 z-0"></div>
						<RobotLottie />
					</div>
				</CardContent>
			</Card>
			<div className="bg-violet-300 backdrop-blur-xs w-20 h-20 left-10 md:w-30 md:h-30 lg:w-40 lg:h-40 rounded-full absolute opacity-40 top-1 z-0"></div>
			<div className="bg-amber-300 backdrop-blur-xs rounded-md w-28 h-16 md:w-30 md:h-24 lg:w-40 lg:h-24 rotate-45 absolute bottom-10 left-0 z-0 opacity-20 "></div>
			<div className="bg-red-300 backdrop-blur-xs rounded-bl-[100px] w-30 h-30 md:h-30 md:w-30 lg:w-40 lg:h-40 absolute top-0  opacity-20 right-0 z-0"></div>
			<div className="bg-orange-300 backdrop-blur-xs -rotate-45 rounded-t-[100px] w-20 h-40 md:w-20 md:h-30 lg:w-30 lg:h-40  absolute bottom-10 right-20 opacity-20 z-0"></div>
			<div className="bg-fuchsia-300 backdrop-blur-xs w-20 h-20 md:w-30 md:h-30 lg:w-40 lg:h-40 rounded-full absolute bottom-40 right-0 opacity-20  z-0"></div>
		</div>
	);
};

export default Page;
