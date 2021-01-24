import { useState } from "react";

function useAnswer() {
  const [answer, setAnswer] = useState("");

  const clearAnswer = () => setAnswer("");

  return [answer, setAnswer, clearAnswer];
}

export { useAnswer };
