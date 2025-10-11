import { Button } from "@/components/ui/button";
import { fullLogoFont } from "@/fonts";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

const layout: FC<IProps> = ({ children }) => {
	return (
		<div className="relative flex flex-col min-h-screen">
			<header className="bg-backgroundtop-4 h-[50px] flex shrink-0 items-center gap-2 border-b p-4 z-10">
				<div className="text-2xl">
					<span className={`${fullLogoFont.className}`}>journal</span>
				</div>
				<div className="flex flex-1 justify-end">
					<div className="flex gap-2">
						<Button variant={"outline"}>
							<Link href={"/"}>Login</Link>
						</Button>
						<Button>
							<Link href={"/"}>Signup</Link>
						</Button>
					</div>
				</div>
			</header>

			<main className="min-h-[calc(100vh-50px)]">{children}</main>
		</div>
	);
};

export default layout;
