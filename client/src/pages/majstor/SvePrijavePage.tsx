import { MasterReportFilterPanel } from "../../components/reports/MasterReportFilterPanel";
import { reportsApi } from "../../api_services/reports/ReportAPIService";

export default function SvePrijavePage() {
  return (
    <main className="page-wrapper">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        📋 Sve prijave
      </h1>
      <MasterReportFilterPanel fetchFn={reportsApi.getSviIzvestaji} reportsApi={reportsApi} />
    </main>
  );
}
