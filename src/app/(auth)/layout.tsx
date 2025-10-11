import { Button } from "@/components/ui/button";
import { fullLogoFont } from "@/fonts";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

const layout: FC<IProps> = ({ children }) => {
	return (
		<div className="relative bg-public flex flex-col min-h-screen">
			<header className="w-full fixed top-2 flex justify-center z-10">
				<div className="bg-backgroundtop-4 ring-2 ring-white w-7xl backdrop-blur-md bg-gray-200 opacity-40 rounded-[100px] h-[60px] flex shrink-0 items-center gap-2 p-4">
					<Link href={"/"}>
						<div className="text-2xl cursor-pointer">
							<span className={`${fullLogoFont.className}`}>journal</span>
						</div>
					</Link>

					<div className="flex flex-1 justify-end">
						<div className="flex gap-2">
							<Link href={"/login"}>
								<Button variant={"outline"} className="ring-1 ring-gray-100">
									Login
								</Button>
							</Link>
							<Link href={"/signup"}>
								<Button>Signup</Button>
							</Link>
						</div>
					</div>
				</div>
			</header>

			<main className="min-h-[calc(100vh-0px)] relative">{children}</main>
		</div>
	);
};

export default layout;
