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
      <ReportDetalji reportsApi={reportsApi} reportId={Number(id)} />
    </main>
  );
}
