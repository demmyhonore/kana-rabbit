import { useState } from 'react';

function useAnswer() {
  const [answer, setAnswer] = useState('');

  const onAnswerChange = answer => {
    const lowercaseAnswer = answer.toLowerCase();
    return setAnswer(lowercaseAnswer);
  };

  const clearAnswer = () => setAnswer('');

  return [answer, onAnswerChange, clearAnswer];
}

export { useAnswer };
