import type { MouseEvent } from "react";
import { useState } from "react"; 

export default function Index() {
  const [counter, setCounter] = useState(0);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    setCounter(counter => counter + 1);
  }
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-center color-slate-900">Welcome to Remix</h1>
      <button onClick={handleClick}>{counter}</button>
    </div>
  );
}
