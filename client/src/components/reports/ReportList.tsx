// src/components/reports/ReportList.tsx
import type { ReportDto } from "../../models/reports/ReportDto";
import { ReportCard } from "./ReportCard";

interface Props {
  reports: ReportDto[];
}

export default function ReportList({ reports }: Props) {
  return (
    <>
      {reports.map((r) => (
        <ReportCard key={r.id} report={r} />
      ))}
    </>
  );
}
