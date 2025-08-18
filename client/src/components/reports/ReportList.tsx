import { ReportCard } from "../reports/ReportCard";
import type { ReportDto } from "../../models/reports/ReportDto";

interface Props {
  reports: ReportDto[];
}

export function ReportList({ reports }: Props) {
  if (reports.length === 0)
    return <p className="text-center text-gray-500 italic">Нема пријава</p>;

  return (
    <div className="grid gap-4">
      {reports.map((r) => (
        <ReportCard key={r.id} report={r} />
      ))}
    </div>
  );
}
