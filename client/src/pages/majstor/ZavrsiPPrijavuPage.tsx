import { useParams } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";
import { FinishReportForm } from "../../components/reports/FinishReportForm";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";

interface Props {
  reportsApi: IReportsAPIService;
}

export default function ZavrsiPrijavuPage({ reportsApi }: Props) {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="min-h-screen py-10" style={{ background: "linear-gradient(180deg, #FFF8F3 0%, #F7ECE2 100%)" }}>
      <div className="max-w-5xl mx-auto w-full px-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-[color:var(--text-900)] flex items-center gap-3">
            <ClipboardCheck className="text-[#A65B3B]" size={28} />
            Rad na prijavi...
          </h1>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[color:var(--nude-200)]">
          <FinishReportForm reportsApi={reportsApi} reportId={Number(id)} />
        </div>
      </div>
    </main>
  );
}
