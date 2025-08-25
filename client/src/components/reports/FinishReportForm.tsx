import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X } from "lucide-react";
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
    reportsApi
      .getPrijavaById(reportId)
      .then((res) => {
        if (!mounted) return;
        if (res.success && res.data) {
          setReportImage(buildImageUrl(res.data.imagePath));
          setNaslov(res.data.naslov || "");
          setOpis(res.data.opis || "");
          setKomentar(res.data.masterComment ?? "");
          setCena(
            res.data.cena !== undefined && res.data.cena !== null
              ? Number(res.data.cena)
              : ""
          );
        }
      })
      .catch((e) => {
        console.error("Error fetching report:", e);
      });
    return () => {
      mounted = false;
    };
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
    <form onSubmit={zavrsi} className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[color:var(--nude-200)] space-y-4">
        {reportImage && (
          <img
            src={reportImage}
            alt="report"
            className="w-full h-64 object-cover rounded-xl border shadow-sm"
          />
        )}

        <div>
          <h2 className="text-xl font-semibold text-[color:var(--text-900)] mb-1">{naslov}</h2>
          <p className="text-[color:var(--muted)] whitespace-pre-line">{opis}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[color:var(--nude-200)] space-y-4">
        <h3 className="text-lg font-semibold text-[color:var(--text-900)]">Izveštaj majstora</h3>

        <label className="block text-sm text-[color:var(--text-900)] mb-1">Komentar</label>
        <textarea
          value={komentar}
          onChange={(e) => setKomentar(e.target.value)}
          rows={4}
          className="w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-[#C77D57]"
          placeholder="Opiši radove koje si uradio (obavezno)"
        />

        <label className="block text-sm text-[color:var(--text-900)] mb-1">Cena (RSD)</label>
        <input
          type="number"
          value={cena}
          onChange={(e) => setCena(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-40 rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-[#C77D57]"
          min={0}
          step="1"
          placeholder="npr. 1200"
        />

        <label className="block text-sm text-[color:var(--text-900)] mb-1">Ishod</label>
        <select
          value={ishod ? "saniran" : "nerez"}
          onChange={(e) => setIshod(e.target.value === "saniran")}
          className="w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-[#C77D57]"
        >
          <option value="saniran">Saniran</option>
          <option value="nerez">Problem nije rešen</option>
        </select>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D9BFA0] to-[#C77D57] text-white font-semibold shadow hover:shadow-md transition disabled:opacity-60"
            disabled={loading}
          >
            <Save size={16} />
            {loading ? "Šaljem..." : "Sačuvaj izveštaj"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/majstor-dashboard/sve-prijave")}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-[#D9BFA0] bg-white text-[color:var(--text-900)] font-medium shadow-sm hover:bg-[#FFF8F3] transition"
            disabled={loading}
          >
            <X size={16} />
            Otkaži
          </button>
        </div>
      </div>
    </form>
  );
}

export default FinishReportForm;
