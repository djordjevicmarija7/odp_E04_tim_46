interface FilterBarProps {
  onSearch: (query: string) => void;
}

export function FilterBar({ onSearch }: FilterBarProps) {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="🔍 Pretraga prijava..."
        onChange={(e) => onSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
