import MemoryProvider from "./components/MemoryProvider";
import Memories from "./components/memories";

const page = async () => {
	return (
		<MemoryProvider>
			<Memories />
		</MemoryProvider>
	);
};

export default page;
