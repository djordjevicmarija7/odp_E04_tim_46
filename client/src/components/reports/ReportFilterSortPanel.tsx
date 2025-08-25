import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { ReportDto } from "../../models/reports/ReportDto";
import ReportList from "./ReportList";
import FilterBar from "./FilterBar";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, SlidersHorizontal, Funnel, ArrowUp, ArrowDown } from "lucide-react";

interface Props {
  fetchFn: (params: {
    status?: string;
    sortBy: "createdAt" | "cena";
    order: "ASC" | "DESC";
  }) => Promise<{ success: boolean; data?: ReportDto[] }>;

  onReaction?: (reportId: number, reactionType: string) => void;
  highlightedReports?: number[];
}

export default function ReportFilterSortPanel({
  fetchFn,
  onReaction,
  highlightedReports,
}: Props) {
  const navigate = useNavigate();

  const [reports, setReports] = useState<ReportDto[]>([]);
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "cena">("createdAt");
  const [order, setOrder] = useState<"ASC" | "DESC">("DESC");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchFn({ status: status || undefined, sortBy, order });
      if (res.success && res.data) setReports(res.data);
      else setReports([]);
    } catch {
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, status, sortBy, order]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return reports;
    return reports.filter(
      (r) =>
        (r.naslov && r.naslov.toLowerCase().includes(q)) ||
        (r.opis && r.opis.toLowerCase().includes(q))
    );
  }, [reports, search]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl px-4 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate("/stanar-dashboard")}
              className="inline-flex items-center gap-2 bg-white/60 text-[#5B4636] px-3 py-2 rounded-xl"
            >
              ← Nazad
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                try {
                  localStorage.removeItem("reportReactions");
                } catch (e) {
                }
                fetchReports();
              }}
              className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm"
            >
              <RefreshCw size={16} />
              Osveži
            </button>
          </div>
        </div>

        <div className="w-full">
          <FilterBar onSearch={setSearch} />
        </div>

        <div className="bg-[#F0E0CF] rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3 w-full md:w-1/2">
            <Funnel size={18} className="text-[#A65B3B]" />
            <span className="text-sm font-medium text-[#5B4636]">Filtriraj</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl px-3 py-2 bg-white shadow-sm w-full md:w-auto"
            >
              <option value="">Svi statusi</option>
              <option value="Kreiran">Kreiran</option>
              <option value="Popravka u toku">Popravka u toku</option>
              <option value="Saniran">Saniran</option>
              <option value="Problem nije rešen">Problem nije rešen</option>
            </select>
          </div>

          <div className="flex items-center gap-3 justify-end w-full md:w-1/2">
            <SlidersHorizontal size={18} className="text-[#A65B3B]" />
            <span className="text-sm font-medium text-[#5B4636]">Sortiraj po</span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "createdAt" | "cena")}
              className="rounded-xl px-3 py-2 bg-white shadow-sm"
            >
              <option value="createdAt">Vremenu prijave</option>
              <option value="cena">Ceni</option>
            </select>

            <button
              onClick={() => setOrder(order === "ASC" ? "DESC" : "ASC")}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-white"
            >
              {order === "ASC" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              {order === "ASC" ? "Rastuće" : "Opadajuće"}
            </button>
          </div>
        </div>

        <div>
          <AnimatePresence>
            {loading ? (
              <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white h-48 animate-pulse" />
                ))}
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div className="bg-white rounded-2xl p-10 text-center shadow max-w-xl mx-auto">
                <h3 className="text-lg font-semibold text-[#5B4636] mb-2">Nema prijava</h3>
                <p className="text-[#7A6A5B] mb-6">Promeni filtere ili prijavi novi kvar.</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => { setStatus(""); setSearch(""); }}
                    className="px-4 py-2 rounded-2xl border bg-white hover:bg-gray-50"
                  >
                    Poništi filtere
                  </button>
                  <button
                    onClick={() => navigate("/prijavi-kvar")}
                    className="px-5 py-3 rounded-3xl bg-gradient-to-r from-[#D9BFA0] to-[#C77D57] text-white font-semibold shadow-lg"
                  >
                    Prijavi novi kvar
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
                <ReportList
                  reports={filtered}
                  onReaction={onReaction}
                  highlightedReports={highlightedReports}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
