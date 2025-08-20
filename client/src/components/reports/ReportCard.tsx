import type { ReportDto } from "../../models/reports/ReportDto";

interface Props {
  report: ReportDto;
}

export function ReportCard({ report }: Props) {
  const API_URL = import.meta.env.VITE_API_URL;
  const imageUrl = report.imagePath
    ? `${API_URL}${report.imagePath}`
    : null;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-gray-800">{report.naslov}</h3>
      <p className="text-gray-600">{report.opis}</p>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={report.naslov}
          className="w-full h-48 object-cover rounded-md border"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md border">
          📷 Nema slike
        </div>
      )}

      <span className="text-sm text-gray-500">Status: {report.status}</span>
    </div>
  );
}
