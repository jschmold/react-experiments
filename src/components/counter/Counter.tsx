import React, { useState } from 'react';

export function Counter() {
  const [ amt, setAmt ] = useState(0);
  
  const increment = () => setAmt(amt + 1);
  const decrement = () => setAmt(Math.max(amt - 1, 0));

  return (
    <div className="counter">
      <p className="display">Count: {amt}</p>
      
      <button className="incrementor" onClick={increment}>increment</button>
      <button className="decrementor" onClick={decrement}>decrement</button>
    </div>
  )
}