import { useParams, useNavigate } from "react-router-dom";
import { ReportDetalji } from "../../components/reports/ReportDetalji";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";

interface Props {
  reportsApi: IReportsAPIService;
}

export default function DetaljiPrijavePage({ reportsApi }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <main className="page-wrapper">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Detalji prijave</h1>
        <button
          onClick={() => navigate("/moje-prijave")}
          className="inline-flex items-center gap-2 bg-white/70 hover:bg-white/90 text-gray-800 px-3 py-1.5 rounded-xl border border-gray-300 shadow-sm transition"
        >
          ← Nazad
        </button>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <ReportDetalji reportsApi={reportsApi} reportId={Number(id)} />
      </div>
    </main>
  );
}
