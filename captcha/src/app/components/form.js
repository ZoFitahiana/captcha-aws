"use client"
import { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(parseInt(number, 10));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        min="1"
        max="1000"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
