import { useState } from "react";
import { Button } from "@nextui-org/react";

// A sinple counter implementation to validate Button component
export const Counter = () => {
	const [count, setCount] = useState(0);

	return (
		<Button radius="full" onPress={() => setCount(count + 1)}>
			Count is {count}
		</Button>
	);
};
