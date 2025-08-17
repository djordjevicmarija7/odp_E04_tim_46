import { ReportCard } from "../reports/ReportCard";
import type { ReportDto } from "../../models/reports/ReportDto";

interface Props {
  reports: ReportDto[];
}

export function ReportList({ reports }: Props) {
  if (reports.length === 0) return <p>Nema prijava</p>;
  return (
    <div className="report-list">
      {reports.map(r => <ReportCard key={r.id} report={r} />)}
    </div>
  );
}
