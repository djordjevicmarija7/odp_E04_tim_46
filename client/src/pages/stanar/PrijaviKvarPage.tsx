import { PrijaviKvarForma } from "../../components/reports/PrijaviKvarForma";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";
import { Wrench } from "lucide-react";

interface Props {
  reportsApi: IReportsAPIService;
}

export default function PrijaviKvarPage({ reportsApi }: Props) {
  return (
    <main className="page-wrapper">
      <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <Wrench size={30} className="text-[#C77D57]" />
        Prijavi kvar
      </h1>

      <div className="bg-white shadow rounded-lg p-6">
        <PrijaviKvarForma reportsApi={reportsApi} />
      </div>
    </main>
  );
}
