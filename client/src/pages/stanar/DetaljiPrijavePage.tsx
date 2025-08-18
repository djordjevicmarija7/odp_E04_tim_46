import { useParams } from "react-router-dom";
import { ReportDetalji } from "../../components/reports/ReportDetalji";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";

interface Props {
  reportsApi: IReportsAPIService;
}

export default function DetaljiPrijavePage({ reportsApi }: Props) {
  const { id } = useParams();
  return (
    <main className="page-wrapper">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Detalji prijave</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <ReportDetalji reportsApi={reportsApi} reportId={Number(id)} />
      </div>
    </main>

  );
}
