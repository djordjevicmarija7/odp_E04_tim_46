import { useEffect, useState } from "react";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";
import type { ReportDto } from "../../models/reports/ReportDto";
import { ReactionButtons } from "../reports/ReactionButtons";

interface Props {
  reportsApi: IReportsAPIService;
  reportId: number;
}

export function ReportDetalji({ reportsApi, reportId }: Props) {
  const [report, setReport] = useState<ReportDto | null>(null);

useEffect(() => {
  reportsApi.getPrijavaById(reportId).then((res) => {
    if (res.success && res.data) setReport(res.data);
  });
}, [reportId, reportsApi]);
  if (!report) return <p>Učitavanje...</p>;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-2">{report.naslov}</h2>
      <p className="text-gray-700 mb-4">{report.opis}</p>
      <span
        className={
          report.status === "Saniran"
            ? "badge-green"
            : report.status === "Popravka u toku"
            ? "badge-yellow"
            : "badge-red"
        }
      >
        {report.status}
      </span>
      {(report.status === "Saniran" || report.status === "Problem nije rešen") && (
        <ReactionButtons onReact={(r) => reportsApi.dodajReakciju(reportId, r)} />
      )}
    </div>
  );
}
