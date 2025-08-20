import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import type { ReportDto } from "../../models/reports/ReportDto";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";

interface Props {
  report: ReportDto;
  reportsApi: IReportsAPIService;
  onRefresh?: () => void;
}

export function MasterReportCard({ report, reportsApi, onRefresh }: Props) {
  const [loadingAccept, setLoadingAccept] = useState(false);
  const navigate = useNavigate();

  const handleAccept = async () => {
    if (report.status !== "Kreiran") return;
    setLoadingAccept(true);
    try {
      const res = await reportsApi.prihvatiPrijavu(report.id);
      if (res.success) {
        // preusmeri majstora na stranicu za završavanje prijave
        navigate(`/majstor-dashboard/zavrsi-prijavu/${report.id}`);
        if (onRefresh) onRefresh();
      } else {
        console.error("Prihvatanje nije uspelo:", res.message);
        alert(res.message || "Prihvatanje nije uspelo.");
      }
    } catch (err) {
      console.error("Prihvatanje error:", err);
      alert("Greška pri prihvatanju prijave.");
    } finally {
      setLoadingAccept(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-gray-800">{report.naslov}</h3>
      <p className="text-gray-600 line-clamp-3">{report.opis}</p>

      {report.imagePath ? (
        <img
          src={`${import.meta.env.VITE_API_URL}${report.imagePath}`}
          alt={report.naslov}
          className="w-full h-40 object-cover rounded-md border"
        />
      ) : (
        <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md border">
          📷 Nema slike
        </div>
      )}

      <div className="mt-3 flex gap-2">
        {report.status === "Kreiran" ? (
          <button
            onClick={handleAccept}
            disabled={loadingAccept}
            className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
          >
            {loadingAccept ? "Prihvatanje..." : "Prihvati"}
          </button>
        ) : (
          <button
            onClick={() => navigate(`/majstor-dashboard/zavrsi-prijavu/${report.id}`)}
            className="px-3 py-1 rounded border bg-gray-50 hover:bg-gray-100"
          >
            Azuriraj izvestaj
          </button>
        )}
      </div>
    </div>
  );
}
