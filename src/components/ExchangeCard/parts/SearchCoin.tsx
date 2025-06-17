import React, { useState } from 'react';
import type { CryptoCurrency } from '../../../models/crypto-list.model';
import { topCryptos } from '../../../models/crypto-list.model';

interface Props {
  value: string; 
  onSelect: (currency: CryptoCurrency) => void;
}

export const SearchCoin: React.FC<Props> = ({ value, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = topCryptos.filter(
    c => c.name.toLowerCase().includes(search.toLowerCase()) ||
         c.symbol.toLowerCase().includes(search.toLowerCase())
  );
  const selected = topCryptos.find(c => c.symbol === value);

  return (
    <div className="relative w-32">
      <button
        className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium w-full text-left"
        onClick={() => setOpen(!open)}
        type="button"
      >
        {selected ? `${selected.symbol} — ${selected.name}` : 'Select'}
      </button>
      {open && (
        <div className="absolute z-10 w-full bg-white rounded shadow max-h-60 overflow-auto mt-1">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 border-b border-gray-300 text-black"
            autoFocus
          />
          <ul>
            {filtered.map(c => (
              <li
                key={c.id}
                className="p-2 cursor-pointer hover:bg-blue-100 text-black"
                onClick={() => {
                  onSelect(c);
                  setOpen(false);
                  setSearch('');
                }}
              >
                {c.symbol} — {c.name}
              </li>
            ))}
            {filtered.length === 0 && <li className="p-2 text-gray-400">Not found</li>}
          </ul>
        </div>
      )}
    </div>
  );
}; 