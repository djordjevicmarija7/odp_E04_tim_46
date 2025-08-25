import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DollarSign } from "lucide-react";
import { reportsApi } from "../../api_services/reports/ReportAPIService";
import { ReactionButtons } from "../../components/reports/ReactionButtons";
import type { ReportDto } from "../../models/reports/ReportDto";
import StatusBadge from "./StatusBadge";
import { useEffect, useState } from "react";

type ReactionTip = "like" | "dislike" | "neutral";

interface Props {
  report: ReportDto;
  highlighted?: boolean;
  onReact?: (reportId: number, tip: ReactionTip) => void;
}

export function ReportCard({ report, highlighted = false, onReact }: Props) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL ?? "";
  const imageUrl = report.imagePath ? `${API_URL}${report.imagePath}` : null;

  const initialCounts = {
    like: (report as any).likes ?? (report as any).likesCount ?? (report as any).reactions?.like ?? 0,
    dislike: (report as any).dislikes ?? (report as any).dislikesCount ?? (report as any).reactions?.dislike ?? 0,
    neutral: (report as any).neutral ?? (report as any).neutralCount ?? (report as any).reactions?.neutral ?? 0,
  };

  const [counts, setCounts] = useState(initialCounts);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [userReaction, setUserReaction] = useState<ReactionTip | null>(null);

  useEffect(() => {
    setCounts({
      like: (report as any).likes ?? (report as any).likesCount ?? (report as any).reactions?.like ?? 0,
      dislike: (report as any).dislikes ?? (report as any).dislikesCount ?? (report as any).reactions?.dislike ?? 0,
      neutral: (report as any).neutral ?? (report as any).neutralCount ?? (report as any).reactions?.neutral ?? 0,
    });

    try {
      const mapStr = localStorage.getItem("reportReactions");
      if (mapStr) {
        const map = JSON.parse(mapStr) as Record<string, ReactionTip>;
        const saved = map[String(report.id)];
        if (saved) {
          setUserReaction(saved);
          return;
        }
      }
    } catch (e) {
    }


    const existingUserReaction = (report as any).userReaction as ReactionTip | undefined;
    if (existingUserReaction) setUserReaction(existingUserReaction);
    else setUserReaction(null);
  }, [report]);

  async function handleReact(reaction: ReactionTip) {
    if (busy || userReaction) return;

    setLocalError(null);
    setSuccessMsg(null);
    setBusy(true);

    const prev = { ...counts };
    setCounts((c) => ({ ...c, [reaction]: c[reaction] + 1 }));

    try {
      const res = await reportsApi.dodajReakciju(report.id, reaction);
      if (res.success) {
        setUserReaction(reaction);

        try {
          const mapStr = localStorage.getItem("reportReactions");
          const map = mapStr ? (JSON.parse(mapStr) as Record<string, ReactionTip>) : {};
          map[String(report.id)] = reaction;
          localStorage.setItem("reportReactions", JSON.stringify(map));
        } catch (e) {
          console.warn("Cannot save reaction to localStorage", e);
        }

        onReact?.(report.id, reaction);
        setSuccessMsg("Reakcija poslata");
        setTimeout(() => setSuccessMsg(null), 2000);
      } else {
        // rollback
        setCounts(prev);
        setLocalError(res.message ?? "Greška pri slanju reakcije");
        setTimeout(() => setLocalError(null), 4000);
      }
    } catch (err: any) {
      setCounts(prev);
      setLocalError(err?.message ?? "Server error");
      setTimeout(() => setLocalError(null), 4000);
      console.error("Reaction error:", err);
    } finally {
      setBusy(false);
    }
  }

  function iconFor(t: ReactionTip) {
    if (t === "like") return "👍";
    if (t === "dislike") return "👎";
    return "🤝";
  }

  function labelFor(t: ReactionTip) {
    if (t === "like") return "Sviđa mi se";
    if (t === "dislike") return "Ne sviđa mi se";
    return "Neutralno";
  }

  return (
    <motion.article
      layout
      whileHover={{ translateY: -8 }}
      className={
        "bg-white rounded-2xl overflow-hidden border border-transparent shadow-sm transition-all " +
        (highlighted ? "ring-4 ring-yellow-300 animate-pulse" : "")
      }
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
              {report.naslov || "Bez naslova"}
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
          </div>
        )}

        <div className="mt-2">
          {userReaction ? (

            <div className="flex items-center gap-3">
              <div className="px-3 py-2 bg-gray-100 rounded-full text-sm font-medium flex items-center gap-2">
                <span className="text-lg">{iconFor(userReaction)}</span>
                <span>{labelFor(userReaction)}</span>
              </div>
            </div>
          ) : (

            <div className="flex items-center gap-3">
              <ReactionButtons onReact={(r) => handleReact(r as ReactionTip)} disabled={busy} />
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-gray-700">
            </div>
            <div className="text-xs text-gray-400">#{report.id}</div>
          </div>
        </div>

        {successMsg && <div className="text-sm text-green-600 mt-1">{successMsg}</div>}
        {localError && <div className="text-sm text-red-600 mt-1">{localError}</div>}
      </div>
    </motion.article>
  );
}

export default ReportCard;
