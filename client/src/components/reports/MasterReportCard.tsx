import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DollarSign, Pencil, CheckCircle } from "lucide-react";
import type { ReportDto } from "../../models/reports/ReportDto";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";
import StatusBadge from "./StatusBadge";

interface Props {
  report: ReportDto;
  reportsApi: IReportsAPIService;
  onRefresh?: () => void;
  onReaction?: (reportId: number, tip: "like" | "dislike" | "neutral") => void;
  isHighlighted?: boolean;
}

export function MasterReportCard({
  report,
  reportsApi,
  onRefresh,
  onReaction,    
  isHighlighted = false,
}: Props) {
  const [loadingAccept, setLoadingAccept] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const imageUrl = report.imagePath ? `${API_URL}${report.imagePath}` : null;

  const handleAccept = async () => {
    if (report.status !== "Kreiran") return;
    setLoadingAccept(true);
    try {
      const res = await reportsApi.prihvatiPrijavu(report.id);
      if (res.success) {
        navigate(`/majstor-dashboard/zavrsi-prijavu/${report.id}`);
        if (onRefresh) onRefresh();
      } else {
        console.error("Prihvatanje nije uspelo:", res.message);
        alert(res.message || "Prihvatanje nije uspelo.");
      }
    } catch (err) {
      console.error("Prihvatanje error:", err);
      alert("Greška pri prihvatanju prijave.");
    } finally {
      setLoadingAccept(false);
    }
  };

  return (
    <motion.article
      layout
      whileHover={{ translateY: -8 }}
      className={`w-full bg-white rounded-2xl overflow-hidden border transition
        ${isHighlighted ? "border-amber-400 ring-2 ring-amber-200" : "border-transparent"}`}
      style={{ boxShadow: "var(--card-shadow)" }}
    >
      <div
        className="w-full h-44 bg-gray-100 overflow-hidden relative cursor-pointer"
        onClick={() => navigate(`/majstor-dashboard/zavrsi-prijavu/${report.id}`)}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={report.naslov || "prijava"} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#F0E0CF] text-[color:var(--muted)]">
            <span className="text-sm">📷 Nema slike</span>
          </div>
        )}

        <div className="absolute left-4 top-4">
          <StatusBadge status={report.status} />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-[color:var(--text-900)] truncate" title={report.naslov}>
              {report.naslov}
            </h3>
            <p className="text-sm text-[color:var(--muted)] mt-1 line-clamp-3 whitespace-pre-line">
              {report.opis}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-[color:var(--muted)]">
              {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : ""}
            </span>
            <div className="flex items-center gap-2">
              <DollarSign size={14} className="text-[color:var(--muted)]" />
              <span className="text-sm font-medium text-[color:var(--text-900)]">
                {report.cena !== undefined && report.cena !== null ? `${report.cena} din` : "Bez troška"}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-transparent flex gap-3">
          {report.status === "Kreiran" ? (
            <button
              onClick={handleAccept}
              disabled={loadingAccept}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#D9BFA0] to-[#C77D57] text-white text-sm font-semibold shadow hover:shadow-md transition disabled:opacity-60"
            >
              <CheckCircle size={16} />
              {loadingAccept ? "Prihvatanje..." : "Prihvati prijavu"}
            </button>
          ) : (
            <button
              onClick={() => navigate(`/majstor-dashboard/zavrsi-prijavu/${report.id}`)}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-2xl border border-[#D9BFA0] bg-white text-[color:var(--text-900)] text-sm font-medium shadow-sm hover:bg-[#FFF8F3] transition"
            >
              <Pencil size={16} className="text-[#5B4636]" />
              Ažuriraj izveštaj
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default MasterReportCard;
