import { PrijaviKvarForma } from "../../components/reports/PrijaviKvarForma";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";

interface Props {
  reportsApi: IReportsAPIService;
}

export default function PrijaviKvarPage({ reportsApi }: Props) {
  return (
    <main className="page-wrapper">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">🛠️ Prijavi kvar</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <PrijaviKvarForma reportsApi={reportsApi} />
      </div>
    </main>

  );
}