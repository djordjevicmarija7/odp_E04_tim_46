// src/components/reports/MasterReportFilterPanel.tsx
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import type { ReportDto } from "../../models/reports/ReportDto";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";
import { MasterReportList } from "./MasterReportList";
import { motion } from "framer-motion";

interface Props {
  fetchFn: (params?: {
    status?: string;
    sortBy?: "createdAt" | "cena";
    order?: "ASC" | "DESC";
  }) => Promise<{ success: boolean; data?: ReportDto[] }>;
  reportsApi: IReportsAPIService;
}

export function MasterReportFilterPanel({ fetchFn, reportsApi }: Props) {
  const [reports, setReports] = useState<ReportDto[]>([]);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetchFn({ status: status || undefined });
      if (res.success && res.data) setReports(res.data);
      else setReports([]);
    } catch (err) {
      console.error("fetchReports error:", err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="max-w-6xl mx-auto w-full px-4">
      {/* FILTER BAR */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="bg-white shadow-lg rounded-2xl p-5 border border-[color:var(--nude-200)] flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <Filter className="text-[#A65B3B]" size={20} />
          <span className="font-medium text-[color:var(--text-900)]">Filtriraj po statusu:</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl px-3 py-2 border shadow-sm focus:ring-2 focus:ring-[#C77D57]"
          >
            <option value="">Svi</option>
            <option value="Kreiran">Kreiran</option>
            <option value="Popravka u toku">Popravka u toku</option>
            <option value="Saniran">Saniran</option>
            <option value="Problem nije rešen">Problem nije rešen</option>
          </select>
        </div>

        <div className="hidden sm:flex items-center text-sm text-[color:var(--muted)]">
          <span>Pronađeno: <strong className="ml-2 text-[color:var(--text-900)]">{reports.length}</strong></span>
        </div>
      </motion.div>

      {/* LISTA: direktno pozivamo MasterReportList koji već ima centrirani max-w i vlastiti grid */}
      {loading ? (
        <p className="text-center text-gray-500 italic mt-6">Učitavanje...</p>
      ) : (
        <div className="mt-6">
          <MasterReportList reports={reports} reportsApi={reportsApi} onRefresh={fetchReports} />
        </div>
      )}
    </div>
  );
}

export default MasterReportFilterPanel;
