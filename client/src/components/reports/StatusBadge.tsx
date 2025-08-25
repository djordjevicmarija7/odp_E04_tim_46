interface Props {
  status?: string;
}

export default function StatusBadge({ status }: Props) {
  const mapping: Record<string, { text: string; classes: string }> = {
    Kreiran: { text: "Otvoreno", classes: "bg-[#F6EDE6] text-[#8A4A31]" },
    "Popravka u toku": { text: "U toku", classes: "bg-[#FFF3E8] text-[#C77D57]" },
    Saniran: { text: "Sanirano", classes: "bg-[#E9F4EA] text-[#2F7A4B]" },
    "Problem nije rešen": { text: "Problem", classes: "bg-[#FDEAEA] text-[#A63B3B]" },
  };

  const info = mapping[status || ""] ?? { text: status ?? "Nepoznat", classes: "bg-[#F5F1EE] text-[#5B4636]" };

  return (
    <span className={`text-sm md:text-base font-semibold px-4 py-1.5 rounded-full ${info.classes}`}>
      {info.text}
    </span>
  );
}
