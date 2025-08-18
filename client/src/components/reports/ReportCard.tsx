import type { ReportDto } from "../../models/reports/ReportDto";

interface Props {
  report: ReportDto;
}

export function ReportCard({ report }: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-xl transition-shadow duration-200">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {report.naslov}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{report.opis}</p>
      </div>

      <div className="mt-auto flex justify-between items-center">
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            report.status === "Saniran"
              ? "bg-green-100 text-green-800"
              : report.status === "Popravka u toku"
              ? "bg-yellow-100 text-yellow-800"
              : report.status === "Problem nije rešen"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {report.status}
        </span>
        <a
          href={`/prijava/${report.id}`}
          className="text-blue-600 hover:underline font-medium"
        >
          Detalji →
        </a>
      </div>
    </div>
  );
}
