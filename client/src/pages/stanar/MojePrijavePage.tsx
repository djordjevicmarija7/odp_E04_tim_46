import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, Plus } from "lucide-react";
import ReportFilterSortPanel from "../../components/reports/ReportFilterSortPanel";
import { reportsApi } from "../../api_services/reports/ReportAPIService";

type Toast = {
  id: string;
  title?: string;
  message: string;
  tone?: "info" | "success" | "warning" | "error";
};

export default function MojePrijavePage() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [highlightedReports, setHighlightedReports] = useState<number[]>([]);

  const showToast = useCallback((message: string, tone: Toast["tone"] = "info", title?: string) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 6);
    const t: Toast = { id, title, message, tone };
    setToasts((s) => [t, ...s]);

    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 4000);
  }, []);

  const handleReportReaction = useCallback((reportId: number, reactionType: string) => {
    setHighlightedReports((prev) => (prev.includes(reportId) ? prev : [...prev, reportId]));
    setTimeout(() => setHighlightedReports((prev) => prev.filter((id) => id !== reportId)), 3000);


    showToast(`Tvoja prijava #${reportId} je dobila: ${reactionType}`, "success", "Nova reakcija");
  }, [showToast]);

  return (
    <main
      className="min-h-screen py-10"
      style={{ background: "linear-gradient(180deg, #FFF8F3 0%, #F7ECE2 100%)" }}
    >
      <div className="max-w-6xl mx-auto w-full px-4">
        <header className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-3xl md:text-4xl font-serif font-bold text-[#5B4636] flex items-center gap-3"
            >
              <Folder className="text-[#A65B3B]" size={28} />
              Moje prijave
            </motion.h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/prijavi-kvar"
              aria-label="Prijavi novi kvar"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D9BFA0] to-[#C77D57] text-white px-6 py-3 rounded-3xl shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              <Plus size={18} />
              <span className="text-lg font-semibold">Prijavi novi kvar</span>
            </Link>
          </div>
        </header>

        <main className="w-full">
          <ReportFilterSortPanel
            fetchFn={reportsApi.getPrijaveKorisnika}
            onReaction={handleReportReaction}
            highlightedReports={highlightedReports}
          />
        </main>
      </div>

      <div className="fixed top-6 right-6 z-50 w-[320px] pointer-events-none">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="mb-3 pointer-events-auto"
            >
              <div
                className={[
                  "flex p-3 rounded-xl shadow-lg border",
                  t.tone === "success" ? "bg-white border-green-200" : "",
                  t.tone === "info" ? "bg-white border-blue-200" : "",
                  t.tone === "warning" ? "bg-white border-yellow-200" : "",
                  t.tone === "error" ? "bg-white border-red-200" : "",
                ].join(" ")}
              >
                <div className="flex-shrink-0 mr-3">
                  <div
                    className={[
                      "w-10 h-10 rounded-full flex items-center justify-center text-white",
                      t.tone === "success" ? "bg-green-500" : "",
                      t.tone === "info" ? "bg-blue-500" : "",
                      t.tone === "warning" ? "bg-yellow-500" : "",
                      t.tone === "error" ? "bg-red-500" : "",
                    ].join(" ")}
                  >
                    {t.tone === "success" ? "✅" : t.tone === "info" ? "ℹ️" : t.tone === "warning" ? "⚠️" : "❌"}
                  </div>
                </div>

                <div className="flex-1">
                  {t.title && <div className="text-sm font-semibold text-gray-800">{t.title}</div>}
                  <div className="text-sm text-gray-600">{t.message}</div>
                </div>

                <div className="ml-3 flex items-start">
                  <button
                    onClick={() => setToasts((s) => s.filter((x) => x.id !== t.id))}
                    className="text-gray-400 hover:text-gray-600 text-sm"
                    aria-label="close"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
