import { useEffect, useState } from "react";
import type { ReportDto } from "../../models/reports/ReportDto";
import { ReportList } from "./ReportList";
import { FilterBar } from "./FilterBar";

interface Props {
  fetchFn: (params: {
    status?: string;
    sortBy: "createdAt" | "cena";
    order: "ASC" | "DESC";
  }) => Promise<{ success: boolean; data?: ReportDto[] }>;
}

export function ReportFilterSortPanel({ fetchFn }: Props) {
  const [reports, setReports] = useState<ReportDto[]>([]);
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "cena">("createdAt");
  const [order, setOrder] = useState<"ASC" | "DESC">("DESC");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    const res = await fetchFn({ status: status || undefined, sortBy, order });
    if (res.success && res.data) {
      setReports(res.data);
    } else {
      setReports([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, [status, sortBy, order]);

  const filtered = reports.filter(
    (r) =>
      r.opis.toLowerCase().includes(search.toLowerCase()) ||
      r.naslov.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {}
      <FilterBar onSearch={(q) => setSearch(q)} />

      {}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white shadow rounded-lg p-4">
        {}
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Svi</option>
            <option value="Kreiran">Kreiran</option>
            <option value="Popravka u toku">Popravka u toku</option>
            <option value="Saniran">Saniran</option>
            <option value="Problem nije rešen">Problem nije rešen</option>
          </select>
        </div>

        {}
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Sortiraj po:</label>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "createdAt" | "cena")
            }
            className="border rounded px-2 py-1"
          >
            <option value="createdAt">Vremenu prijave</option>
            <option value="cena">Ceni</option>
          </select>

          <button
            onClick={() => setOrder(order === "ASC" ? "DESC" : "ASC")}
            className="ml-2 px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
          >
            {order === "ASC" ? "⬆️ Rastuće" : "⬇️ Opadajuće"}
          </button>
        </div>
      </div>

      {}
      {loading ? (
        <p className="text-center text-gray-500 italic">Učitavanje...</p>
      ) : (
        <ReportList reports={filtered} />
      )}
    </div>
  );
}
