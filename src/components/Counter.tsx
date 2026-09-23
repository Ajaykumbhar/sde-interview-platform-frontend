import { useState } from "react";
import Button from "./Button";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count:{count}</h2>
      <Button text="Increment" onClick={() => setCount(count + 1)} />
    </div>
  );
}

export default Counter;
