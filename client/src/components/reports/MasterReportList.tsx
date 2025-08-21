import { MasterReportCard } from "../reports/MasterReportCard";
import type { ReportDto } from "../../models/reports/ReportDto";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";

interface Props {
  reports: ReportDto[];
  reportsApi: IReportsAPIService;
  onRefresh?: () => void;
}

export function MasterReportList({ reports, reportsApi, onRefresh }: Props) {
  if (!reports || reports.length === 0) {
    return <p className="text-center text-gray-500 italic">Nema prijava</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((r) => (
        <MasterReportCard key={r.id} report={r} reportsApi={reportsApi} onRefresh={onRefresh} />
      ))}
    </div>
  );
}
