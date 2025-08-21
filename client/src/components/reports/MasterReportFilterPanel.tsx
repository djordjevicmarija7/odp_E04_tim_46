import { useEffect, useState } from "react";
import type { ReportDto } from "../../models/reports/ReportDto";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";
import { MasterReportList } from "./MasterReportList";

interface Props {
  fetchFn: (params?: {
    status?: string;
    sortBy?: "createdAt" | "cena";
    order?: "ASC" | "DESC";
  }) => Promise<{ success: boolean; data?: ReportDto[] }>;
  reportsApi: IReportsAPIService;
}

export function MasterReportFilterPanel({ fetchFn, reportsApi }: Props) {
  const [reports, setReports] = useState<ReportDto[]>([]);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetchFn({ status: status || undefined });
      if (res.success && res.data) setReports(res.data);
      else setReports([]);
    } catch (err) {
      console.error("fetchReports error:", err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [status]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-white shadow rounded-lg p-4">
        <div className="flex items-center gap-2">
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
      </div>

      {loading ? (
        <p className="text-center text-gray-500 italic">Učitavanje...</p>
      ) : (
        <MasterReportList reports={reports} reportsApi={reportsApi} onRefresh={fetchReports} />
      )}
    </div>
  );
}
