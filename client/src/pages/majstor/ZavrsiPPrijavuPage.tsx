import { useParams } from "react-router-dom";
import { FinishReportForm } from "../../components/reports/FinishReportForm";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";

interface Props {
  reportsApi: IReportsAPIService;
}

export default function ZavrsiPrijavuPage({ reportsApi }: Props) {
  const { id } = useParams();
  return (
    <main className="page-wrapper">
      <h1>Završi prijavu</h1>
      <FinishReportForm reportsApi={reportsApi} reportId={Number(id)} />
    </main>
  );
}
