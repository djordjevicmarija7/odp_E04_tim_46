import { motion, AnimatePresence } from "framer-motion";
import { MasterReportCard } from "../reports/MasterReportCard";
import type { ReportDto } from "../../models/reports/ReportDto";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";

interface Props {
  reports: ReportDto[];
  reportsApi: IReportsAPIService;
  onRefresh?: () => void;
  onReaction?: (reportId: number, tip: "like" | "dislike" | "neutral") => void;
  highlightedReports?: number[];
}

export function MasterReportList({
  reports,
  reportsApi,
  onRefresh,
  onReaction,
  highlightedReports = [],
}: Props) {
  if (!reports || reports.length === 0) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-md text-center">
            <h3 className="text-lg font-semibold text-[color:var(--text-900)] mb-2">Nema prijava</h3>
            <p className="text-sm text-[color:var(--muted)]">
              Promeni filtere ili osveži listu.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatePresence>
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {reports.map((r) => (
              <motion.div key={r.id} layout>
                <MasterReportCard
                  report={r}
                  reportsApi={reportsApi}
                  onRefresh={onRefresh}
                  onReaction={onReaction}
                  isHighlighted={highlightedReports.includes(r.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MasterReportList;
