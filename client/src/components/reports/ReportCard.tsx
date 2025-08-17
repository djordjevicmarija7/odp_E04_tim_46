import type { ReportDto } from "../../models/reports/ReportDto";

interface Props {
  report: ReportDto;
}

export function ReportCard({ report }: Props) {
  return (
    <div className="report-card">
      <h3>{report.naslov}</h3>
      <p>{report.opis}</p>
      <span>Status: {report.status}</span>
    </div>
  );
}
