// src/components/reports/ReportCard.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DollarSign } from "lucide-react";
import { reportsApi } from "../../api_services/reports/ReportAPIService";
import { ReactionButtons } from "../../components/reports/ReactionButtons";
import type { ReportDto } from "../../models/reports/ReportDto";
import StatusBadge from "./StatusBadge";

interface Props {
  report: ReportDto;
}

export function ReportCard({ report }: Props) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const imageUrl = report.imagePath ? `${API_URL}${report.imagePath}` : null;

  async function handleReact(reaction: "like" | "dislike" | "neutral") {
    try {
      const res = await reportsApi.dodajReakciju(report.id, reaction);
      if (res.success) {
        alert(`✅ Reakcija uspešno poslata: ${reaction}`);
      } else {
        alert(`⚠️ Greška: ${res.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Greška pri slanju reakcije.");
    }
  }

  return (
    <motion.article
      layout
      whileHover={{ translateY: -8 }}
      className="bg-white rounded-2xl overflow-hidden border border-transparent"
      style={{ boxShadow: "var(--card-shadow)" }}
    >
      <div
        className="w-full h-44 bg-gray-100 overflow-hidden relative cursor-pointer"
        onClick={() => navigate(`/prijava/${report.id}`)}
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

        {report.status === "Saniran" && (
          <div className="pt-2 border-t border-transparent">
            <p className="text-sm text-[color:var(--text-900)]">
              <span className="font-medium">💬 Komentar majstora: </span>
              <span className="text-[color:var(--muted)]">{report.masterComment || "Nema komentara"}</span>
            </p>

            <div className="mt-3">
              <ReactionButtons onReact={(r) => handleReact(r as "like" | "dislike" | "neutral")} />
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}
