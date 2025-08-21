import { ReportCard } from "./ReportCard";
import type { ReportDto } from "../../models/reports/ReportDto";

interface Props {
  reports: ReportDto[];
}

export function ReportList({ reports }: Props) {
  if (!reports || reports.length === 0) {
    return <p className="text-center text-gray-500 italic">Nema prijava</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((r) => (
        <ReportCard key={r.id} report={r} />
      ))}
    </div>
  );
}
