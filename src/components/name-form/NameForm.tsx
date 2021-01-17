import React, { useState } from 'react';

export function NameForm() {
  const [ name, setName ] = useState('');
  
  return (
    <div className="name-form">
      <h2 className="name-display">{ name ?? '' }</h2>
      <input className="name-input" type="text" onChange={ val => setName(val.target.value) } />
    </div>
  );
}
