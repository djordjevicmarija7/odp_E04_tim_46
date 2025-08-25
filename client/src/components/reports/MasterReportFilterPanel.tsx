import { useEffect, useState, useCallback } from "react";
import type { ReportDto } from "../../models/reports/ReportDto";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";
import { MasterReportList } from "./MasterReportList";

interface FetchFnParams {
  status?: string;
  sortBy?: "createdAt" | "cena";
  order?: "ASC" | "DESC";
}

interface Props {
  fetchFn: (params?: FetchFnParams) => Promise<{ success: boolean; data?: ReportDto[]; message?: string }>;
  reportsApi: IReportsAPIService;

  onReaction?: (reportId: number, tip: "like" | "dislike" | "neutral") => void;

  highlightedReports?: number[];
}

export function MasterReportFilterPanel({
  fetchFn,
  reportsApi,
  onReaction,
  highlightedReports = [],
}: Props) {
  const [reports, setReports] = useState<ReportDto[]>([]);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchFn({ status: status || undefined });
      if (res.success && res.data) {
        setReports(res.data);
      } else {
        setReports([]);
        setError(res.message ?? "Nema podataka ili greška pri dohvaćanju prijava.");
      }
    } catch (err: any) {
      console.error("fetchReports error:", err);
      setReports([]);
      setError(err?.message ?? "Greška pri dohvaćanju prijava.");
    } finally {
      setLoading(false);
    }
  }, [fetchFn, status]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white shadow rounded-lg p-4">
        <div className="flex items-center gap-4">
          <label className="font-medium text-gray-700">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Svi</option>
            <option value="Kreiran">Kreiran</option>
            <option value="Popravka u toku">Popravka u toku</option>
            <option value="Saniran">Saniran</option>
            <option value="Problem nije rešen">Problem nije rešen</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchReports}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Osvežavanje..." : "Osveži"}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 italic">Učitavanje...</p>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          <strong>Greška:</strong> {error}
        </div>
      ) : (
        <MasterReportList
          reports={reports}
          reportsApi={reportsApi}
          onRefresh={fetchReports}
          onReaction={onReaction}
          highlightedReports={highlightedReports}
        />
      )}
    </div>
  );
}
