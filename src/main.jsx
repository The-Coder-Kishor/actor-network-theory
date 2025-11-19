import React from 'react';
import { createRoot } from 'react-dom/client';
import ActorNetwork from './ActorNetwork';

function App() {
  return <ActorNetwork />;
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
} else {
  console.error('No root element found');
}
