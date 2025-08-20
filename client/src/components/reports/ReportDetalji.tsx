// src/components/reports/ReportDetalji.tsx
import { useEffect, useState } from "react";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";
import type { ReportDto } from "../../models/reports/ReportDto";
import { ReactionButtons } from "./ReactionButtons";
import {validacijaZavrsiPrijavu} from "../../api_services/validators/reports/FinishReportVslidator"

interface Props {
  reportsApi: IReportsAPIService;
  reportId: number;
  /** optional callback koji parent može proslediti da osveži listu nakon izmene */
  onUpdated?: (updated?: ReportDto) => void;
}

export function ReportDetalji({ reportsApi, reportId, onUpdated }: Props) {
  const [report, setReport] = useState<ReportDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [finishLoading, setFinishLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // forma za majstora
  const [comment, setComment] = useState<string>("");
  const [cena, setCena] = useState<string>(""); // držimo kao string radi inputa

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await reportsApi.getPrijavaById(reportId);
      if (res.success && res.data) {
        setReport(res.data);
        // pre-populiraj formu komentarom i cenom ako već postoje (korisno za edit)
        setComment(res.data.masterComment ?? "");
        setCena(res.data.cena !== undefined && res.data.cena !== null ? String(res.data.cena) : "");
      } else {
        setError(res.message || "Ne mogu da učitam prijavu.");
      }
    } catch (err) {
      console.error(err);
      setError("Greška pri učitavanju prijave.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // osveži prijavu iz servera (da dobiješ novi status, masterComment, cenu)
        await fetchReport();
        if (onUpdated) onUpdated(report ?? undefined);
      } else {
        setError(res.message || "Greška pri završavanju prijave.");
      }
    } catch (err) {
      console.error(err);
      setError("Greška pri završavanju prijave.");
    } finally {
      setFinishLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{report.naslov}</h2>
      <p className="text-gray-700">{report.opis}</p>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={report.naslov}
          className="w-full max-h-96 object-contain rounded-md border"
        />
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md border">
          📷 Nema slike
        </div>
      )}

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Status: <strong className="ml-1">{report.status}</strong></span>
        {report.cena !== undefined && report.cena !== null && (
          <span className="text-sm text-gray-700">• Cena: <strong className="ml-1">{report.cena} RSD</strong></span>
        )}
      </div>

      {/* Ako je prijava u toku popravke - prikaži formu za majstora */}
      {report.status === "Popravka u toku" && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Završi prijavu</h3>

          <label className="block text-sm text-gray-700">Komentar majstora</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full border rounded p-2 mt-1"
            placeholder="Opiši radove koje si uradio (obavezno)"
          />

          <label className="block text-sm text-gray-700 mt-3">Cena (RSD)</label>
          <input
            type="number"
            value={cena}
            onChange={(e) => setCena(e.target.value)}
            className="w-40 border rounded p-2 mt-1"
            min={0}
            step="0.01"
            placeholder="npr. 1200"
          />

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => handleFinish(true)}
              disabled={finishLoading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
            >
              {finishLoading ? "Šaljem..." : "Označi kao Saniran"}
            </button>

            <button
              onClick={() => handleFinish(false)}
              disabled={finishLoading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-60"
            >
              {finishLoading ? "Šaljem..." : "Označi kao Problem nije rešen"}
            </button>
          </div>

          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {success && <p className="text-sm text-green-600 mt-2">{success}</p>}
        </div>
      )}

      {/* Ako je saniran ili nerešeno - prikaži komentar majstora i reakcije */}
      {(report.status === "Saniran" || report.status === "Problem nije rešen") && (
        <div className="mt-2 p-3 bg-gray-50 rounded border">
          <p className="text-sm text-gray-700"><strong>Komentar majstora:</strong></p>
          <p className="text-gray-600 mt-1">{report.masterComment || "Nema komentara."}</p>

          <p className="text-sm text-gray-700 mt-2"><strong>Cena:</strong> {report.cena !== undefined ? `${report.cena} RSD` : "N/A"}</p>

          <ReactionButtons
            onReact={(r) => {
              // pozovi API za reakciju i osveži report nakon (ili handle in ReportCard)
              reportsApi.dodajReakciju(reportId, r).then(() => {
                // osveži da bi prikazao eventualno userReaction
                fetchReport();
              }).catch((e) => {
                console.error("Reaction error:", e);
              });
            }}
          />
        </div>
      )}
    </div>
  );
}
