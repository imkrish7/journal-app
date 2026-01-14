import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
				></link>
			</head>
			<body className={`antialiased`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
