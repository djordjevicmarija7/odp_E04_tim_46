import { PrijaviKvarForma } from "../../components/reports/PrijaviKvarForma";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";

interface Props {
  reportsApi: IReportsAPIService;
}

export default function PrijaviKvarPage({ reportsApi }: Props) {
  return (
    <main className="page-wrapper">
      <h1>Prijavi kvar</h1>
      <PrijaviKvarForma reportsApi={reportsApi} />
    </main>
  );
}