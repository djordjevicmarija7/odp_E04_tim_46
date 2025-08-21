import { reportsApi } from "../../api_services/reports/ReportAPIService";
import { ReactionButtons } from "../../components/reports/ReactionButtons";
import type { ReportDto } from "../../models/reports/ReportDto";

interface Props {
  report: ReportDto;
}

export function ReportCard({ report }: Props) {
  const API_URL = import.meta.env.VITE_API_URL;
  const imageUrl = report.imagePath ? `${API_URL}${report.imagePath}` : null;

  async function handleReact(reaction: "like" | "dislike" | "neutral") {
    try {
      const res = await reportsApi.dodajReakciju(report.id, reaction);
      if (res.success) {
        alert(`✅ Reakcija uspešno poslata: ${reaction}`);
      } else {
        alert(`⚠️ Greška: ${res.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Greška pri slanju reakcije.");
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={report.naslov}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-500">
          📷 Nema slike
        </div>
      )}

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-gray-800">{report.naslov}</h3>
        <p className="text-gray-600 text-sm whitespace-pre-line">{report.opis}</p>

        <div className="flex justify-between items-center mt-2 text-sm text-gray-700">
          <span>Status: <span className="font-medium">{report.status}</span></span>
          {report.cena !== undefined && (
            <span className="font-semibold text-blue-600">Cena: {report.cena} din</span>
          )}
        </div>

        {report.status === "Saniran" && (
          <>
            <p className="mt-2 text-sm text-gray-700">
              💬 Komentar majstora: {report.masterComment || "Nema komentara"}
            </p>
            <ReactionButtons onReact={handleReact} />
          </>
        )}
      </div>
    </div>
  );
}
