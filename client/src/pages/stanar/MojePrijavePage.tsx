import { ReportFilterSortPanel } from "../../components/reports/ReportFilterSortPanel";
import { reportsApi } from "../../api_services/reports/ReportAPIService";

export default function MojePrijavePage() {
  return (
    <main className="page-wrapper">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        📌 Moje prijave
      </h1>
      <ReportFilterSortPanel fetchFn={reportsApi.getPrijaveKorisnika} />
    </main>
  );
}
