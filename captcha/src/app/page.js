"use client"
import { useState } from 'react';
import Form from './components/form';
import Sequence from './components/sequence';

export default function Home() {
  const [number, setNumber] = useState(null);

  const handleFormSubmit = (num) => {
    setNumber(num);
  };

  return (
    <div>
      <h1>Forbidden Sequence Generator</h1>
      {number === null ? (
        <Form onSubmit={handleFormSubmit} />
      ) : (
        <Sequence number={number} />
      )}
    </div>
  );
}
