import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import ActorNetwork from './ActorNetwork';
import PreUpiFinanceNetwork from './PreUpiFinanceNetwork';

function App() {
  const [page, setPage] = useState('actor');

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b py-3 px-4 flex items-center gap-3">
        <button
          onClick={() => setPage('actor')}
          className={`px-3 py-1 rounded ${page === 'actor' ? 'bg-slate-800 text-white' : 'bg-slate-100'}`}
        >
          Actor Network
        </button>
        <button
          onClick={() => setPage('preupi')}
          className={`px-3 py-1 rounded ${page === 'preupi' ? 'bg-slate-800 text-white' : 'bg-slate-100'}`}
        >
          Pre-UPI Network
        </button>
      </header>

      <main>
        {page === 'actor' ? <ActorNetwork /> : <PreUpiFinanceNetwork />}
      </main>
    </div>
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
} else {
  console.error('No root element found');
}
