import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";
import { buildImageUrl } from "../../helpers/BuildImageUrl";
import { validacijaZavrsiPrijavu } from "../../api_services/validators/reports/FinishReportVslidator";

interface Props {
  reportsApi: IReportsAPIService;
  reportId: number;
}

export function FinishReportForm({ reportsApi, reportId }: Props) {
  const [naslov, setNaslov] = useState("");
  const [opis, setOpis] = useState("");
  const [komentar, setKomentar] = useState("");
  const [cena, setCena] = useState<number | "">("");
  const [ishod, setIshod] = useState(true);
  const [reportImage, setReportImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    reportsApi.getPrijavaById(reportId).then((res) => {
      if (!mounted) return;
      if (res.success && res.data) {
        setReportImage(buildImageUrl(res.data.imagePath));
        setNaslov(res.data.naslov || "");
        setOpis(res.data.opis || "");
        setKomentar(res.data.masterComment ?? "");
        setCena(res.data.cena !== undefined && res.data.cena !== null ? Number(res.data.cena) : "");
      }
    }).catch((e) => {
      console.error("Error fetching report:", e);
    });
    return () => { mounted = false; };
  }, [reportId, reportsApi]);

  const zavrsi = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const valid = validacijaZavrsiPrijavu(komentar, cena);
    if (!valid.uspesno) {
      setError(valid.poruka ?? "Neispravni podaci");
      return;
    }

    setLoading(true);
    try {
      const body = {
        saniran: ishod,
        comment: komentar.trim(),
        cena: cena === "" ? undefined : Number(cena),
      };
      const res = await reportsApi.zavrsiPrijavu(reportId, body);
      if (res.success) {
        navigate("/majstor-dashboard/sve-prijave");
      } else {
        setError(res.message || "Greška pri završavanju prijave.");
      }
    } catch (err) {
      console.error("Zavrsi error:", err);
      setError("Greška pri završavanju prijave.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={zavrsi} className="grid gap-4">
      {reportImage && (
        <div>
          <label className="text-sm font-medium text-gray-700">Slika prijave</label>
          <img src={reportImage} alt="report" className="w-72 h-48 object-cover rounded-md border mb-3" />
        </div>
      )}

      <label className="text-sm text-gray-700">Naslov prijave</label>
<p className="bg-gray-100 p-2 rounded">{naslov}</p>

<label className="text-sm text-gray-700">Opis prijave</label>
<p className="bg-gray-100 p-2 rounded whitespace-pre-line">{opis}</p>

      <label className="text-sm text-gray-700">Komentar majstora</label>
      <textarea
        value={komentar}
        onChange={e => setKomentar(e.target.value)}
        placeholder="Komentar majstora"
        className="textarea-field"
        rows={5}
      />

      <label className="text-sm text-gray-700">Cijena (din)</label>
      <input
        type="number"
        value={cena}
        onChange={e => setCena(e.target.value === "" ? "" : Number(e.target.value))}
        placeholder="Cena (дин)"
        className="input-field"
        min={0}
      />

      <label className="text-sm text-gray-700">Ishod</label>
      <select
        value={ishod ? "saniran" : "nerez"}
        onChange={e => setIshod(e.target.value === "saniran")}
        className="input-field"
      >
        <option value="saniran">Saniran</option>
        <option value="nerez">Problem nije rešen</option>
      </select>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="btn-primary w-fit"
          disabled={loading}
        >
          {loading ? "Šaljem..." : "💾 Sačuvaj i vrati se na listu"}
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate("/majstor-dashboard/sve-prijave")}
          disabled={loading}
        >
          Откажи
        </button>
      </div>
    </form>
  );
}
