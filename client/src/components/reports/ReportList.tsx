import type { ReportDto } from "../../models/reports/ReportDto";
import { ReportCard } from "./ReportCard";

interface Props {
  reports: ReportDto[];
  highlightedReports?: number[]; 
  onReaction?: (reportId: number, tip: "like" | "dislike" | "neutral") => void;
}

export default function ReportList({
  reports,
  highlightedReports = [],
  onReaction,
}: Props) {
  return (
    <>
      {reports.map((r) => (
        <ReportCard key={r.id} report={r} highlighted={highlightedReports.includes(r.id)} onReact={onReaction} />
      ))}
    </>
  );
}
