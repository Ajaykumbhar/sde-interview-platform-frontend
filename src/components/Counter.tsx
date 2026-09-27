import { useState } from "react";
import Button from "./Button";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count:{count}</h2>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  );
}

export default Counter;
