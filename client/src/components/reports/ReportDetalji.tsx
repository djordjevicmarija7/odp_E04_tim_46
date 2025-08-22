import { useEffect, useState } from "react";
import { ReactionButtons } from "./ReactionButtons";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";
import type { ReportDto } from "../../models/reports/ReportDto";
import { validacijaZavrsiPrijavu } from "../../api_services/validators/reports/FinishReportVslidator";

interface Props {
  reportsApi: IReportsAPIService;
  reportId: number;
  onUpdated?: (updated?: ReportDto) => void;
}

export function ReportDetalji({ reportsApi, reportId, onUpdated }: Props) {
  const [report, setReport] = useState<ReportDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [finishLoading, setFinishLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [comment, setComment] = useState<string>("");
  const [cena, setCena] = useState<string>("");

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await reportsApi.getPrijavaById(reportId);
      if (res.success && res.data) {
        setReport(res.data);
        setComment(res.data.masterComment ?? "");
        setCena(res.data.cena !== undefined && res.data.cena !== null ? String(res.data.cena) : "");
      } else {
        setError(res.message || "Ne mogu da učitam prijavu.");
      }
    } catch {
      setError("Greška pri učitavanju prijave.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [reportId]);

  if (loading || !report) return <p className="text-center text-gray-600">Učitavanje...</p>;

  const imageUrl = report.imagePath ? `${API_URL}${report.imagePath}` : null;

  const handleFinish = async (isSaniran: boolean) => {
    const valid = validacijaZavrsiPrijavu(comment, cena);
    if (!valid.uspesno) {
      setError(valid.poruka ?? "Neispravni podaci");
      return;
    }

    setFinishLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const body = {
        saniran: isSaniran,
        comment: comment.trim(),
        cena: Number(cena),
      };
      const res = await reportsApi.zavrsiPrijavu(reportId, body);
      if (res.success) {
        setSuccess(isSaniran ? "Prijava označena kao sanirana." : "Prijava označena kao nerešena.");
        await fetchReport();
        if (onUpdated) onUpdated(report ?? undefined);
      } else {
        setError(res.message || "Greška pri završavanju prijave.");
      }
    } catch {
      setError("Greška pri završavanju prijave.");
    } finally {
      setFinishLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{report.naslov}</h2>
      <p className="text-gray-700 whitespace-pre-line">{report.opis}</p>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={report.naslov}
          className="w-full max-h-96 object-contain rounded-xl border"
        />
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-gray-100 text-gray-500 rounded-xl border">
          📷 Nema slike
        </div>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>Status: <strong className="text-gray-700">{report.status}</strong></span>
        {report.cena !== undefined && report.cena !== null && (
          <span>• Cena: <strong className="text-gray-700">{report.cena} RSD</strong></span>
        )}
      </div>

      {report.status === "Popravka u toku" && (
        <div className="mt-4 p-4 border rounded-xl bg-gray-50 space-y-3">
          <h3 className="font-semibold text-gray-800">Završi prijavu</h3>

          <label className="block text-sm text-gray-700">Komentar majstora</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full border rounded-xl p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Opiši radove koje si uradio (obavezno)"
          />

          <label className="block text-sm text-gray-700 mt-3">Cena (RSD)</label>
          <input
            type="number"
            value={cena}
            onChange={(e) => setCena(e.target.value)}
            className="w-40 border rounded-xl p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            min={0}
            step="0.01"
            placeholder="npr. 1200"
          />

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => handleFinish(true)}
              disabled={finishLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-60 transition"
            >
              {finishLoading ? "Šaljem..." : "Označi kao Saniran"}
            </button>

            <button
              onClick={() => handleFinish(false)}
              disabled={finishLoading}
              className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-60 transition"
            >
              {finishLoading ? "Šaljem..." : "Označi kao Problem nije rešen"}
            </button>
          </div>

          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {success && <p className="text-sm text-green-600 mt-2">{success}</p>}
        </div>
      )}

      {(report.status === "Saniran" || report.status === "Problem nije rešen") && (
        <div className="mt-2 p-4 bg-gray-50 rounded-xl border space-y-3">
          <p className="text-sm text-gray-700 font-medium">Komentar majstora:</p>
          <p className="text-gray-600">{report.masterComment || "Nema komentara."}</p>

          <p className="text-sm text-gray-700 font-medium mt-1">
            Cena: {report.cena !== undefined ? `${report.cena} RSD` : "N/A"}
          </p>

          <ReactionButtons
  onReact={async (r) => {
    try {
      const res = await reportsApi.dodajReakciju(reportId, r);
      if (res.success) {
        fetchReport(); // osveži podatke da se vidi reakcija
      } else {
        alert(res.message || "Greška pri slanju reakcije");
      }
    } catch (e) {
      console.error("Reaction error:", e);
      alert("Greška pri slanju reakcije");
    }
  }}
/>

        </div>
      )}
    </div>
  );
}

export default ReportDetalji;
