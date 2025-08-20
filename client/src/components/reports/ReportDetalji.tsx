import { useEffect, useState } from "react";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";
import type { ReportDto } from "../../models/reports/ReportDto";
import { ReactionButtons } from "./ReactionButtons";

interface Props {
  reportsApi: IReportsAPIService;
  reportId: number;
}

export function ReportDetalji({ reportsApi, reportId }: Props) {
  const [report, setReport] = useState<ReportDto | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    reportsApi.getPrijavaById(reportId).then((res) => {
      if (res.success && res.data) setReport(res.data);
    });
  }, [reportId, reportsApi]);

  if (!report) return <p>Učitavanje...</p>;

  const imageUrl = report.imagePath
    ? `${API_URL}${report.imagePath}`
    : null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{report.naslov}</h2>
      <p className="text-gray-700">{report.opis}</p>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={report.naslov}
          className="w-full max-h-96 object-contain rounded-md border"
        />
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md border">
          📷 Nema slike
        </div>
      )}

      <span className="text-sm text-gray-500">Status: {report.status}</span>

      {(report.status === "Saniran" || report.status === "Problem nije rešen") && (
        <ReactionButtons
          onReact={(r) => reportsApi.dodajReakciju(reportId, r)}
        />
      )}
    </div>
  );
}
