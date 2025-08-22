// src/components/reports/FilterBar.tsx
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import useDebounce from "../../hooks/other/useDebounce";

interface Props {
  onSearch: (q: string) => void;
}

export default function FilterBar({ onSearch }: Props) {
  const [q, setQ] = useState("");
  const debounced = useDebounce(q, 350);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl">
        <label htmlFor="search" className="sr-only">
          Pretraga prijava
        </label>
        <div className="relative w-full">
          {/* Ikonica levo */}
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <Search size={18} className="text-[color:var(--muted)]" />
          </div>

          {/* Input */}
          <input
            id="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pretraži naslov ili opis…"
            className="w-full pl-30 pr-4 py-3 rounded-3xl border-0 shadow-sm focus:outline-none focus:shadow-md text-[color:var(--text-900)] placeholder-[color:var(--muted)]"
            style={{ background: "white" }}
          />
        </div>
      </div>
    </div>
  );
}
