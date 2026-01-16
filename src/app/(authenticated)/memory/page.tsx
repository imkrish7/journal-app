import MemoryProvider from "./components/MemoryProvider";

const page = async () => {
	return (
		<MemoryProvider>
			<h1>Comming Soon</h1>
		</MemoryProvider>
	);
};

export default page;
