interface FilterBarProps {
  onSearch: (query: string) => void;
}

export function FilterBar({ onSearch }: FilterBarProps) {
  return (
    <div className="mb-4 flex justify-center">
      <input
        type="text"
        placeholder="Претрага пријава..."
        onChange={(e) => onSearch(e.target.value)}
        className="border rounded px-4 py-2 w-1/2"
      />
    </div>
  );
}
